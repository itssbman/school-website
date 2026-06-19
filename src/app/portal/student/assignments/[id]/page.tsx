import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AssignmentSubmitClient from "./AssignmentSubmitClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AssignmentPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const { id } = await params;
  const student = await prisma.student.findUnique({ where: { userId: session.user.id } });
  if (!student) redirect("/login");

  const assignment = await prisma.assignment.findUnique({
    where: { id },
    include: {
      teacher: { include: { user: { select: { name: true } } } },
      submissions: { where: { studentId: student.id } },
    },
  });

  if (!assignment) notFound();

  return (
    <AssignmentSubmitClient
      assignment={JSON.parse(JSON.stringify(assignment))}
      studentId={student.id}
    />
  );
}
