import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ParentAttendanceClient from "./ParentAttendanceClient";

export default async function ParentAttendancePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "parent") redirect("/login");

  const parent = await prisma.parent.findUnique({
    where: { userId: session.user.id },
    include: {
      children: {
        include: {
          user: { select: { name: true } },
          attendance: { orderBy: { date: "desc" }, take: 60 },
        },
      },
    },
  });

  if (!parent) redirect("/login");

  return <ParentAttendanceClient children={JSON.parse(JSON.stringify(parent.children))} />;
}
