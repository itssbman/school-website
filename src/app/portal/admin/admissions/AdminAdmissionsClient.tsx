"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { format } from "date-fns";

const STATUS_OPTIONS = ["all", "applied", "shortlisted", "admitted", "rejected"] as const;
type StatusOption = typeof STATUS_OPTIONS[number];

function statusVariant(s: string): "info" | "warning" | "success" | "danger" | "outline" {
  if (s === "applied") return "info";
  if (s === "shortlisted") return "warning";
  if (s === "admitted") return "success";
  if (s === "rejected") return "danger";
  return "outline";
}

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  class: string;
  appliedAt: string;
  status: string;
  parentName?: string;
  parentPhone?: string;
}

interface Props {
  initialApplications: Application[];
}

export default function AdminAdmissionsClient({ initialApplications }: Props) {
  const { toast } = useToast();
  const [applications, setApplications] = useState(initialApplications);
  const [filter, setFilter] = useState<StatusOption>("all");

  const filtered = filter === "all" ? applications : applications.filter((a) => a.status === filter);
  const counts = {
    applied:     applications.filter((a) => a.status === "applied").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    admitted:    applications.filter((a) => a.status === "admitted").length,
    rejected:    applications.filter((a) => a.status === "rejected").length,
  };

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
      toast(`Application status updated to ${status}.`, "success");
    } catch {
      toast("Failed to update status. Please try again.", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Admissions</h2>
          <p className="text-[14px] text-[#6B7280]">{applications.length} applications for 2025/26 session</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Applied",     value: counts.applied,     color: "text-[#4F46E5]" },
          { label: "Shortlisted", value: counts.shortlisted, color: "text-[#D97706]" },
          { label: "Admitted",    value: counts.admitted,    color: "text-[#3D5A45]" },
          { label: "Rejected",    value: counts.rejected,    color: "text-[#C2593F]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] p-4 text-center">
            <p className={`text-[26px] font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-3 py-1.5 text-[12px] font-medium border capitalize transition-colors ${
              filter === opt
                ? "bg-[#1A2B49] text-white border-[#1A2B49]"
                : "border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49]"
            }`}
          >
            {opt} {opt !== "all" && `(${counts[opt as keyof typeof counts] ?? 0})`}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Parent</th>
              <th>Class</th>
              <th>Applied</th>
              <th>Status</th>
              <th className="text-center">Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#6B7280]">No applications match this filter.</td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    <p className="font-medium text-[#1A2B49]">{a.firstName} {a.lastName}</p>
                    <p className="text-[11px] text-[#6B7280] font-mono">{a.email}</p>
                  </td>
                  <td>
                    <p className="text-[13px] text-[#6B7280]">{a.parentName ?? "—"}</p>
                    <p className="text-[11px] text-[#9CA3AF]">{a.parentPhone ?? ""}</p>
                  </td>
                  <td className="text-[#6B7280]">{a.class}</td>
                  <td className="text-[#6B7280] text-[13px]">{format(new Date(a.appliedAt), "d MMM yyyy")}</td>
                  <td>
                    <Badge variant={statusVariant(a.status)} size="sm" className="capitalize">{a.status}</Badge>
                  </td>
                  <td className="text-center">
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      className="text-[12px] border border-[#E5E3DF] px-1.5 py-1 text-[#1A2B49] focus:outline-none"
                    >
                      <option value="applied">Applied</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="admitted">Admitted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
