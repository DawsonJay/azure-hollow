/**
 * Seed script to create initial packages
 * Run with: npx tsx scripts/seed-packages.ts
 */

import { db } from "../lib/db";

const packages = [
  {
    name: "Quick Reading",
    duration: 30,
    price: 50.0,
    description: "Perfect for a single question or quick guidance on a specific area of your life. Get clear insights and direction in this focused session.",
  },
  {
    name: "Full Reading",
    duration: 60,
    price: 90.0,
    description: "A comprehensive reading covering multiple aspects of your life. Explore relationships, career, personal growth, and more with detailed card spreads.",
  },
  {
    name: "Extended Reading",
    duration: 90,
    price: 130.0,
    description: "An in-depth session for those seeking thorough guidance. Multiple spreads and extended conversation to explore your questions deeply and provide comprehensive insight.",
  },
];

async function main() {
  console.log("Seeding packages...");

  for (const pkg of packages) {
    const existing = await db.package.findFirst({
      where: { name: pkg.name },
    });

    if (existing) {
      console.log(`Package "${pkg.name}" already exists, skipping`);
    } else {
      const created = await db.package.create({
        data: pkg,
      });
      console.log(`Created package: ${created.name} (${created.duration} min, $${created.price})`);
    }
  }

  console.log("Packages seeded!");
  await db.$disconnect();
}

main().catch(console.error);

