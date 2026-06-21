"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";

interface AttRec { id: string; date: string; status: string; }
interface Child  { id: string; user: { name: string }; attendance: AttRec[]; }

function stats(records: AttRec[]) {
  const present = records.filter((r) => r.status === "present").length;
  const absent  = records.filter((r) => r.status === "absent").length;
  const late    = records.filter((r) => r.status === "late").length;
  const rate    = records.length ? Math.round((present / records.length) * 100) : 0;
  return { present, absent, late, rate };
}

function sv(s: string): "success" | "danger" | "warning" {
  return s === "present" ? "success" : s === "absent" ? "danger" : "warning";
}

export default function ParentAttendanceClient({ children }: { children: Child[] }) {
  const [childIdx, setChildIdx] = useState(0);
  const child = children[childIdx];
  const sorted = [...child.attendance].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const s = stats(sorted);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Attendance</h2>
        <p className="text-[14px] text-[#6B7280]">Attendance records — last 60 school days</p>
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

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Present", value: s.present, color: "text-[#3D5A45]" },
          { label: "Absent",  value: s.absent,  color: "text-[#C2593F]" },
          { label: "Late",    value: s.late,    color: "text-[#D97706]" },
          { label: "Rate",    value: `${s.rate}%`, color: "text-[#1A2B49]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E5E3DF] p-4 text-center">
            <p className={`text-[26px] font-bold font-heading ${stat.color}`}>{stat.value}</p>
            <p className="text-[12px] text-[#6B7280] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr><th>Date</th><th>Day</th><th>Status</th></tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-8 text-[#6B7280]">No attendance records found.</td></tr>
            ) : sorted.map((r) => (
              <tr key={r.id}>
                <td className="font-medium text-[#1A2B49]">{format(new Date(r.date), "d MMM yyyy")}</td>
                <td className="text-[#6B7280]">{format(new Date(r.date), "EEEE")}</td>
                <td><Badge variant={sv(r.status)} size="sm" className="capitalize">{r.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
