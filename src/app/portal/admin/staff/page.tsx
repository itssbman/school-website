import { demoStaff } from "@/lib/demo-data";
import StaffClient from "./StaffClient";

export const dynamic = "force-dynamic";

const initialStaff = demoStaff
  .filter((s) => s.role === "teacher")
  .map((s) => ({
    id: s.id,
    subjects: s.subjects,
    classes: [] as string[],
    user: { id: s.id, name: s.name, email: s.email, role: s.role, active: s.active },
  }));

export default function AdminStaffPage() {
  return <StaffClient initialStaff={initialStaff} />;
}
