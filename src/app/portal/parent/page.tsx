import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentDashboardClient from "./ParentDashboardClient";

export default async function ParentDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { id: true, name: true, avatar: true } },
          grades: { orderBy: { createdAt: "desc" } },
          attendance: { orderBy: { date: "desc" }, take: 60 },
          feeRecords: { orderBy: { dueDate: "desc" } },
          submissions: {
            include: { assignment: { select: { title: true, dueDate: true } } },
            orderBy: { submittedAt: "desc" },
            take: 5,
          },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  const announcements = await prisma.announcement.findMany({
    where: { targetRole: { in: ["parent", "all"] } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <ParentDashboardClient
      parent={JSON.parse(JSON.stringify(parent))}
      announcements={JSON.parse(JSON.stringify(announcements))}
    />
  );
}
