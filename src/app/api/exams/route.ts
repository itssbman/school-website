import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const exams = await prisma.exam.findMany({ orderBy: [{ date: "asc" }, { startTime: "asc" }] });
  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { subject, class: cls, date, startTime, duration, venue, term } = body;
    if (!subject || !cls || !date || !startTime || !duration || !venue || !term) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const exam = await prisma.exam.create({
      data: { subject, class: cls, date: new Date(date), startTime, duration, venue, term },
    });
    return NextResponse.json(exam, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
