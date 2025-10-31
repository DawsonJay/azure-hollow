import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { sendRejectionEmail } from "@/lib/email";
import { updateRequestActivity } from "@/lib/expiration";

const rejectRequestSchema = z.object({
  customMessage: z.string().optional(),
});

/**
 * POST /api/requests/[id]/reject - Reject a request
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = rejectRequestSchema.parse(body);

    const contactRequest = await db.contactRequest.findUnique({
      where: { id: params.id },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    // Update status immediately (no 7-day wait for reject)
    await db.contactRequest.update({
      where: { id: params.id },
      data: {
        status: "rejected",
      },
    });

    await updateRequestActivity(params.id);

    // Send rejection email
    await sendRejectionEmail(
      contactRequest.clientEmail,
      contactRequest.clientName,
      params.id,
      validated.customMessage
    );

    return NextResponse.json({
      success: true,
      message: "Request rejected and client notified",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error rejecting request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reject request" },
      { status: 500 }
    );
  }
}

