import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ParentDashboardClient from "./ParentDashboardClient";
import ParentDashboardLoading from "./loading";

// Async server component — fetches data independently, suspends until ready.
// Wrapped in <Suspense> below so the shell (sidebar + topbar) renders first
// and the skeleton shows while data streams in.
async function ParentDashboardData({ userId }: { userId: string }) {
  const [parent, announcements] = await Promise.all([
    prisma.parent.findUnique({
      where: { userId },
      include: {
        children: {
          include: {
            user: { select: { name: true, avatar: true } },
            grades: { orderBy: { createdAt: "desc" }, take: 20 },
            attendance: {
              where: {
                date: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1),
                },
              },
            },
            feeRecords: { orderBy: { dueDate: "desc" }, take: 3 },
            submissions: {
              include: { assignment: true },
              orderBy: { submittedAt: "desc" },
              take: 5,
            },
          },
        },
      },
    }),
    prisma.announcement.findMany({
      where: { targetRole: { in: ["parent", "all"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  if (!parent) redirect("/login");

  return (
    <ParentDashboardClient
      parent={JSON.parse(JSON.stringify(parent))}
      announcements={JSON.parse(JSON.stringify(announcements))}
    />
  );
}

export default async function ParentDashboard() {
  // Auth check is fast (JWT cookie decode — no DB hit).
  // Keeping it outside the Suspense boundary so a redirect fires immediately.
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  return (
    <Suspense fallback={<ParentDashboardLoading />}>
      <ParentDashboardData userId={session.user.id} />
    </Suspense>
  );
}
