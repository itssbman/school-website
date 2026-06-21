"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { format } from "date-fns";

type Status = "present" | "absent" | "late";

const STATUS_LABELS: Status[] = ["present", "absent", "late"];

function statusVariant(s: Status): "success" | "danger" | "warning" {
  if (s === "present") return "success";
  if (s === "absent") return "danger";
  return "warning";
}

interface Student {
  id: string;
  user: { name: string };
  class: string;
}

interface Props {
  classes: string[];
  studentsByClass: { class: string; students: Student[] }[];
}

export default function AttendanceClient({ classes, studentsByClass }: Props) {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState(classes[0] ?? "");
  const [submitting, setSubmitting] = useState(false);

  const students = studentsByClass.find((c) => c.class === selectedClass)?.students ?? [];

  const [records, setRecords] = useState<Record<string, Status>>(() =>
    Object.fromEntries(students.map((s) => [s.id, "present" as Status]))
  );

  function switchClass(cls: string) {
    setSelectedClass(cls);
    const newStudents = studentsByClass.find((c) => c.class === cls)?.students ?? [];
    setRecords(Object.fromEntries(newStudents.map((s) => [s.id, "present" as Status])));
  }

  const counts = {
    present: Object.values(records).filter((v) => v === "present").length,
    absent: Object.values(records).filter((v) => v === "absent").length,
    late: Object.values(records).filter((v) => v === "late").length,
  };

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          records: Object.entries(records).map(([studentId, status]) => ({ studentId, status })),
        }),
      });
      if (!res.ok) throw new Error();
      toast(`Attendance submitted for Class ${selectedClass}`, "success");
    } catch {
      toast("Failed to submit attendance. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Mark Attendance</h2>
        <p className="text-[14px] text-[#6B7280]">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-[13px] text-[#6B7280]">Class:</span>
        <div className="flex border border-[#E5E3DF] overflow-hidden">
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => switchClass(c)}
              className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                selectedClass === c ? "bg-[#1A2B49] text-white" : "text-[#6B7280] hover:bg-[#F5F4F2]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting || students.length === 0}
          className="ml-auto px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit Attendance"}
        </button>
      </div>

      <div className="flex gap-3">
        {[
          { label: "Present", value: counts.present, color: "text-[#3D5A45]" },
          { label: "Absent", value: counts.absent, color: "text-[#C2593F]" },
          { label: "Late", value: counts.late, color: "text-[#D97706]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E3DF] px-4 py-3 text-center flex-1">
            <p className={`text-[20px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-[#6B7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {students.length === 0 ? (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <p className="text-[14px] text-[#6B7280]">No students in Class {selectedClass}.</p>
        </div>
      ) : (
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
                            onClick={() => setRecords((prev) => ({ ...prev, [s.id]: st }))}
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
      )}
    </div>
  );
}
