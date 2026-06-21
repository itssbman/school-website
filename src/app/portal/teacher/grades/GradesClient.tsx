"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/Toast";

function scoreColor(score: number) {
  if (score >= 70) return "text-[#3D5A45]";
  if (score >= 50) return "text-[#D97706]";
  return "text-[#C2593F]";
}

interface Student {
  id: string;
  name: string;
  grades: Record<string, number | null>;
}

interface ClassSheet {
  class: string;
  subjects: string[];
  students: Student[];
}

interface Props {
  sheets: ClassSheet[];
}

export default function GradesClient({ sheets }: Props) {
  const { toast } = useToast();
  const [edits, setEdits] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState(false);
  const [term, setTerm] = useState("Term 1 2025/26");

  function getEditValue(studentId: string, subject: string, fallback: number | null) {
    return edits[studentId]?.[subject] ?? (fallback !== null ? String(fallback) : "");
  }

  function setEdit(studentId: string, subject: string, value: string) {
    setEdits((prev) => ({
      ...prev,
      [studentId]: { ...(prev[studentId] ?? {}), [subject]: value },
    }));
  }

  async function saveAll() {
    setSaving(true);
    try {
      const rows: { studentId: string; subject: string; score: number }[] = [];
      for (const [studentId, subjects] of Object.entries(edits)) {
        for (const [subject, raw] of Object.entries(subjects)) {
          const score = parseFloat(raw);
          if (!isNaN(score) && score >= 0 && score <= 100) {
            rows.push({ studentId, subject, score });
          }
        }
      }
      if (rows.length === 0) {
        toast("No valid scores to save.", "info");
        setSaving(false);
        return;
      }
      await Promise.all(
        rows.map((r) =>
          fetch("/api/grades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...r, term }),
          })
        )
      );
      setEdits({});
      toast(`${rows.length} grade${rows.length !== 1 ? "s" : ""} saved.`, "success");
    } catch {
      toast("Failed to save grades. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Grade Entry</h2>
          <p className="text-[14px] text-[#6B7280]">Click a score cell to edit — save all changes at once</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="text-[13px] border border-[#E5E3DF] px-3 py-2 text-[#1A2B49] focus:outline-none focus:border-[#1A2B49]"
          >
            <option>Term 1 2025/26</option>
            <option>Term 2 2025/26</option>
            <option>Term 3 2025/26</option>
          </select>
          <button
            onClick={saveAll}
            disabled={saving || Object.keys(edits).length === 0}
            className="px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Grades"}
          </button>
        </div>
      </div>

      {sheets.map(({ class: className, subjects, students }) => (
        <div key={className} className="bg-white border border-[#E5E3DF]">
          <div className="px-5 py-4 border-b border-[#E5E3DF]">
            <p className="font-heading text-[15px] font-bold text-[#1A2B49]">Class {className}</p>
            <p className="text-[12px] text-[#6B7280]">{students.length} students · {subjects.join(", ")}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student</th>
                  {subjects.map((sub) => <th key={sub} className="text-center">{sub}</th>)}
                  <th className="text-center">Average</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const scores = subjects.map((sub) => {
                    const editVal = edits[s.id]?.[sub];
                    if (editVal !== undefined) return parseFloat(editVal) || 0;
                    return s.grades[sub] ?? null;
                  });
                  const validScores = scores.filter((v): v is number => v !== null);
                  const avg = validScores.length > 0
                    ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length)
                    : null;

                  return (
                    <tr key={s.id}>
                      <td className="text-[#6B7280] font-mono text-[13px]">{String(i + 1).padStart(2, "0")}</td>
                      <td className="font-medium text-[#1A2B49]">{s.name}</td>
                      {subjects.map((sub) => {
                        const rawScore = s.grades[sub] ?? null;
                        const val = getEditValue(s.id, sub, rawScore);
                        const numVal = parseFloat(val);
                        return (
                          <td key={sub} className="text-center p-1">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={val}
                              onChange={(e) => setEdit(s.id, sub, e.target.value)}
                              placeholder="—"
                              className={`w-14 text-center font-mono text-[13px] border border-transparent hover:border-[#E5E3DF] focus:border-[#1A2B49] focus:outline-none px-1 py-0.5 ${
                                val && !isNaN(numVal) ? scoreColor(numVal) : "text-[#9CA3AF]"
                              }`}
                            />
                          </td>
                        );
                      })}
                      <td className={`text-center font-mono text-[13px] font-semibold ${avg !== null ? scoreColor(avg) : "text-[#9CA3AF]"}`}>
                        {avg !== null ? avg : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
