import { demoParent, demoAnnouncements } from "@/lib/demo-data";
import ParentDashboardClient from "./ParentDashboardClient";

export const dynamic = "force-dynamic";

export default function ParentDashboard() {
  return (
    <ParentDashboardClient
      parent={demoParent}
      announcements={demoAnnouncements.parent}
    />
  );
}
