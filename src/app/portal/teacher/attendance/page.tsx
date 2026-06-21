import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AttendanceClient from "./AttendanceClient";

export default async function TeacherAttendancePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
  if (!teacher) redirect("/login");

  const studentsByClass = await Promise.all(
    teacher.classes.map(async (cls: string) => {
      const students = await prisma.student.findMany({
        where: { class: cls },
        include: { user: { select: { name: true } } },
        orderBy: { user: { name: "asc" } },
      });
      return { class: cls, students };
    })
  );

  return (
    <AttendanceClient
      classes={teacher.classes}
      studentsByClass={JSON.parse(JSON.stringify(studentsByClass))}
    />
  );
}
