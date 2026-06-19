import AlertBanner from "@/components/landing/AlertBanner";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import MissionVision from "@/components/landing/MissionVision";
import Timeline from "@/components/landing/Timeline";
import NewsEvents from "@/components/landing/NewsEvents";
import GalleryPreview from "@/components/landing/GalleryPreview";
import AdmissionsCTA from "@/components/landing/AdmissionsCTA";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

async function getPageData() {
  try {
    const [news, events, notices] = await Promise.all([
      prisma.newsArticle.findMany({
        take: 3,
        orderBy: { publishedAt: "desc" },
        select: { id: true, title: true, slug: true, excerpt: true, publishedAt: true },
      }),
      prisma.event.findMany({
        take: 5,
        where: { startDate: { gte: new Date() } },
        orderBy: { startDate: "asc" },
        select: { id: true, title: true, startDate: true, type: true },
      }),
      prisma.announcement.findMany({
        take: 1,
        where: { targetRole: "public" },
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, body: true },
      }),
    ]);
    return { news, events, notices };
  } catch {
    return { news: [], events: [], notices: [] };
  }
}

export default async function HomePage() {
  const { news, events, notices } = await getPageData();

  return (
    <div className="flex flex-col min-h-screen">
      <AlertBanner notices={notices} />
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <MissionVision />
        <Timeline />
        <NewsEvents news={news as any} events={events as any} />
        <GalleryPreview />
        <AdmissionsCTA />
      </main>
      <Footer />
    </div>
  );
}
