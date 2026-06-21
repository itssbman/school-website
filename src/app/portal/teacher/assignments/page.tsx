import { demoTeacher, demoAssignments } from "@/lib/demo-data";
import AssignmentsClient from "./AssignmentsClient";

export const dynamic = "force-dynamic";

const assignments = demoAssignments.map((a) => ({
  ...a,
  description: "",
  createdAt: a.dueDate,
  subject: demoTeacher.subjects[0],
}));

export default function TeacherAssignmentsPage() {
  return (
    <AssignmentsClient
      initialAssignments={assignments as any}
      classes={demoTeacher.classes}
    />
  );
}
