import { db } from "./db";
import { addDays, addHours } from "date-fns";
import { calculateEndTime } from "./calendar";

/**
 * Generate a secure random token for payment links
 */
export function generateToken(): string {
  return crypto.randomUUID() + "-" + Date.now().toString(36);
}

/**
 * Create a payment token for a request
 */
export async function createPaymentToken(
  requestId: string,
  confirmedDate: Date,
  confirmedTime: string
): Promise<string> {
  const token = generateToken();
  const expiresAt = addDays(new Date(), 7); // 7 days expiration

  await db.token.create({
    data: {
      requestId,
      token,
      confirmedDate,
      confirmedTime,
      expiresAt,
    },
  });

  return token;
}

/**
 * Validate and retrieve a token
 */
export async function validateToken(token: string) {
  const tokenRecord = await db.token.findUnique({
    where: { token },
    include: {
      request: {
        include: {
          package: true,
        },
      },
      reservedSlot: true,
      payment: true,
    },
  });

  if (!tokenRecord) {
    return { valid: false, error: "Token not found" };
  }

  if (tokenRecord.isUsed) {
    return { valid: false, error: "Token already used" };
  }

  if (new Date() > tokenRecord.expiresAt) {
    return { valid: false, error: "Token expired" };
  }

  return { valid: true, token: tokenRecord };
}

/**
 * Create a 24-hour slot reservation
 */
export async function createSlotReservation(
  tokenId: string,
  date: Date,
  startTime: string,
  endTime: string
) {
  const expiresAt = addHours(new Date(), 24); // 24-hour reservation

  return db.reservedSlot.create({
    data: {
      tokenId,
      date,
      startTime,
      endTime,
      expiresAt,
    },
  });
}

/**
 * Check if a slot is available (not booked and not reserved)
 * If endTime is not provided, calculates it from package duration
 */
export async function isSlotAvailable(
  date: Date,
  startTime: string,
  endTimeOrDuration: string | number
): Promise<boolean> {
  // Handle both endTime string and duration number
  const endTime = typeof endTimeOrDuration === "number" 
    ? calculateEndTime(startTime, endTimeOrDuration)
    : endTimeOrDuration;
  // Check if there's an active reservation that overlaps
  const activeReservation = await db.reservedSlot.findFirst({
    where: {
      date: date,
      OR: [
        {
          AND: [
            { startTime: { lte: startTime } },
            { endTime: { gt: startTime } },
          ],
        },
        {
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gte: endTime } },
          ],
        },
        {
          AND: [
            { startTime: { gte: startTime } },
            { endTime: { lte: endTime } },
          ],
        },
      ],
      expiresAt: { gt: new Date() },
    },
  });

  if (activeReservation) {
    return false;
  }

  // Check if there's a booked session that overlaps
  const bookedSession = await db.bookedSession.findFirst({
    where: {
      date: date,
      OR: [
        {
          AND: [
            { startTime: { lte: startTime } },
            { endTime: { gt: startTime } },
          ],
        },
        {
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gte: endTime } },
          ],
        },
        {
          AND: [
            { startTime: { gte: startTime } },
            { endTime: { lte: endTime } },
          ],
        },
      ],
    },
  });

  return !bookedSession;
}

