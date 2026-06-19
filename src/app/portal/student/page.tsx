import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import StudentDashboardClient from "./StudentDashboardClient";
import { format } from "date-fns";
import StudentDashboardLoading from "./loading";

async function StudentDashboardData({ userId }: { userId: string }) {
  // student must resolve first — its .class field is needed by timetable & assignments
  const student = await prisma.student.findUnique({
    where: { userId },
    include: {
      user: { select: { name: true, avatar: true } },
      grades: { orderBy: { createdAt: "desc" }, take: 30 },
      attendance: {
        where: { date: { gte: new Date(new Date().setDate(new Date().getDate() - 90)) } },
      },
      submissions: {
        include: { assignment: true },
        orderBy: { submittedAt: "desc" },
      },
    },
  });

  if (!student) redirect("/login");

  const today = new Date();
  const dayName = format(today, "EEEE");

  // All four downstream queries are independent of each other — run in parallel.
  const [timetable, events, announcements, assignments] = await Promise.all([
    prisma.timetable.findMany({
      where: { class: student.class, day: dayName },
      orderBy: { period: "asc" },
    }),
    prisma.event.findMany({
      where: { startDate: { gte: today } },
      orderBy: { startDate: "asc" },
      take: 5,
    }),
    prisma.announcement.findMany({
      where: { targetRole: { in: ["student", "all"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.assignment.findMany({
      where: { classId: student.class },
      orderBy: { dueDate: "asc" },
      take: 10,
    }),
  ]);

  return (
    <StudentDashboardClient
      student={JSON.parse(JSON.stringify(student))}
      timetable={JSON.parse(JSON.stringify(timetable))}
      events={JSON.parse(JSON.stringify(events))}
      announcements={JSON.parse(JSON.stringify(announcements))}
      assignments={JSON.parse(JSON.stringify(assignments))}
    />
  );
}

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  return (
    <Suspense fallback={<StudentDashboardLoading />}>
      <StudentDashboardData userId={session.user.id} />
    </Suspense>
  );
}
