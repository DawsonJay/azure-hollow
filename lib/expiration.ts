import { db } from "./db";
import { subDays } from "date-fns";

/**
 * Check and expire requests that have been inactive for 7 days
 */
export async function checkAndExpireRequests() {
  const sevenDaysAgo = subDays(new Date(), 7);

  const expiredRequests = await db.contactRequest.findMany({
    where: {
      status: {
        in: ["pending", "in_conversation"],
      },
      lastActivityAt: {
        lte: sevenDaysAgo,
      },
    },
  });

  for (const request of expiredRequests) {
    await db.contactRequest.update({
      where: { id: request.id },
      data: {
        status: "expired",
      },
    });

    // TODO: Send auto-rejection email
    // await sendExpirationEmail(request);
  }

  return expiredRequests.length;
}

/**
 * Update last activity timestamp for a request
 * Call this whenever there's activity (message sent, status changed)
 */
export async function updateRequestActivity(requestId: string) {
  return db.contactRequest.update({
    where: { id: requestId },
    data: {
      lastActivityAt: new Date(),
    },
  });
}

