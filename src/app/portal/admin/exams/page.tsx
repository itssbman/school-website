import { demoExamTimetable } from "@/lib/demo-data";
import ExamsClient from "./ExamsClient";

export const dynamic = "force-dynamic";

const initialExams = demoExamTimetable.map((e) => ({
  id: e.id,
  subject: e.subject,
  class: e.class,
  date: e.date,
  startTime: e.time,
  duration: e.duration,
  venue: e.venue,
  term: "Term 1 2025/26",
}));

export default function AdminExamsPage() {
  return <ExamsClient initialExams={initialExams} />;
}
