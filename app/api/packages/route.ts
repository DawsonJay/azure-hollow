import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createPackageSchema = z.object({
  name: z.string().min(1),
  duration: z.number().int().positive(),
  price: z.number().positive(),
  description: z.string().optional(),
});

/**
 * GET /api/packages - Get all active packages
 */
export async function GET() {
  try {
    const packages = await db.package.findMany({
      where: { isActive: true },
      orderBy: { duration: "asc" },
    });

    return NextResponse.json({ success: true, packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/packages - Create package (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const body = await request.json();
    const validated = createPackageSchema.parse(body);

    const packageRecord = await db.package.create({
      data: validated,
    });

    return NextResponse.json({ success: true, package: packageRecord }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating package:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create package" },
      { status: 500 }
    );
  }
}

