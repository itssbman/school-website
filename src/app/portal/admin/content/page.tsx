import { demoNewsArticles, demoAnnouncements, demoEvents } from "@/lib/demo-data";
import ContentClient from "./ContentClient";

export const dynamic = "force-dynamic";

const initialNews = demoNewsArticles.map((n) => ({ ...n, published: !n.draft }));

const initialEvents = demoEvents.map((e) => ({ ...e, isPublic: true, endDate: e.startDate }));

const initialAnnouncements = [
  ...demoAnnouncements.parent,
  ...demoAnnouncements.student,
  ...demoAnnouncements.teacher,
].map((a) => ({ ...a, targetRole: "all", author: { name: "School Admin" } }));

export default function AdminContentPage() {
  return (
    <ContentClient
      initialNews={initialNews as any}
      initialEvents={initialEvents as any}
      initialAnnouncements={initialAnnouncements as any}
      initialGallery={[]}
    />
  );
}
