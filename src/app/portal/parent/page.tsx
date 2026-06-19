import { demoParent, demoAnnouncements } from "@/lib/demo-data";
import ParentDashboardClient from "./ParentDashboardClient";

export default function ParentDashboard() {
  return (
    <ParentDashboardClient
      parent={demoParent}
      announcements={demoAnnouncements.parent}
    />
  );
}
