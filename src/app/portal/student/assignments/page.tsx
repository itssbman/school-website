import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentAssignmentsClient from "./StudentAssignmentsClient";

export default async function StudentAssignmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      submissions: { include: { assignment: true } },
    },
  });
  if (!student) redirect("/login");

  const assignments = await prisma.assignment.findMany({
    where: { classId: student.class },
    orderBy: { dueDate: "asc" },
  });

  return (
    <StudentAssignmentsClient
      studentId={student.id}
      assignments={JSON.parse(JSON.stringify(assignments))}
      submissions={JSON.parse(JSON.stringify(student.submissions))}
    />
  );
}
