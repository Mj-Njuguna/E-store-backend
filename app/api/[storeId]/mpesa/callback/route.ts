import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  const callbackData = body?.Body?.stkCallback;

  if (!callbackData) {
    return new NextResponse("Invalid callback payload", { status: 400 });
  }

  const { CheckoutRequestID, ResultCode, CallbackMetadata } = callbackData;

  // ResultCode 0 = success
  if (ResultCode !== 0) {
    return new NextResponse(null, { status: 200 });
  }

  const metaItems: { Name: string; Value: string | number }[] =
    CallbackMetadata?.Item ?? [];

  const get = (name: string) =>
    metaItems.find((i) => i.Name === name)?.Value?.toString() ?? "";

  const mpesaReceiptNumber = get("MpesaReceiptNumber");
  const phone = get("PhoneNumber");

  const order = await prismadb.order.findFirst({
    where: { checkoutRequestId: CheckoutRequestID },
    include: { orderItems: true },
  });

  if (!order) return new NextResponse(null, { status: 200 });

  await prismadb.order.update({
    where: { id: order.id },
    data: {
      isPaid: true,
      phone,
      address: mpesaReceiptNumber, // store receipt as reference
    },
  });

  const productIds = order.orderItems.map((item) => item.productId);

  await prismadb.product.updateMany({
    where: { id: { in: productIds } },
    data: { isArchived: true },
  });

  return new NextResponse(null, { status: 200 });
}
