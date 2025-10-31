import { Resend } from "resend";

// Lazy initialization to avoid build-time errors when API key is missing
let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

/**
 * Send email using Resend
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = process.env.EMAIL_FROM || "bookings@azhollow.com",
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured, email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const result = await getResend().emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: String(error) };
  }
}

/**
 * Send order confirmation email to client
 */
export async function sendOrderConfirmation(
  clientEmail: string,
  clientName: string
) {
  const subject = "Thank you for your request - Azure Hollow";
  const html = `
    <p>Hi ${clientName},</p>
    <p>Thank you for reaching out to Azure Hollow! I've received your request for a tarot reading.</p>
    <p>I'll review your request and get back to you soon with next steps.</p>
    <p>Looking forward to connecting,<br>Jessica Rose<br>Azure Hollow</p>
  `;

  return sendEmail({ to: clientEmail, subject, html });
}

/**
 * Send payment link email to client
 */
export async function sendPaymentLink(
  clientEmail: string,
  clientName: string,
  requestId: string,
  paymentLink: string,
  date: string,
  time: string,
  packageName: string,
  customMessage?: string
) {
  const subject = `Your tarot reading - Payment link - Azure Hollow [#${requestId}]`;
  const html = `
    <p>Hi ${clientName},</p>
    <p>I'd love to do a ${packageName} reading for you!</p>
    <p>I've scheduled your session for:</p>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Package:</strong> ${packageName}</li>
    </ul>
    <p>Please complete your payment using the link below to confirm your booking:</p>
    <p><a href="${paymentLink}" style="display: inline-block; padding: 12px 24px; background-color: #A78BFA; color: white; text-decoration: none; border-radius: 6px;">Complete Payment</a></p>
    <p>This link will expire in 7 days.</p>
    ${customMessage ? `<p>${customMessage}</p>` : ""}
    <p>Looking forward to our session!<br>Jessica Rose<br>Azure Hollow</p>
  `;

  return sendEmail({ to: clientEmail, subject, html });
}

/**
 * Send rejection email to client
 */
export async function sendRejectionEmail(
  clientEmail: string,
  clientName: string,
  requestId: string,
  customMessage?: string
) {
  const subject = `Regarding your tarot reading request - Azure Hollow [#${requestId}]`;
  const html = `
    <p>Hi ${clientName},</p>
    <p>Thank you for your interest in a reading with Azure Hollow. ${
      customMessage || "Unfortunately, I'm not able to accommodate your request at this time."
    }</p>
    <p>I appreciate your understanding and wish you well on your journey.</p>
    <p>Best,<br>Jessica Rose<br>Azure Hollow</p>
  `;

  return sendEmail({ to: clientEmail, subject, html });
}

/**
 * Send payment confirmation email to client
 */
export async function sendPaymentConfirmation(
  clientEmail: string,
  clientName: string,
  date: string,
  time: string,
  packageName: string,
  zoomLink?: string
) {
  const subject = "Payment received - Your reading is confirmed - Azure Hollow";
  const html = `
    <p>Hi ${clientName},</p>
    <p>Your payment has been received! Your tarot reading is confirmed:</p>
    <ul>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      <li><strong>Package:</strong> ${packageName}</li>
    </ul>
    ${zoomLink ? `<p>Join your session here: <a href="${zoomLink}">${zoomLink}</a></p>` : "<p>A Zoom link will be sent closer to your session time.</p>"}
    <p>If you have any questions before our session, feel free to reach out.</p>
    <p>Looking forward to our reading,<br>Jessica Rose<br>Azure Hollow</p>
  `;

  return sendEmail({ to: clientEmail, subject, html });
}

/**
 * Send notification to admin (friend) about new request
 */
export async function sendAdminNotification(
  adminEmail: string,
  requestId: string,
  clientName: string,
  clientEmail: string,
  type: "new_request" | "payment_received" | "message_received"
) {
  let subject: string;
  let html: string;

  switch (type) {
    case "new_request":
      subject = `New tarot reading request - ${clientName}`;
      html = `
        <p>You have a new tarot reading request:</p>
        <ul>
          <li><strong>Client:</strong> ${clientName}</li>
          <li><strong>Email:</strong> ${clientEmail}</li>
          <li><strong>Request ID:</strong> #${requestId}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/messages">View in admin</a></p>
      `;
      break;
    case "payment_received":
      subject = `New payment received - ${clientName}`;
      html = `
        <p>Payment received for request #${requestId}:</p>
        <ul>
          <li><strong>Client:</strong> ${clientName}</li>
          <li><strong>Email:</strong> ${clientEmail}</li>
        </ul>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings">View booking</a></p>
      `;
      break;
    case "message_received":
      subject = `New message from ${clientName}`;
      html = `
        <p>You have a new message from ${clientName} (Request #${requestId}).</p>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/messages">View message</a></p>
      `;
      break;
  }

  return sendEmail({ to: adminEmail, subject, html });
}

