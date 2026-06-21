import { demoTeacher, demoLessonPlans } from "@/lib/demo-data";
import LessonPlansClient from "./LessonPlansClient";

export const dynamic = "force-dynamic";

const initialPlans = demoLessonPlans.map((p, i) => ({
  id: p.id,
  subject: p.subject,
  class: demoTeacher.classes[i % demoTeacher.classes.length],
  week: p.title.replace(/\.pdf$/, ""),
  fileUrl: "#",
  uploadedAt: p.uploadedAt,
}));

export default function TeacherLessonPlansPage() {
  return (
    <LessonPlansClient
      initialPlans={initialPlans}
      subjects={demoTeacher.subjects}
      classes={demoTeacher.classes}
    />
  );
}
