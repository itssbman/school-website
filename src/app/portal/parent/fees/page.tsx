import { demoParent } from "@/lib/demo-data";
import ParentFeesClient from "./ParentFeesClient";

export const dynamic = "force-dynamic";

export default function ParentFeesPage() {
  return (
    <ParentFeesClient
      children={demoParent.children}
      userEmail="parent@demo.schoolkit.ng"
    />
  );
}
