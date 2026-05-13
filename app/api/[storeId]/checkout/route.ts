import { NextResponse } from "next/server";
import { getMpesaAccessToken } from "@/lib/mpesa";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { phone, amount, userId, items } = await req.json();

  if (!phone || !amount || !userId || !items?.length) {
    return new NextResponse("phone, amount, userId and items are required", { status: 400 });
  }

  const token = await getMpesaAccessToken();

  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14);

  const { MPESA_BUSINESS_SHORT_CODE, MPESA_PASSKEY, NEXT_PUBLIC_BACKEND_URL } = process.env;
  const password = Buffer.from(`${MPESA_BUSINESS_SHORT_CODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

  const stkRes = await fetch(
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: MPESA_BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: MPESA_BUSINESS_SHORT_CODE,
        PhoneNumber: phone,
        CallBackURL: `${NEXT_PUBLIC_BACKEND_URL}/api/${params.storeId}/mpesa/callback`,
        AccountReference: "E-Shop",
        TransactionDesc: "Order payment",
      }),
    }
  );

  const stkData = await stkRes.json();

  if (!stkData.CheckoutRequestID) {
    return new NextResponse(stkData.errorMessage || "STK push failed", { status: 502 });
  }

  const productIds: string[] = items.map((item: { id: string }) => item.id);

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      phone,
      userId,
      checkoutRequestId: stkData.CheckoutRequestID,
      orderItems: {
        create: productIds.map((productId) => ({
          product: { connect: { id: productId } },
        })),
      },
    },
  });

  return NextResponse.json(
    { checkoutRequestId: stkData.CheckoutRequestID, orderId: order.id },
    { headers: corsHeaders }
  );
}
