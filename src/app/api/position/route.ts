import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();
  const unlock = new Date(now.getTime() + 240 * 24 * 60 * 60 * 1000);

  const position = {
    amount: 10000,
    start: now.toISOString(),
    unlock: unlock.toISOString(),
    charityId: 1,
    redeemed: false,
    currentValue: 10847,
    estimatedGrowth: 847,
  };

  return NextResponse.json({ position });
}
