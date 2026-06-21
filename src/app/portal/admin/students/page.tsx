import { demoAdminStudents } from "@/lib/demo-data";
import StudentsClient from "./StudentsClient";

export const dynamic = "force-dynamic";

const initialStudents = demoAdminStudents.map((s) => ({
  id: s.id,
  class: s.class,
  admissionNumber: s.admissionNumber,
  user: { id: s.id, name: s.name, email: `${s.id}@demo.schoolkit.ng` },
  feeRecords: [{ status: s.feeStatus }],
}));

export default function AdminStudentsPage() {
  return <StudentsClient initialStudents={initialStudents} />;
}
