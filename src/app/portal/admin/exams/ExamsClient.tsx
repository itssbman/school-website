"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { format, parseISO } from "date-fns";
import { Plus, X } from "lucide-react";

interface Exam {
  id: string;
  subject: string;
  class: string;
  date: string;
  startTime: string;
  duration: string;
  venue: string;
  term: string;
}

interface Props {
  initialExams: Exam[];
}

export default function ExamsClient({ initialExams }: Props) {
  const { toast } = useToast();
  const [exams, setExams] = useState(initialExams);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    subject: "", class: "JSS1A", date: "", startTime: "09:00",
    duration: "2 hours", venue: "Exam Hall A", term: "Term 1 2025/26",
  });

  const classes = Array.from(new Set(exams.map((e) => e.class))).sort();

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const newExam = await res.json();
      setExams((prev) => [...prev, newExam]);
      setShowModal(false);
      setForm({ subject: "", class: "JSS1A", date: "", startTime: "09:00", duration: "2 hours", venue: "Exam Hall A", term: "Term 1 2025/26" });
      toast("Exam entry added.", "success");
    } catch {
      toast("Failed to add exam entry.", "error");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this exam entry?")) return;
    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast("Exam entry removed.", "success");
    } catch {
      toast("Failed to remove exam entry.", "error");
    }
  }

  const groupedClasses = [...new Set(exams.map((e) => e.class))].sort();

  const CLASSES = ["JSS1A","JSS1B","JSS2A","JSS2B","JSS3A","JSS3B","SS1A","SS1B","SS2A","SS2B","SS3A","SS3B"];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Exam Schedule</h2>
          <p className="text-[14px] text-[#6B7280]">End-of-term examinations · {exams.length} entries</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors flex-shrink-0"
        >
          <Plus size={14} />
          Add Entry
        </button>
      </div>

      {exams.length === 0 ? (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <p className="text-[14px] text-[#6B7280]">No exam entries yet. Add some to get started.</p>
        </div>
      ) : (
        groupedClasses.map((cls) => {
          const entries = exams.filter((e) => e.class === cls);
          return (
            <div key={cls} className="bg-white border border-[#E5E3DF]">
              <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7] flex items-center justify-between">
                <p className="text-[13px] font-bold text-[#1A2B49]">Class {cls}</p>
                <span className="text-[12px] text-[#6B7280]">{entries.length} exam{entries.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                      <th>Venue</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.id}>
                        <td className="font-medium text-[#1A2B49]">{e.subject}</td>
                        <td className="text-[#6B7280]">{format(parseISO(e.date), "d MMM yyyy (EEE)")}</td>
                        <td className="text-[#6B7280]">{e.startTime}</td>
                        <td><Badge variant="outline" size="sm">{e.duration}</Badge></td>
                        <td className="text-[#6B7280]">{e.venue}</td>
                        <td className="text-center">
                          <button
                            onClick={() => handleDelete(e.id)}
                            className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#C2593F] hover:border-[#C2593F] bg-[#F9F8F7] transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white border border-[#E5E3DF] w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
              <p className="font-heading text-[16px] font-bold text-[#1A2B49]">Add Exam Entry</p>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-[#1A2B49]"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Subject *</label>
                  <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                    placeholder="Mathematics" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Class *</label>
                  <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
                    {CLASSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Date *</label>
                  <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Start Time</label>
                  <input type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                    placeholder="2 hours" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Venue</label>
                  <input value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                    placeholder="Exam Hall A" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Term</label>
                <select value={form.term} onChange={(e) => setForm({ ...form, term: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
                  <option>Term 1 2025/26</option>
                  <option>Term 2 2025/26</option>
                  <option>Term 3 2025/26</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[13px] border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50">
                  {creating ? "Adding…" : "Add Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
