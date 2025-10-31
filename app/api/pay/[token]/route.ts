import { NextRequest, NextResponse } from "next/server";
import { validateToken, isSlotAvailable } from "@/lib/tokens";
import { calculateEndTime } from "@/lib/calendar";

/**
 * GET /api/pay/[token] - Get payment page data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const validation = await validateToken(params.token);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error,
          errorType: validation.error === "Token expired" ? "token_expired" : "token_invalid",
        },
        { status: 400 }
      );
    }

    const tokenRecord = validation.token;

    // TypeScript now knows tokenRecord exists because validation.valid is true
    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 400 }
      );
    }

    // Check if slot is still available
    if (!tokenRecord.confirmedDate || !tokenRecord.confirmedTime) {
      return NextResponse.json(
        { success: false, error: "Invalid token configuration" },
        { status: 400 }
      );
    }

    const slotAvailable = await isSlotAvailable(
      tokenRecord.confirmedDate,
      tokenRecord.confirmedTime,
      tokenRecord.request.package.duration
    );

    if (!slotAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: "slot_filled",
          message: "This time slot is no longer available",
        },
        { status: 400 }
      );
    }

    const endTime = calculateEndTime(
      tokenRecord.confirmedTime,
      tokenRecord.request.package.duration
    );

    return NextResponse.json({
      success: true,
      request: {
        id: tokenRecord.requestId,
        clientName: tokenRecord.request.clientName,
        package: tokenRecord.request.package,
        confirmedDate: tokenRecord.confirmedDate,
        confirmedTime: tokenRecord.confirmedTime,
        endTime,
      },
    });
  } catch (error) {
    console.error("Error fetching payment data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch payment data" },
      { status: 500 }
    );
  }
}
