import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ContentClient from "./ContentClient";

export default async function AdminContentPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const [news, events, announcements, gallery] = await Promise.all([
    prisma.newsArticle.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.event.findMany({ orderBy: { startDate: "asc" } }),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <ContentClient
      initialNews={JSON.parse(JSON.stringify(news))}
      initialEvents={JSON.parse(JSON.stringify(events))}
      initialAnnouncements={JSON.parse(JSON.stringify(announcements))}
      initialGallery={JSON.parse(JSON.stringify(gallery))}
    />
  );
}
