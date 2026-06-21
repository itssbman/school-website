import { demoParent } from "@/lib/demo-data";
import ParentAttendanceClient from "./ParentAttendanceClient";

export const dynamic = "force-dynamic";

export default function ParentAttendancePage() {
  return <ParentAttendanceClient children={demoParent.children} />;
}
