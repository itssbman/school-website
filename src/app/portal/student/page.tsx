import { format } from "date-fns";
import {
  demoStudent,
  demoTimetableAll,
  demoEvents,
  demoAnnouncements,
  demoAssignments,
} from "@/lib/demo-data";
import StudentDashboardClient from "./StudentDashboardClient";

export default function StudentDashboard() {
  // Filter timetable for today — still dynamic based on the real current day
  const dayName = format(new Date(), "EEEE");
  const timetable = demoTimetableAll.filter(
    (t) => t.class === demoStudent.class && t.day === dayName
  );

  return (
    <StudentDashboardClient
      student={demoStudent}
      timetable={timetable}
      events={demoEvents}
      announcements={demoAnnouncements.student}
      assignments={demoAssignments}
    />
  );
}
