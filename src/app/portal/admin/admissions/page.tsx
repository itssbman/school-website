import { demoApplications } from "@/lib/demo-data";
import AdminAdmissionsClient from "./AdminAdmissionsClient";

export const dynamic = "force-dynamic";

export default function AdminAdmissionsPage() {
  return <AdminAdmissionsClient initialApplications={demoApplications} />;
}
