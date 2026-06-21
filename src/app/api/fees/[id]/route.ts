import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || !["admin", "parent"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status, reference } = await req.json();

  try {
    const record = await prisma.feeRecord.findUnique({ where: { id } });
    if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (session.user.role === "parent") {
      const parent = await prisma.parent.findUnique({
        where: { userId: session.user.id },
        include: { children: true },
      });
      const ownsRecord = (parent?.children as any[])?.some((c: any) => c.id === record.studentId);
      if (!ownsRecord) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await prisma.feeRecord.update({
      where: { id },
      data: {
        status,
        reference: reference ?? record.reference,
        paidAt: status === "paid" ? new Date() : null,
      },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
