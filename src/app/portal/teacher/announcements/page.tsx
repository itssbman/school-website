import { demoAnnouncements } from "@/lib/demo-data";
import AnnouncementsClient from "./AnnouncementsClient";

export const dynamic = "force-dynamic";

const initialAnnouncements = demoAnnouncements.teacher.map((a) => ({
  ...a,
  targetRole: "teacher" as const,
  author: { name: "School Admin" },
}));

export default function TeacherAnnouncementsPage() {
  return <AnnouncementsClient initialAnnouncements={initialAnnouncements} />;
}
