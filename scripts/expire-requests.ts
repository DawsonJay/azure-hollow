/**
 * Script to check and expire requests that have been inactive for 7 days
 * Can be run as a cron job or scheduled task
 */

import { db } from "../lib/db";
import { subDays } from "date-fns";
import { sendRejectionEmail } from "../lib/email";

async function main() {
  console.log("Checking for expired requests...");
  
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

  if (expiredRequests.length === 0) {
    console.log("No requests to expire");
    await db.$disconnect();
    return;
  }

  console.log(`Found ${expiredRequests.length} request(s) to expire`);

  for (const request of expiredRequests) {
    // Update status to expired
    await db.contactRequest.update({
      where: { id: request.id },
      data: {
        status: "expired",
      },
    });

    // Send auto-rejection email
    await sendRejectionEmail(
      request.clientEmail,
      request.clientName,
      request.id,
      "Your request has expired after 7 days of inactivity. If you'd still like to book a reading, please feel free to submit a new request."
    );

    console.log(`Expired request #${request.id} (${request.clientName})`);
  }

  console.log(`Expired ${expiredRequests.length} request(s)`);
  await db.$disconnect();
}

main().catch(console.error);

