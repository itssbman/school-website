import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import AnnouncementsClient from "./AnnouncementsClient";

export default async function TeacherAnnouncementsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "teacher") redirect("/login");

  const announcements = await prisma.announcement.findMany({
    where: { targetRole: { in: ["teacher", "all"] } },
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <AnnouncementsClient
      initialAnnouncements={JSON.parse(JSON.stringify(announcements))}
    />
  );
}
