"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { useToast } from "@/components/ui/Toast";
import { Plus, X } from "lucide-react";

interface Staff {
  id: string;
  subjects: string[];
  classes: string[];
  user: { id: string; name: string; email: string; role: string; active: boolean };
}

interface Props {
  initialStaff: Staff[];
}

export default function StaffClient({ initialStaff }: Props) {
  const { toast } = useToast();
  const [staff, setStaff] = useState(initialStaff);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "Teacher1234!", subjects: "", classes: "",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subjects: form.subjects.split(",").map((s) => s.trim()).filter(Boolean),
          classes: form.classes.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed");
      }
      const newStaff = await res.json();
      setStaff((prev) => [newStaff, ...prev]);
      setShowModal(false);
      setForm({ name: "", email: "", password: "Teacher1234!", subjects: "", classes: "" });
      toast("Staff member added successfully.", "success");
    } catch (err: any) {
      toast(err.message || "Failed to add staff.", "error");
    } finally {
      setCreating(false);
    }
  }

  async function handleToggle(id: string, currentActive: boolean, name: string) {
    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentActive }),
      });
      if (!res.ok) throw new Error();
      setStaff((prev) =>
        prev.map((s) => s.id === id ? { ...s, user: { ...s.user, active: !currentActive } } : s)
      );
      toast(`${name} ${!currentActive ? "activated" : "deactivated"}.`, "success");
    } catch {
      toast("Failed to update staff status.", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Staff</h2>
          <p className="text-[14px] text-[#6B7280]">
            {staff.length} staff · {staff.filter((s) => s.user.active).length} active
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors"
        >
          <Plus size={14} />
          Add Staff
        </button>
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subjects</th>
              <th>Classes</th>
              <th>Email</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6B7280]">No staff members yet.</td>
              </tr>
            ) : (
              staff.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.user.name} size="sm" />
                      <span className="font-medium text-[#1A2B49]">{s.user.name}</span>
                    </div>
                  </td>
                  <td className="text-[#6B7280] text-[13px]">
                    {s.subjects.length > 0 ? s.subjects.join(", ") : <span className="text-[#9CA3AF]">—</span>}
                  </td>
                  <td className="text-[#6B7280] text-[13px]">
                    {s.classes.length > 0 ? s.classes.join(", ") : <span className="text-[#9CA3AF]">—</span>}
                  </td>
                  <td className="font-mono text-[12px] text-[#6B7280]">{s.user.email}</td>
                  <td className="text-center">
                    <Badge variant={s.user.active ? "success" : "danger"} size="sm">
                      {s.user.active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleToggle(s.id, s.user.active, s.user.name)}
                      className={`text-[12px] border border-[#E5E3DF] px-3 py-1 bg-[#F9F8F7] transition-colors ${
                        s.user.active
                          ? "text-[#C2593F] hover:border-[#C2593F]"
                          : "text-[#3D5A45] hover:border-[#3D5A45]"
                      }`}
                    >
                      {s.user.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white border border-[#E5E3DF] w-full max-w-md">
            <div className="px-6 py-4 border-b border-[#E5E3DF] flex items-center justify-between">
              <p className="font-heading text-[16px] font-bold text-[#1A2B49]">Add Staff</p>
              <button onClick={() => setShowModal(false)} className="text-[#6B7280] hover:text-[#1A2B49]"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreate} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="Mr. Babatunde Adeyemi" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="teacher@school.ng" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Subjects (comma-separated)</label>
                <input value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="Mathematics, Physics" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Classes (comma-separated)</label>
                <input value={form.classes} onChange={(e) => setForm({ ...form, classes: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                  placeholder="JSS1A, SS1A" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-[13px] border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={creating}
                  className="px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50">
                  {creating ? "Adding…" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
