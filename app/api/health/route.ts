import { NextResponse } from "next/server";

/**
 * GET /api/health - Health check endpoint for Railway
 * Simple health check that doesn't require database connection
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}

