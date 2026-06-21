"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { format, isPast } from "date-fns";
import { ChevronDown, ChevronRight, Plus, Users, X } from "lucide-react";

interface Submission {
  id: string;
  studentId: string;
  submittedAt: string;
  fileUrl?: string;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  dueDate: string;
  createdAt: string;
  submissions: Submission[];
}

interface Props {
  initialAssignments: Assignment[];
  classes: string[];
}

export default function AssignmentsClient({ initialAssignments, classes }: Props) {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState(initialAssignments);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    classId: classes[0] ?? "",
    dueDate: "",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.dueDate || !form.classId) return;
    setCreating(true);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const newAssignment = await res.json();
      setAssignments((prev) => [{ ...newAssignment, submissions: [] }, ...prev]);
      setShowModal(false);
      setForm({ title: "", description: "", classId: classes[0] ?? "", dueDate: "" });
      toast("Assignment created successfully.", "success");
    } catch {
      toast("Failed to create assignment. Please try again.", "error");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Assignments</h2>
          <p className="text-[14px] text-[#6B7280]">Manage and review student submissions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors"
        >
          <Plus size={14} />
          New Assignment
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <p className="text-[14px] text-[#6B7280]">No assignments yet. Create one to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => {
            const isExpanded = expanded === a.id;
            const overdue = isPast(new Date(a.dueDate));
            return (
              <div key={a.id} className="bg-white border border-[#E5E3DF]">
                <button
                  className="w-full px-5 py-4 text-left flex items-center gap-3 hover:bg-[#F9F8F7] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : a.id)}
                >
                  {isExpanded
                    ? <ChevronDown size={16} className="text-[#6B7280] flex-shrink-0" />
                    : <ChevronRight size={16} className="text-[#6B7280] flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                    <p className="text-[12px] text-[#6B7280] mt-0.5">
                      Class {a.classId} · Due {format(new Date(a.dueDate), "d MMM yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                      <Users size={13} />
                      {a.submissions.length} submitted
                    </div>
                    <Badge variant={overdue ? "danger" : "info"} size="sm">
                      {overdue ? "Closed" : "Open"}
                    </Badge>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 border-t border-[#E5E3DF] pt-4">
                    {a.description && (
                      <p className="text-[13px] text-[#6B7280] mb-3">{a.description}</p>
                    )}
                    <p className="text-[12px] text-[#9CA3AF] mb-3">
                      {a.submissions.length} submission{a.submissions.length !== 1 ? "s" : ""} received
                    </p>
                    <div className="space-y-2">
                      {a.submissions.map((sub, i) => (
                        <div key={sub.id} className="flex items-center justify-between px-3 py-2 bg-[#F9F8F7] border border-[#E5E3DF]">
                          <p className="text-[13px] text-[#1A2B49]">
                            Submission #{i + 1} · {format(new Date(sub.submittedAt), "d MMM yyyy, h:mm a")}
                          </p>
                          {sub.fileUrl && (
                            <a
                              href={sub.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#1A2B49] hover:border-[#1A2B49] bg-white transition-colors"
                            >
                              View File
                            </a>
                          )}
                        </div>
                      ))}
                      {a.submissions.length === 0 && (
                        <p className="text-[13px] text-[#9CA3AF] text-center py-4">No submissions yet.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white border border-[#E5E3DF] w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
              <p className="font-heading text-[16px] font-bold text-[#1A2B49]">New Assignment</p>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-[#1A2B49]">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="Assignment title"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49] resize-none"
                  placeholder="Instructions for students…"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Class *</label>
                  <select
                    required
                    value={form.classId}
                    onChange={(e) => setForm({ ...form, classId: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  >
                    {classes.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Due Date *</label>
                  <input
                    required
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[13px] border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50"
                >
                  {creating ? "Creating…" : "Create Assignment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
