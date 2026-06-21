import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AssignmentsClient from "./AssignmentsClient";

export default async function TeacherAssignmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    include: {
      assignments: {
        orderBy: { createdAt: "desc" },
        include: { submissions: true },
      },
    },
  });
  if (!teacher) redirect("/login");

  return (
    <AssignmentsClient
      initialAssignments={JSON.parse(JSON.stringify(teacher.assignments))}
      classes={teacher.classes}
    />
  );
}
