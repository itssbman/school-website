import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await prisma.exam.update({
      where: { id },
      data: {
        ...(body.subject    ? { subject: body.subject }                  : {}),
        ...(body.class      ? { class: body.class }                      : {}),
        ...(body.date       ? { date: new Date(body.date) }              : {}),
        ...(body.startTime  ? { startTime: body.startTime }              : {}),
        ...(body.duration   ? { duration: body.duration }                : {}),
        ...(body.venue      ? { venue: body.venue }                      : {}),
        ...(body.term       ? { term: body.term }                        : {}),
      },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.exam.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
