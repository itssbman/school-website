"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { format, isPast } from "date-fns";
import { CheckCircle, Clock } from "lucide-react";

interface Assignment { id: string; title: string; description: string; dueDate: string; classId: string; }
interface Submission  { id: string; assignmentId: string; submittedAt: string; }
interface Child { id: string; class: string; user: { name: string }; submissions: (Submission & { assignment: Assignment })[]; }

export default function ParentAssignmentsClient({
  children,
  assignments,
}: {
  children: Child[];
  assignments: Assignment[];
}) {
  const [childIdx, setChildIdx] = useState(0);
  const child = children[childIdx];
  const submittedIds = new Set(child.submissions.map((s) => s.assignmentId));
  const classAssignments = assignments.filter((a) => a.classId === child.class);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Assignments</h2>
        <p className="text-[14px] text-[#6B7280]">Track your child&apos;s assignment submissions</p>
      </div>

      {children.length > 1 && (
        <div className="flex border border-[#E5E3DF] w-fit overflow-hidden">
          {children.map((c, i) => (
            <button key={c.id} onClick={() => setChildIdx(i)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                childIdx === i ? "bg-[#1A2B49] text-white" : "text-[#6B7280] hover:bg-[#F5F4F2]"
              }`}>
              {c.user.name}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-3">
        {classAssignments.length === 0 ? (
          <div className="bg-white border border-[#E5E3DF] p-10 text-center text-[#6B7280]">
            No assignments found for {child.user.name}&apos;s class.
          </div>
        ) : classAssignments.map((a) => {
          const submitted = submittedIds.has(a.id);
          const submission = child.submissions.find((s) => s.assignmentId === a.id);
          const overdue = !submitted && isPast(new Date(a.dueDate));

          return (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {submitted
                    ? <CheckCircle size={18} className="text-[#3D5A45] mt-0.5 flex-shrink-0" />
                    : <Clock size={18} className={`mt-0.5 flex-shrink-0 ${overdue ? "text-[#C2593F]" : "text-[#D97706]"}`} />
                  }
                  <div>
                    <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                    <p className="text-[12px] text-[#6B7280] mt-1">Due: {format(new Date(a.dueDate), "d MMM yyyy, h:mm a")}</p>
                    {submission && (
                      <p className="text-[12px] text-[#3D5A45] mt-1">
                        Submitted: {format(new Date(submission.submittedAt), "d MMM yyyy, h:mm a")}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant={submitted ? "success" : overdue ? "danger" : "warning"} size="sm" className="flex-shrink-0">
                  {submitted ? "Submitted" : overdue ? "Overdue" : "Pending"}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
