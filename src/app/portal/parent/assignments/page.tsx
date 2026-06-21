import { demoParent, demoAssignments } from "@/lib/demo-data";
import ParentAssignmentsClient from "./ParentAssignmentsClient";

export const dynamic = "force-dynamic";

const assignments = demoAssignments.map((a) => ({ ...a, description: "" }));

export default function ParentAssignmentsPage() {
  return (
    <ParentAssignmentsClient
      children={demoParent.children as any}
      assignments={assignments as any}
    />
  );
}
