import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentGradesClient from "./ParentGradesClient";

export default async function ParentGradesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true } },
          grades: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  return <ParentGradesClient children={JSON.parse(JSON.stringify(parent.children))} />;
}
