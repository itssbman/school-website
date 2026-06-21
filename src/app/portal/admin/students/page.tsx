import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StudentsClient from "./StudentsClient";

export default async function AdminStudentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const students = await prisma.student.findMany({
    orderBy: { user: { name: "asc" } },
    include: {
      user: { select: { id: true, name: true, email: true } },
      feeRecords: { orderBy: { dueDate: "desc" }, take: 1, select: { status: true } },
    },
  });

  return <StudentsClient initialStudents={JSON.parse(JSON.stringify(students))} />;
}
