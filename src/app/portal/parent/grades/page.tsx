import { demoParent } from "@/lib/demo-data";
import ParentGradesClient from "./ParentGradesClient";

export const dynamic = "force-dynamic";

export default function ParentGradesPage() {
  return <ParentGradesClient children={demoParent.children} />;
}
