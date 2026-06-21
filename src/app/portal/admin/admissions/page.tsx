import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AdminAdmissionsClient from "./AdminAdmissionsClient";

export default async function AdminAdmissionsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const applications = await prisma.admissionApplication.findMany({
    orderBy: { appliedAt: "desc" },
  });

  return <AdminAdmissionsClient initialApplications={JSON.parse(JSON.stringify(applications))} />;
}
