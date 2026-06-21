import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentFeesClient from "./ParentFeesClient";

export default async function ParentFeesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true } },
          feeRecords: { orderBy: { dueDate: "desc" } },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  const userEmail = session.user.email ?? "";

  return (
    <ParentFeesClient
      children={JSON.parse(JSON.stringify(parent.children))}
      userEmail={userEmail}
    />
  );
}
