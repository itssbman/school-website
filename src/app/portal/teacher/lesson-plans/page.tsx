import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LessonPlansClient from "./LessonPlansClient";

export default async function TeacherLessonPlansPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    include: {
      lessonPlans: { orderBy: { uploadedAt: "desc" } },
    },
  });
  if (!teacher) redirect("/login");

  return (
    <LessonPlansClient
      initialPlans={JSON.parse(JSON.stringify(teacher.lessonPlans))}
      subjects={teacher.subjects}
      classes={teacher.classes}
    />
  );
}
