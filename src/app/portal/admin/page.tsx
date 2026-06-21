import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const [
    totalStudents,
    totalStaff,
    todayAttendance,
    termFees,
    applications,
    recentUsers,
    attendanceTrend,
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.attendance.groupBy({
      by: ["status"],
      where: { date: { gte: today, lte: todayEnd } },
      _count: { status: true },
    }),
    prisma.feeRecord.findMany({
      orderBy: { dueDate: "desc" },
      take: 50,
      include: { student: { include: { user: { select: { name: true } } } } },
    }),
    prisma.admissionApplication.findMany({
      orderBy: { appliedAt: "desc" },
      take: 20,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
    }),
    prisma.attendance.groupBy({
      by: ["date", "status"],
      where: { date: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
      _count: { status: true },
      orderBy: { date: "asc" },
    }),
  ]);

  const presentCount = todayAttendance.find((r: any) => r.status === "present")?._count?.status ?? 0;
  const totalTodayAttendance = todayAttendance.reduce((s: number, r: any) => s + (r._count?.status ?? 0), 0);
  const attendanceRateToday = totalTodayAttendance > 0
    ? Math.round((presentCount / totalTodayAttendance) * 100)
    : 0;

  const feesCollectedThisTerm = (termFees as any[])
    .filter((f: any) => f.status === "paid")
    .reduce((s: number, f: any) => s + f.amount, 0);

  const stats = {
    totalStudents,
    totalStaff,
    attendanceRateToday,
    feesCollectedThisTerm,
  };

  return (
    <AdminDashboardClient
      stats={stats}
      attendanceTrend={JSON.parse(JSON.stringify(attendanceTrend))}
      termFees={JSON.parse(JSON.stringify(termFees))}
      applications={JSON.parse(JSON.stringify(applications))}
      recentUsers={JSON.parse(JSON.stringify(recentUsers))}
    />
  );
}
