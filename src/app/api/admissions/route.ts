import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, class: className, message } = await req.json();

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
        notes: message,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
