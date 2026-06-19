import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const withUserId = searchParams.get("with");

  try {
    if (withUserId) {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: session.user.id, receiverId: withUserId },
            { senderId: withUserId, receiverId: session.user.id },
          ],
        },
        orderBy: { createdAt: "asc" },
      });

      await prisma.message.updateMany({
        where: { receiverId: session.user.id, senderId: withUserId, read: false },
        data: { read: true },
      });

      return NextResponse.json(messages);
    }

    const sent = await prisma.message.findMany({
      where: { senderId: session.user.id },
      select: { receiverId: true },
      distinct: ["receiverId"],
    });
    const received = await prisma.message.findMany({
      where: { receiverId: session.user.id },
      select: { senderId: true },
      distinct: ["senderId"],
    });

    const partnerIds = [
      ...new Set([
        ...(sent as any[]).map((m: any) => m.receiverId),
        ...(received as any[]).map((m: any) => m.senderId),
      ]),
    ].filter((id) => id !== session.user.id);

    const threads = await Promise.all(
      partnerIds.map(async (userId) => {
        const partner = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, name: true, avatar: true },
        });

        const lastMsg = await prisma.message.findFirst({
          where: {
            OR: [
              { senderId: session.user.id, receiverId: userId },
              { senderId: userId, receiverId: session.user.id },
            ],
          },
          orderBy: { createdAt: "desc" },
        });

        const unread = await prisma.message.count({
          where: { senderId: userId, receiverId: session.user.id, read: false },
        });

        return {
          userId,
          name: partner?.name || "Unknown",
          avatar: partner?.avatar,
          lastMessage: lastMsg?.body || "",
          lastAt: lastMsg?.createdAt,
          unread,
        };
      })
    );

    return NextResponse.json(threads);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { receiverId, body } = await req.json();

    if (!receiverId || !body?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const message = await prisma.message.create({
      data: { senderId: session.user.id, receiverId, body: body.trim() },
    });

    return NextResponse.json(message, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
