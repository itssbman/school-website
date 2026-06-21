import { demoTeacher, demoTeacherGrades } from "@/lib/demo-data";
import GradesClient from "./GradesClient";

export const dynamic = "force-dynamic";

const sheets = Object.entries(demoTeacherGrades).map(([cls, data]) => ({
  class: cls,
  subjects: demoTeacher.subjects,
  students: data.students.map((s, i) => ({
    id: `stu-${cls}-${i}`,
    name: s.name,
    grades: Object.fromEntries(
      demoTeacher.subjects.map((sub, j) => [sub, s.scores[j] ?? 0])
    ),
  })),
}));

export default function TeacherGradesPage() {
  return <GradesClient sheets={sheets} />;
}
