import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { updateRequestActivity } from "@/lib/expiration";

const updateRequestSchema = z.object({
  status: z.enum(["pending", "in_conversation", "accepted", "rejected", "expired"]).optional(),
});

/**
 * GET /api/requests/[id] - Get a specific request
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check

    const contactRequest = await db.contactRequest.findUnique({
      where: { id: params.id },
      include: {
        package: true,
        messages: {
          orderBy: { createdAt: "asc" },
        },
        tokens: {
          include: {
            reservedSlot: true,
            payment: true,
          },
        },
        bookedSession: true,
      },
    });

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, request: contactRequest });
  } catch (error) {
    console.error("Error fetching request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch request" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/requests/[id] - Update request status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = updateRequestSchema.parse(body);

    const updateData: any = {};
    if (validated.status) {
      updateData.status = validated.status;
    }

    // Update activity timestamp whenever status changes
    if (validated.status) {
      await updateRequestActivity(params.id);
    }

    const updatedRequest = await db.contactRequest.update({
      where: { id: params.id },
      data: updateData,
      include: {
        package: true,
      },
    });

    return NextResponse.json({ success: true, request: updatedRequest });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid update data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update request" },
      { status: 500 }
    );
  }
}

