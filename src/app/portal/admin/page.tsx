import {
  demoAdminStats,
  demoAttendanceTrend,
  demoTermFees,
  demoApplications,
  demoRecentUsers,
} from "@/lib/demo-data";
import AdminDashboardClient from "./AdminDashboardClient";

export default function AdminDashboard() {
  return (
    <AdminDashboardClient
      stats={demoAdminStats}
      attendanceTrend={demoAttendanceTrend}
      termFees={demoTermFees}
      applications={demoApplications}
      recentUsers={demoRecentUsers}
    />
  );
}
