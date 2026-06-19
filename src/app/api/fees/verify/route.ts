import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { reference, feeId } = await req.json();

    const verifyResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await verifyResponse.json();

    if (data.status && data.data.status === "success") {
      await prisma.feeRecord.update({
        where: { id: feeId },
        data: {
          status: "paid",
          paidAt: new Date(),
          reference,
        },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Payment not verified" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
