import { demoTeacher, demoStudentsByClass, demoAnnouncements } from "@/lib/demo-data";
import TeacherDashboardClient from "./TeacherDashboardClient";

export const dynamic = "force-dynamic";

export default function TeacherDashboard() {
  return (
    <TeacherDashboardClient
      teacher={demoTeacher}
      studentsByClass={demoStudentsByClass}
      announcements={demoAnnouncements.teacher}
    />
  );
}
