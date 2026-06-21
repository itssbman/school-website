import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import GradesClient from "./GradesClient";

export default async function TeacherGradesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) redirect("/login");

  const sheets = await Promise.all(
    teacher.classes.map(async (cls: string) => {
      const students = await prisma.student.findMany({
        where: { class: cls },
        include: {
          user: { select: { name: true } },
          grades: { orderBy: { createdAt: "desc" } },
        },
        orderBy: { user: { name: "asc" } },
      });

      const studentRows = students.map((s: any) => {
        const gradeMap: Record<string, number> = {};
        for (const sub of teacher.subjects) {
          const latest = s.grades.find((g: any) => g.subject === sub);
          if (latest) gradeMap[sub] = latest.score;
        }
        return { id: s.id, name: s.user.name, grades: gradeMap };
      });

      return { class: cls, subjects: teacher.subjects, students: studentRows };
    })
  );

  return <GradesClient sheets={JSON.parse(JSON.stringify(sheets))} />;
}
