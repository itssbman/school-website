import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import StudentDashboardClient from "./StudentDashboardClient";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      user: { select: { name: true, email: true, avatar: true } },
      grades: { orderBy: { createdAt: "desc" }, take: 18 },
      attendance: { orderBy: { date: "desc" }, take: 60 },
      feeRecords: { orderBy: { dueDate: "desc" }, take: 3 },
      submissions: { include: { assignment: true }, orderBy: { submittedAt: "desc" } },
    },
  });

  if (!student) redirect("/login");

  const dayName = format(new Date(), "EEEE");
  const timetable = await prisma.timetable.findMany({
    where: { class: student.class, day: dayName },
    orderBy: { period: "asc" },
  });

  const assignments = await prisma.assignment.findMany({
    where: { classId: student.class },
    orderBy: { dueDate: "asc" },
    take: 10,
  });

  const events = await prisma.event.findMany({
    where: { isPublic: true, startDate: { gte: new Date() } },
    orderBy: { startDate: "asc" },
    take: 5,
  });

  const announcements = await prisma.announcement.findMany({
    where: { targetRole: { in: ["student", "all"] } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <StudentDashboardClient
      student={JSON.parse(JSON.stringify({ ...student, className: student.class }))}
      timetable={JSON.parse(JSON.stringify(timetable))}
      events={JSON.parse(JSON.stringify(events))}
      announcements={JSON.parse(JSON.stringify(announcements))}
      assignments={JSON.parse(JSON.stringify(assignments))}
    />
  );
}
