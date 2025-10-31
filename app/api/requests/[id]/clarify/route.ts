import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { updateRequestActivity } from "@/lib/expiration";

const clarifyRequestSchema = z.object({
  message: z.string().min(1),
});

/**
 * POST /api/requests/[id]/clarify - Send a clarification message
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = clarifyRequestSchema.parse(body);

    const contactRequest = await db.contactRequest.findUnique({
      where: { id: params.id },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    // Update status to in_conversation if still pending
    if (contactRequest.status === "pending") {
      await db.contactRequest.update({
        where: { id: params.id },
        data: { status: "in_conversation" },
      });
    }

    // Store message in database
    const message = await db.message.create({
      data: {
        requestId: params.id,
        senderEmail: process.env.EMAIL_FROM || "bookings@azhollow.com",
        senderType: "friend",
        content: validated.message,
        subject: `Your Tarot Reading Request [#${params.id}]`,
        requestIdInSubject: params.id,
      },
    });

    // Send email to client
    await sendEmail({
      to: contactRequest.clientEmail,
      subject: `Your Tarot Reading Request - Azure Hollow [#${params.id}]`,
      html: `
        <p>Hi ${contactRequest.clientName},</p>
        <p>${validated.message}</p>
        <p>Best,<br>Jessica Rose<br>Azure Hollow</p>
      `,
    });

    await updateRequestActivity(params.id);

    return NextResponse.json({
      success: true,
      message: "Clarification sent",
      messageId: message.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error sending clarification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send clarification" },
      { status: 500 }
    );
  }
}

