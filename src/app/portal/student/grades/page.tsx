import { demoStudent } from "@/lib/demo-data";
import StudentGradesClient from "./StudentGradesClient";

export const dynamic = "force-dynamic";

export default function StudentGradesPage() {
  return <StudentGradesClient grades={demoStudent.grades} />;
}
