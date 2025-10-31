import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { sendOrderConfirmation, sendAdminNotification } from "@/lib/email";
import { updateRequestActivity } from "@/lib/expiration";

const createRequestSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  message: z.string().optional(),
  packageId: z.string(),
  preferredTimes: z.array(
    z.object({
      date: z.string(),
      times: z.array(z.string()),
    })
  ),
});

/**
 * POST /api/requests - Create a new contact request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createRequestSchema.parse(body);

    // Create the request
    const contactRequest = await db.contactRequest.create({
      data: {
        clientName: validated.clientName,
        clientEmail: validated.clientEmail,
        message: validated.message,
        packageId: validated.packageId,
        preferredTimes: validated.preferredTimes,
        status: "pending",
        lastActivityAt: new Date(),
      },
      include: {
        package: true,
      },
    });

    // Send confirmation email to client
    await sendOrderConfirmation(
      validated.clientEmail,
      validated.clientName
    );

    // Send notification to admin (if configured)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendAdminNotification(
        adminEmail,
        contactRequest.id,
        validated.clientName,
        validated.clientEmail,
        "new_request"
      );
    }

    return NextResponse.json(
      {
        success: true,
        requestId: contactRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating request:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create request" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/requests - Get all requests (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    const requests = await db.contactRequest.findMany({
      where: status ? { status } : undefined,
      include: {
        package: true,
        messages: {
          orderBy: { createdAt: "asc" },
        },
        bookedSession: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

