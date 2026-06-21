import { demoAssignments, demoStudent } from "@/lib/demo-data";
import AssignmentSubmitClient from "./AssignmentSubmitClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AssignmentPage({ params }: Props) {
  const { id } = await params;
  const assignment = demoAssignments.find((a) => a.id === id);
  if (!assignment) notFound();

  const demoAssignment = {
    ...assignment,
    description: "Complete the assigned work and submit your answer sheet as a PDF.",
    teacher: { user: { name: "Mr. Alex Demo" } },
    submissions: [],
  };

  return (
    <AssignmentSubmitClient
      assignment={demoAssignment}
      studentId={demoStudent.id}
    />
  );
}
