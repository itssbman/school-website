import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminDashboardLoading from "./loading";
import { subDays, startOfDay } from "date-fns";

async function AdminDashboardData() {
  const today = startOfDay(new Date());
  const thirtyDaysAgo = subDays(today, 30);

  const [
    totalStudents,
    totalStaff,
    todayAttendance,
    termFees,
    attendanceTrend,
    applications,
    recentUsers,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.attendance.findMany({
      where: { date: { gte: today } },
    }),
    prisma.feeRecord.findMany({
      where: { term: "Term 1 2024/25" },
    }),
    prisma.attendance.groupBy({
      by: ["date"],
      where: { date: { gte: thirtyDaysAgo } },
      _count: { status: true },
    }),
    prisma.admissionApplication.findMany({
      orderBy: { appliedAt: "desc" },
      take: 10,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 15,
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
    }),
  ]);

  const feesCollected = (termFees as any[])
    .filter((f: any) => f.status === "paid")
    .reduce((sum: number, f: any) => sum + f.amount, 0);

  const attendanceRate =
    todayAttendance.length > 0
      ? Math.round(
          ((todayAttendance as any[]).filter((a: any) => a.status === "present").length /
            todayAttendance.length) *
            100
        )
      : 0;

  return (
    <AdminDashboardClient
      stats={{
        totalStudents,
        totalStaff,
        attendanceRateToday: attendanceRate,
        feesCollectedThisTerm: feesCollected,
      }}
      attendanceTrend={JSON.parse(JSON.stringify(attendanceTrend))}
      termFees={JSON.parse(JSON.stringify(termFees))}
      applications={JSON.parse(JSON.stringify(applications))}
      recentUsers={JSON.parse(JSON.stringify(recentUsers))}
    />
  );
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  return (
    <Suspense fallback={<AdminDashboardLoading />}>
      <AdminDashboardData />
    </Suspense>
  );
}
