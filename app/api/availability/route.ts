import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createAvailabilitySchema = z.object({
  date: z.string(), // ISO date string
  startTime: z.string(), // "HH:MM" format
});

/**
 * GET /api/availability - Get all available slots
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin
    // For public endpoint, return only dates that have availability

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};
    if (startDate) {
      where.date = { gte: new Date(startDate) };
    }
    if (endDate) {
      where.date = {
        ...where.date,
        lte: new Date(endDate),
      };
    }

    const slots = await db.availabilitySlot.findMany({
      where,
      orderBy: [
        { date: "asc" },
        { startTime: "asc" },
      ],
    });

    // Group by date for easier frontend consumption
    const groupedByDate = slots.reduce((acc: Record<string, string[]>, slot: { date: Date; startTime: string }) => {
      const dateKey = slot.date.toISOString().split("T")[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(slot.startTime);
      return acc;
    }, {} as Record<string, string[]>);

    return NextResponse.json({
      success: true,
      slots: groupedByDate,
      rawSlots: slots, // Also return raw for admin use
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/availability - Create availability slot (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = createAvailabilitySchema.parse(body);

    const slot = await db.availabilitySlot.create({
      data: {
        date: new Date(validated.date),
        startTime: validated.startTime,
      },
    });

    return NextResponse.json({ success: true, slot }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating availability slot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create availability slot" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/availability - Delete availability slot (admin only)
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date");
    const startTime = searchParams.get("startTime");

    if (!date || !startTime) {
      return NextResponse.json(
        { success: false, error: "date and startTime required" },
        { status: 400 }
      );
    }

    await db.availabilitySlot.deleteMany({
      where: {
        date: new Date(date),
        startTime,
      },
    });

    return NextResponse.json({ success: true, message: "Slot deleted" });
  } catch (error) {
    console.error("Error deleting availability slot:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete availability slot" },
      { status: 500 }
    );
  }
}

