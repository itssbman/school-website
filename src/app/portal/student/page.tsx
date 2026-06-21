import { demoStudent, demoTimetableAll, demoEvents, demoAnnouncements, demoAssignments } from "@/lib/demo-data";
import StudentDashboardClient from "./StudentDashboardClient";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default function StudentDashboard() {
  const today = format(new Date(), "EEEE");
  const timetable = demoTimetableAll.filter((s) => s.day === today);
  const upcoming = demoEvents.filter((e) => new Date(e.startDate) >= new Date()).slice(0, 5);

  return (
    <StudentDashboardClient
      student={{ ...demoStudent, className: demoStudent.class }}
      timetable={timetable}
      events={upcoming}
      announcements={demoAnnouncements.student}
      assignments={demoAssignments}
    />
  );
}
