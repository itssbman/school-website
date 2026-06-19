"use client";

import { useState } from "react";
import { demoApplications } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";

const STATUS_OPTIONS = ["all", "applied", "shortlisted", "admitted", "rejected"] as const;

function statusVariant(s: string): "info" | "warning" | "success" | "danger" | "outline" {
  if (s === "applied")     return "info";
  if (s === "shortlisted") return "warning";
  if (s === "admitted")    return "success";
  if (s === "rejected")    return "danger";
  return "outline";
}

export default function AdminAdmissionsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all"
    ? demoApplications
    : demoApplications.filter((a) => a.status === filter);

  const counts = {
    applied:     demoApplications.filter((a) => a.status === "applied").length,
    shortlisted: demoApplications.filter((a) => a.status === "shortlisted").length,
    admitted:    demoApplications.filter((a) => a.status === "admitted").length,
    rejected:    demoApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Admissions</h2>
          <p className="text-[14px] text-[#6B7280]">{demoApplications.length} applications for 2025/26 session</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
        >
          Export CSV
        </button>
      </div>

      {/* Summary cards */}
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

      {/* Filter tabs */}
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
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Applied</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td className="font-medium text-[#1A2B49]">{a.firstName} {a.lastName}</td>
                <td className="text-[#6B7280] text-[13px]">{a.email}</td>
                <td className="text-[#6B7280] text-[13px]">{a.phone}</td>
                <td className="text-[#6B7280]">{a.class}</td>
                <td className="text-[#6B7280] text-[13px]">{format(new Date(a.appliedAt), "d MMM yyyy")}</td>
                <td>
                  <Badge variant={statusVariant(a.status)} size="sm" className="capitalize">{a.status}</Badge>
                </td>
                <td className="text-center">
                  <button
                    disabled
                    title="Available in full version"
                    className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
