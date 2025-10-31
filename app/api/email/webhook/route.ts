import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { updateRequestActivity } from "@/lib/expiration";
import { sendAdminNotification } from "@/lib/email";

/**
 * POST /api/email/webhook - Handle inbound email webhook from Resend/Mailgun
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract request ID from subject line
    // Format: "Your Tarot Reading Request [#12345]" or "Re: Your Tarot Reading Request [#12345]"
    const subject = body.subject || body["subject"] || "";
    const requestIdMatch = subject.match(/\[#([^\]]+)\]/);
    
    if (!requestIdMatch) {
      console.warn("No request ID found in email subject:", subject);
      return NextResponse.json({ received: true, message: "No request ID found" });
    }

    const requestId = requestIdMatch[1];

    // Verify request exists
    const contactRequest = await db.contactRequest.findUnique({
      where: { id: requestId },
    });

    if (!contactRequest) {
      console.warn("Request not found for ID:", requestId);
      return NextResponse.json({ received: true, message: "Request not found" });
    }

    // Extract email content
    const senderEmail = body.from?.email || body["from_email"] || body.from || "";
    const content = body.text || body["body-plain"] || body.html || body["body-html"] || "";

    // Store message in database
    await db.message.create({
      data: {
        requestId,
        senderEmail,
        senderType: senderEmail === contactRequest.clientEmail ? "client" : "friend",
        content,
        subject,
        requestIdInSubject: requestId,
      },
    });

    // Update request activity (extends expiration)
    await updateRequestActivity(requestId);

    // Update status to in_conversation if still pending
    if (contactRequest.status === "pending") {
      await db.contactRequest.update({
        where: { id: requestId },
        data: { status: "in_conversation" },
      });
    }

    // Notify admin if message from client
    if (senderEmail === contactRequest.clientEmail) {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        await sendAdminNotification(
          adminEmail,
          requestId,
          contactRequest.clientName,
          contactRequest.clientEmail,
          "message_received"
        );
      }
    }

    return NextResponse.json({ received: true, requestId });
  } catch (error) {
    console.error("Email webhook error:", error);
    // Still return 200 to prevent email service from retrying
    return NextResponse.json({ received: true, error: String(error) });
  }
}

