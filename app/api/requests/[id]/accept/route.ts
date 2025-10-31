import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { createPaymentToken, createSlotReservation } from "@/lib/tokens";
import { calculateEndTime } from "@/lib/calendar";
import { sendPaymentLink } from "@/lib/email";
import { updateRequestActivity } from "@/lib/expiration";
import { formatDate, formatTime } from "@/lib/calendar";

const acceptRequestSchema = z.object({
  date: z.string(), // ISO date string
  time: z.string(), // "HH:MM" format
  customMessage: z.string().optional(),
});

/**
 * POST /api/requests/[id]/accept - Accept a request and generate payment link
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = acceptRequestSchema.parse(body);

    // Get the request with package info
    const contactRequest = await db.contactRequest.findUnique({
      where: { id: params.id },
      include: {
        package: true,
      },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    if (contactRequest.status !== "pending" && contactRequest.status !== "in_conversation") {
      return NextResponse.json(
        { success: false, error: "Request cannot be accepted in current status" },
        { status: 400 }
      );
    }

    const confirmedDate = new Date(validated.date);
    const endTime = calculateEndTime(validated.time, contactRequest.package.duration);

    // Create payment token
    const token = await createPaymentToken(
      params.id,
      confirmedDate,
      validated.time
    );

    // Create 24-hour slot reservation
    await createSlotReservation(
      token,
      confirmedDate,
      validated.time,
      endTime
    );

    // Update request status
    await db.contactRequest.update({
      where: { id: params.id },
      data: {
        status: "accepted",
      },
    });

    await updateRequestActivity(params.id);

    // Generate payment link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const paymentLink = `${baseUrl}/pay/${token}`;

    // Send payment link email
    await sendPaymentLink(
      contactRequest.clientEmail,
      contactRequest.clientName,
      params.id,
      paymentLink,
      formatDate(confirmedDate),
      formatTime(validated.time),
      contactRequest.package.name,
      validated.customMessage
    );

    return NextResponse.json({
      success: true,
      token,
      paymentLink,
      message: "Payment link generated and sent",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error accepting request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to accept request" },
      { status: 500 }
    );
  }
}

