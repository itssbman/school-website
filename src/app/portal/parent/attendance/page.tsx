"use client";

import { useState } from "react";
import { demoParent } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";

function summary(records: { status: string }[]) {
  const present = records.filter((r) => r.status === "present").length;
  const absent  = records.filter((r) => r.status === "absent").length;
  const late    = records.filter((r) => r.status === "late").length;
  const rate    = records.length ? Math.round((present / records.length) * 100) : 0;
  return { present, absent, late, rate, total: records.length };
}

function statusVariant(s: string): "success" | "danger" | "warning" {
  if (s === "present") return "success";
  if (s === "absent") return "danger";
  return "warning";
}

export default function ParentAttendancePage() {
  const { children } = demoParent;
  const [childIdx, setChildIdx] = useState(0);

  const child = children[childIdx];
  const records = [...child.attendance].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const stats = summary(records);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Attendance</h2>
        <p className="text-[14px] text-[#6B7280]">Attendance records for the current term</p>
      </div>

      {/* Child switcher */}
      <div className="flex border border-[#E5E3DF] w-fit overflow-hidden">
        {children.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setChildIdx(i)}
            className={`px-4 py-2 text-[13px] font-medium transition-colors ${
              childIdx === i ? "bg-[#1A2B49] text-white" : "text-[#6B7280] hover:bg-[#F5F4F2]"
            }`}
          >
            {c.user.name}
          </button>
        ))}
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Present", value: stats.present, color: "text-[#3D5A45]" },
          { label: "Absent",  value: stats.absent,  color: "text-[#C2593F]" },
          { label: "Late",    value: stats.late,    color: "text-[#D97706]" },
          { label: "Rate",    value: `${stats.rate}%`, color: "text-[#1A2B49]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] p-4 text-center">
            <p className={`text-[26px] font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-[12px] text-[#6B7280] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Records table */}
      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td className="font-medium text-[#1A2B49]">{format(new Date(r.date), "d MMM yyyy")}</td>
                <td className="text-[#6B7280]">{format(new Date(r.date), "EEEE")}</td>
                <td>
                  <Badge variant={statusVariant(r.status)} size="sm" className="capitalize">
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
