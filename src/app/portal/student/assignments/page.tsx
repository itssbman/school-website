import { demoStudent, demoAssignments } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format, isPast } from "date-fns";
import { CheckCircle, Clock, Upload } from "lucide-react";

export default function StudentAssignmentsPage() {
  const submittedIds = new Set(demoStudent.submissions.map((s) => s.assignmentId));

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Assignments</h2>
        <p className="text-[14px] text-[#6B7280]">Submit and track your assignments</p>
      </div>

      <div className="space-y-4">
        {demoAssignments.map((a) => {
          const submitted = submittedIds.has(a.id);
          const submission = demoStudent.submissions.find((s) => s.assignmentId === a.id);
          const overdue = !submitted && isPast(new Date(a.dueDate));

          return (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {submitted ? (
                    <CheckCircle size={18} className="text-[#3D5A45] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Clock size={18} className={`mt-0.5 flex-shrink-0 ${overdue ? "text-[#C2593F]" : "text-[#D97706]"}`} />
                  )}
                  <div>
                    <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                    <p className="text-[12px] text-[#6B7280] mt-1">
                      Class: {a.classId} · Due: {format(new Date(a.dueDate), "d MMM yyyy, h:mm a")}
                    </p>
                    {submission && (
                      <p className="text-[12px] text-[#3D5A45] mt-1 font-medium">
                        ✓ Submitted {format(new Date(submission.submittedAt), "d MMM yyyy")}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  variant={submitted ? "success" : overdue ? "danger" : "warning"}
                  size="sm"
                  className="flex-shrink-0"
                >
                  {submitted ? "Submitted" : overdue ? "Overdue" : "Pending"}
                </Badge>
              </div>

              {!submitted && (
                <div className="mt-4 border-2 border-dashed border-[#E5E3DF] p-6 text-center">
                  <Upload size={20} className="text-[#9CA3AF] mx-auto mb-2" />
                  <p className="text-[12px] text-[#9CA3AF]">File upload available in the full version</p>
                  <button
                    disabled
                    title="Available in full version"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                  >
                    <Upload size={13} />
                    Upload Submission
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
