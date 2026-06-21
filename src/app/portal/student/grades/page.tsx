import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentGradesClient from "./StudentGradesClient";

export default async function StudentGradesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "student") redirect("/login");

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: { grades: { orderBy: { createdAt: "desc" } } },
  });

  if (!student) redirect("/login");

  return <StudentGradesClient grades={JSON.parse(JSON.stringify(student.grades))} />;
}
