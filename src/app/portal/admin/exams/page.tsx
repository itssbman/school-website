import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ExamsClient from "./ExamsClient";

export default async function AdminExamsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const exams = await prisma.exam.findMany({
    orderBy: [{ class: "asc" }, { date: "asc" }],
  });

  const serialized = exams.map((e: any) => ({
    ...e,
    date: e.date instanceof Date ? e.date.toISOString().split("T")[0] : e.date,
  }));

  return <ExamsClient initialExams={JSON.parse(JSON.stringify(serialized))} />;
}
