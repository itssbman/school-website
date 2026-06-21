import { demoStudent, demoAssignments } from "@/lib/demo-data";
import StudentAssignmentsClient from "./StudentAssignmentsClient";

export const dynamic = "force-dynamic";

const assignments = demoAssignments.map((a) => ({ ...a, description: "" }));
const submissions = demoStudent.submissions.map((s) => ({ ...s, fileUrl: "#", studentId: demoStudent.id }));

export default function StudentAssignmentsPage() {
  return (
    <StudentAssignmentsClient
      studentId={demoStudent.id}
      assignments={assignments as any}
      submissions={submissions as any}
    />
  );
}
