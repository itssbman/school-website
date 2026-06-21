import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TeacherDashboardClient from "./TeacherDashboardClient";

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    include: {
      user: { select: { name: true, email: true, avatar: true } },
      assignments: {
        include: { submissions: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      },
      lessonPlans: { orderBy: { uploadedAt: "desc" }, take: 3 },
    },
  });
  if (!teacher) redirect("/login");

  const studentsByClass = await Promise.all(
    (teacher.classes as string[]).map(async (cls: string) => {
      const students = await prisma.student.findMany({
        where: { class: cls },
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { user: { name: "asc" } },
      });
      return { class: cls, students };
    })
  );

  const announcements = await prisma.announcement.findMany({
    where: { targetRole: { in: ["teacher", "all"] } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <TeacherDashboardClient
      teacher={JSON.parse(JSON.stringify(teacher))}
      studentsByClass={JSON.parse(JSON.stringify(studentsByClass))}
      announcements={JSON.parse(JSON.stringify(announcements))}
    />
  );
}
