import { demoTeacher, demoStudentsByClass } from "@/lib/demo-data";
import AttendanceClient from "./AttendanceClient";

export const dynamic = "force-dynamic";

export default function TeacherAttendancePage() {
  return (
    <AttendanceClient
      classes={demoTeacher.classes}
      studentsByClass={demoStudentsByClass}
    />
  );
}
