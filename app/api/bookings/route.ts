import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/bookings - Get all upcoming bookings (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const limit = searchParams.get("limit");

    const where: any = {};
    if (startDate) {
      where.date = { gte: new Date(startDate) };
    } else {
      // Default to future bookings only
      where.date = { gte: new Date() };
    }

    const bookings = await db.bookedSession.findMany({
      where,
      include: {
        package: true,
        request: {
          select: {
            clientEmail: true,
          },
        },
      },
      orderBy: [
        { date: "asc" },
        { startTime: "asc" },
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

