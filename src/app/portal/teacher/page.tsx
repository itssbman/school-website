import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TeacherDashboardClient from "./TeacherDashboardClient";
import TeacherDashboardLoading from "./loading";

async function TeacherDashboardData({ userId }: { userId: string }) {
  // teacher must resolve first to get teacher.classes[]
  const teacher = await prisma.teacher.findUnique({
    where: { userId },
    include: {
      user: { select: { name: true, avatar: true } },
      assignments: {
        include: { submissions: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!teacher) redirect("/login");

  // studentsByClass (one query per class) and announcements are independent — run in parallel.
  const [studentsByClass, announcements] = await Promise.all([
    Promise.all(
      (teacher.classes as string[]).map(async (className: string) => {
        const students = await prisma.student.findMany({
          where: { class: className },
          include: { user: { select: { name: true, avatar: true } } },
        });
        return { class: className, students };
      })
    ),
    prisma.announcement.findMany({
      where: { targetRole: { in: ["teacher", "all"] } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <TeacherDashboardClient
      teacher={JSON.parse(JSON.stringify(teacher))}
      studentsByClass={JSON.parse(JSON.stringify(studentsByClass))}
      announcements={JSON.parse(JSON.stringify(announcements))}
    />
  );
}

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  return (
    <Suspense fallback={<TeacherDashboardLoading />}>
      <TeacherDashboardData userId={session.user.id} />
    </Suspense>
  );
}
