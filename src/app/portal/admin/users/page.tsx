import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UsersClient from "./UsersClient";

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, active: true, createdAt: true },
  });

  return <UsersClient initialUsers={JSON.parse(JSON.stringify(users))} />;
}
