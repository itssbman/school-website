import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentAssignmentsClient from "./ParentAssignmentsClient";

export default async function ParentAssignmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true } },
          submissions: {
            include: { assignment: true },
            orderBy: { submittedAt: "desc" },
          },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  // Get all assignments for the classes the children are in
  const childClasses = [...new Set((parent.children as any[]).map((c: any) => c.class))];
  const assignments = await prisma.assignment.findMany({
    where: { classId: { in: childClasses } },
    orderBy: { dueDate: "asc" },
  });

  return (
    <ParentAssignmentsClient
      children={JSON.parse(JSON.stringify(parent.children))}
      assignments={JSON.parse(JSON.stringify(assignments))}
    />
  );
}
