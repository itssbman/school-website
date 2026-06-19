"use client";

import { useState } from "react";
import { demoTeacher, demoStudentsByClass } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";

type Status = "present" | "absent" | "late";
const STATUS_LABELS: Status[] = ["present", "absent", "late"];

function statusVariant(s: Status): "success" | "danger" | "warning" {
  if (s === "present") return "success";
  if (s === "absent") return "danger";
  return "warning";
}

export default function TeacherAttendancePage() {
  const classes = demoTeacher.classes;
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const classData = demoStudentsByClass.find((c) => c.class === selectedClass);
  const students = classData?.students ?? [];

  const [records, setRecords] = useState<Record<string, Status>>(() =>
    Object.fromEntries(students.map((s) => [s.id, "present" as Status]))
  );

  const setStatus = (id: string, status: Status) =>
    setRecords((prev) => ({ ...prev, [id]: status }));

  const counts = {
    present: Object.values(records).filter((v) => v === "present").length,
    absent:  Object.values(records).filter((v) => v === "absent").length,
    late:    Object.values(records).filter((v) => v === "late").length,
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Mark Attendance</h2>
        <p className="text-[14px] text-[#6B7280]">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
      </div>

      {/* Class selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[13px] text-[#6B7280]">Class:</span>
        <div className="flex border border-[#E5E3DF] overflow-hidden">
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedClass(c);
                const newStudents = demoStudentsByClass.find((s) => s.class === c)?.students ?? [];
                setRecords(Object.fromEntries(newStudents.map((s) => [s.id, "present" as Status])));
              }}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                selectedClass === c ? "bg-[#1A2B49] text-white" : "text-[#6B7280] hover:bg-[#F5F4F2]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Submit (disabled) */}
        <button
          disabled
          title="Available in full version"
          className="ml-auto px-5 py-2 text-[13px] font-medium bg-[#F9F8F7] border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60"
        >
          Submit Attendance
        </button>
      </div>

      {/* Summary row */}
      <div className="flex gap-3">
        {[
          { label: "Present", value: counts.present, color: "text-[#3D5A45]" },
          { label: "Absent",  value: counts.absent,  color: "text-[#C2593F]" },
          { label: "Late",    value: counts.late,    color: "text-[#D97706]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] px-4 py-3 text-center flex-1">
            <p className={`text-[20px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Student list */}
      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th className="text-center">Status</th>
              <th className="text-center">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const status = records[s.id] ?? "present";
              return (
                <tr key={s.id}>
                  <td className="text-[#6B7280] font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</td>
                  <td className="font-medium text-[#1A2B49]">{s.user.name}</td>
                  <td className="text-center">
                    <Badge variant={statusVariant(status)} size="sm" className="capitalize">{status}</Badge>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-1">
                      {STATUS_LABELS.map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatus(s.id, st)}
                          className={`px-2 py-1 text-[11px] font-medium border transition-colors capitalize ${
                            status === st
                              ? st === "present" ? "bg-[#3D5A45] text-white border-[#3D5A45]"
                              : st === "absent" ? "bg-[#C2593F] text-white border-[#C2593F]"
                              : "bg-[#D97706] text-white border-[#D97706]"
                              : "border-[#E5E3DF] text-[#6B7280] hover:bg-[#F5F4F2]"
                          }`}
                        >
                          {st.slice(0, 1).toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
