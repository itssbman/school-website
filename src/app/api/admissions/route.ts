import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const query  = searchParams.get("q");

  const applications = await prisma.admissionApplication.findMany({
    where: {
      ...(status ? { status: status as any } : {}),
      ...(query  ? { OR: [
        { firstName: { contains: query, mode: "insensitive" } },
        { lastName:  { contains: query, mode: "insensitive" } },
        { email:     { contains: query, mode: "insensitive" } },
      ]} : {}),
    },
    orderBy: { appliedAt: "desc" },
  });

  return NextResponse.json(applications);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, class: className, parentName, parentPhone, message } = body;

    if (!firstName || !lastName || !email || !phone || !className) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const application = await prisma.admissionApplication.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        class: className,
        parentName:  parentName  ?? null,
        parentPhone: parentPhone ?? null,
        notes: message ?? null,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
