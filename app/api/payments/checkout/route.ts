import { NextRequest, NextResponse } from "next/server";
import { validateToken, isSlotAvailable } from "@/lib/tokens";
import { createCheckoutSession } from "@/lib/stripe";
import { calculateEndTime } from "@/lib/calendar";

/**
 * POST /api/payments/checkout - Create Stripe checkout session
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token required" },
        { status: 400 }
      );
    }

    // Validate token
    const validation = await validateToken(token);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const tokenRecord = validation.token;
    
    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 400 }
      );
    }

    // Check if slot is still available (24-hour reservation may have expired)
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

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const session = await createCheckoutSession({
      token,
      amount: tokenRecord.request.package.price,
      successUrl: `${baseUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${baseUrl}/pay/${token}?cancelled=true`,
      metadata: {
        requestId: tokenRecord.requestId,
        packageId: tokenRecord.request.packageId,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

