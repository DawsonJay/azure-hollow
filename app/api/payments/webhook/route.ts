import { NextRequest, NextResponse } from "next/server";
import { constructWebhookEvent } from "@/lib/stripe";
import { db } from "@/lib/db";
import { sendPaymentConfirmation, sendAdminNotification } from "@/lib/email";
import { calculateEndTime } from "@/lib/calendar";
import { formatDate, formatTime } from "@/lib/calendar";

/**
 * POST /api/payments/webhook - Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    const event = constructWebhookEvent(body, signature);

    // Handle payment succeeded
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const token = session.metadata?.token;

      if (!token) {
        console.error("No token in payment metadata");
        return NextResponse.json({ received: true });
      }

      // Get token record
      const tokenRecord = await db.token.findUnique({
        where: { token },
        include: {
          request: {
            include: {
              package: true,
            },
          },
        },
      });

      if (!tokenRecord || !tokenRecord.confirmedDate || !tokenRecord.confirmedTime) {
        console.error("Invalid token or missing confirmation details");
        return NextResponse.json({ received: true });
      }

      // Check if already processed
      if (tokenRecord.isUsed) {
        console.log("Payment already processed");
        return NextResponse.json({ received: true });
      }

      // Mark token as used
      await db.token.update({
        where: { id: tokenRecord.id },
        data: { isUsed: true },
      });

      // Create payment record
      await db.payment.create({
        data: {
          tokenId: tokenRecord.id,
          stripePaymentId: session.payment_intent || session.id,
          amount: session.amount_total / 100, // Convert from cents
          currency: session.currency || "usd",
          status: "succeeded",
        },
      });

      // Calculate end time
      const endTime = calculateEndTime(
        tokenRecord.confirmedTime,
        tokenRecord.request.package.duration
      );

      // Create booked session
      const bookedSession = await db.bookedSession.create({
        data: {
          requestId: tokenRecord.requestId,
          date: tokenRecord.confirmedDate,
          startTime: tokenRecord.confirmedTime,
          endTime,
          packageId: tokenRecord.request.packageId,
          clientName: tokenRecord.request.clientName,
          clientEmail: tokenRecord.request.clientEmail,
          // TODO: Generate Zoom link here if using Zoom API
        },
      });

      // Update request status
      await db.contactRequest.update({
        where: { id: tokenRecord.requestId },
        data: { status: "paid" },
      });

      // Send confirmation emails
      await sendPaymentConfirmation(
        tokenRecord.request.clientEmail,
        tokenRecord.request.clientName,
        formatDate(tokenRecord.confirmedDate),
        formatTime(tokenRecord.confirmedTime),
        tokenRecord.request.package.name,
        bookedSession.zoomLink || undefined
      );

      // Notify admin
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendAdminNotification(
          adminEmail,
          tokenRecord.requestId,
          tokenRecord.request.clientName,
          tokenRecord.request.clientEmail,
          "payment_received"
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: `Webhook handler failed: ${error.message}` },
      { status: 400 }
    );
  }
}
