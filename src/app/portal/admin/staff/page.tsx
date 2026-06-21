import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import StaffClient from "./StaffClient";

export default async function AdminStaffPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const staff = await prisma.teacher.findMany({
    orderBy: { user: { name: "asc" } },
    include: {
      user: { select: { id: true, name: true, email: true, role: true, active: true } },
    },
  });

  return <StaffClient initialStaff={JSON.parse(JSON.stringify(staff))} />;
}
