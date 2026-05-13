import { NextResponse } from "next/server";

// Stripe webhook removed. M-Pesa callback is at:
// POST /api/[storeId]/mpesa/callback
export async function POST() {
  return new NextResponse("Stripe webhook removed. Use /api/[storeId]/mpesa/callback", {
    status: 410,
  });
}
