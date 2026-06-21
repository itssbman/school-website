"use client";

import { useRef, useState } from "react";
import Badge from "@/components/ui/Badge";
import { format, isPast } from "date-fns";
import { CheckCircle, Clock, Upload } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface Assignment { id: string; title: string; description: string; dueDate: string; classId: string; }
interface Submission  { id: string; assignmentId: string; submittedAt: string; fileUrl: string; }

export default function StudentAssignmentsClient({
  studentId,
  assignments,
  submissions: initial,
}: {
  studentId: string;
  assignments: Assignment[];
  submissions: Submission[];
}) {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState(initial);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const submittedMap = Object.fromEntries(submissions.map((s) => [s.assignmentId, s]));

  const handleSubmit = async (assignmentId: string, file: File) => {
    setUploading(assignmentId);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", `submissions/${studentId}/${assignmentId}`);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      const subRes = await fetch("/api/assignments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, fileUrl: url }),
      });
      if (!subRes.ok) throw new Error("Submission failed");

      const newSub = await subRes.json();
      setSubmissions((prev) => [...prev, newSub]);
      toast("Assignment submitted successfully!", "success");
    } catch (err: any) {
      toast(err.message ?? "Submission failed", "error");
    } finally {
      setUploading(null);
      setActiveId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Assignments</h2>
        <p className="text-[14px] text-[#6B7280]">{assignments.length} assignments for your class</p>
      </div>

      <div className="space-y-3">
        {assignments.length === 0 ? (
          <div className="bg-white border border-[#E5E3DF] p-10 text-center text-[#6B7280]">
            No assignments yet.
          </div>
        ) : assignments.map((a) => {
          const sub      = submittedMap[a.id];
          const overdue  = !sub && isPast(new Date(a.dueDate));
          const isLoading = uploading === a.id;

          return (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
              <div className="flex items-start gap-3">
                {sub
                  ? <CheckCircle size={18} className="text-[#3D5A45] mt-0.5 flex-shrink-0" />
                  : <Clock size={18} className={`mt-0.5 flex-shrink-0 ${overdue ? "text-[#C2593F]" : "text-[#D97706]"}`} />
                }
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">{a.description}</p>
                      <p className="text-[12px] text-[#6B7280] mt-1">
                        Due: {format(new Date(a.dueDate), "d MMM yyyy, h:mm a")}
                      </p>
                      {sub && (
                        <p className="text-[12px] text-[#3D5A45] mt-1">
                          Submitted: {format(new Date(sub.submittedAt), "d MMM yyyy, h:mm a")}
                        </p>
                      )}
                    </div>
                    <Badge variant={sub ? "success" : overdue ? "danger" : "warning"} size="sm" className="flex-shrink-0">
                      {sub ? "Submitted" : overdue ? "Overdue" : "Pending"}
                    </Badge>
                  </div>

                  {!sub && !overdue && (
                    <div className="mt-3">
                      {activeId === a.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            ref={fileRef}
                            type="file"
                            className="text-[12px] text-[#6B7280] file:mr-2 file:px-3 file:py-1 file:text-[12px] file:border file:border-[#E5E3DF] file:bg-white file:text-[#1A2B49]"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleSubmit(a.id, f);
                            }}
                          />
                          {isLoading && <span className="text-[12px] text-[#6B7280]">Uploading…</span>}
                        </div>
                      ) : (
                        <button
                          onClick={() => setActiveId(a.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-[#1A2B49] text-white hover:bg-[#0F1E38] transition-colors"
                        >
                          <Upload size={13} />
                          Submit Assignment
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
