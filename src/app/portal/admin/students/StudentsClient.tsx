"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { Plus, Search, X } from "lucide-react";

function feeVariant(s: string): "success" | "warning" | "danger" {
  if (s === "paid") return "success";
  if (s === "overdue") return "danger";
  return "warning";
}

interface Student {
  id: string;
  admissionNumber: string;
  class: string;
  user: { id: string; name: string; email: string };
  feeRecords: { status: string }[];
  _attendancePct?: number;
}

interface Props {
  initialStudents: Student[];
}

export default function StudentsClient({ initialStudents }: Props) {
  const { toast } = useToast();
  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "Student1234!", admissionNumber: "", class: "JSS1A",
  });

  const filtered = query.trim()
    ? students.filter((s) =>
        s.user.name.toLowerCase().includes(query.toLowerCase()) ||
        s.admissionNumber.toLowerCase().includes(query.toLowerCase()) ||
        s.class.toLowerCase().includes(query.toLowerCase())
      )
    : students;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      const newStudent = await res.json();
      setStudents((prev) => [newStudent, ...prev]);
      setShowModal(false);
      setForm({ name: "", email: "", password: "Student1234!", admissionNumber: "", class: "JSS1A" });
      toast("Student created successfully.", "success");
    } catch (err: any) {
      toast(err.message || "Failed to create student.", "error");
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Remove ${name} from the system? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setStudents((prev) => prev.filter((s) => s.id !== id));
      toast(`${name} removed.`, "success");
    } catch {
      toast("Failed to remove student.", "error");
    }
  }

  const CLASSES = ["JSS1A","JSS1B","JSS2A","JSS2B","JSS3A","JSS3B","SS1A","SS1B","SS2A","SS2B","SS3A","SS3B"];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Students</h2>
          <p className="text-[14px] text-[#6B7280]">{students.length} total students</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors flex-shrink-0"
        >
          <Plus size={14} />
          Add Student
        </button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, admission number, or class…"
          className="w-full pl-9 pr-4 py-2.5 text-[13px] border border-[#E5E3DF] bg-white text-[#1A2B49] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A2B49]"
        />
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Admission No.</th>
              <th>Class</th>
              <th>Email</th>
              <th>Fee Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6B7280]">
                  {query ? "No students match your search." : "No students yet."}
                </td>
              </tr>
            ) : (
              filtered.map((s) => {
                const feeStatus = s.feeRecords[0]?.status ?? "pending";
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={s.user.name} size="sm" />
                        <span className="font-medium text-[#1A2B49]">{s.user.name}</span>
                      </div>
                    </td>
                    <td className="font-mono text-[13px] text-[#6B7280]">{s.admissionNumber}</td>
                    <td className="text-[#6B7280]">{s.class}</td>
                    <td className="text-[#6B7280] text-[13px] font-mono">{s.user.email}</td>
                    <td>
                      <Badge variant={feeVariant(feeStatus)} size="sm" className="capitalize">{feeStatus}</Badge>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDelete(s.id, s.user.name)}
                        className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#C2593F] hover:border-[#C2593F] bg-[#F9F8F7] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white border border-[#E5E3DF] w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
              <p className="font-heading text-[16px] font-bold text-[#1A2B49]">Add Student</p>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-[#1A2B49]"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="Chukwuemeka Okonkwo" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="student@example.com" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Admission No. *</label>
                  <input required value={form.admissionNumber} onChange={(e) => setForm({ ...form, admissionNumber: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                    placeholder="SCH/2025/001" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Class *</label>
                  <select required value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
                    {CLASSES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Temporary Password</label>
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="Student1234!" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[13px] border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50">
                  {creating ? "Creating…" : "Add Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
