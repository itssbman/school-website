"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";

interface Grade { id: string; subject: string; score: number; term: string; }

function letter(s: number) { return s >= 70 ? "A" : s >= 60 ? "B" : s >= 50 ? "C" : s >= 40 ? "D" : "F"; }
function variant(s: number): "success" | "warning" | "danger" { return s >= 70 ? "success" : s >= 50 ? "warning" : "danger"; }
function remark(s: number) { return s >= 70 ? "Excellent" : s >= 60 ? "Very Good" : s >= 50 ? "Good" : s >= 40 ? "Pass" : "Fail"; }

export default function StudentGradesClient({ grades }: { grades: Grade[] }) {
  const terms = Array.from(new Set(grades.map((g) => g.term))).sort().reverse();
  const [term, setTerm] = useState(terms[0] ?? "");

  const filtered = grades.filter((g) => g.term === term);
  const avg = filtered.length ? Math.round(filtered.reduce((s, g) => s + g.score, 0) / filtered.length) : null;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">My Grades</h2>
        <p className="text-[14px] text-[#6B7280]">Academic performance by subject</p>
      </div>

      <div className="flex justify-end">
        <select value={term} onChange={(e) => setTerm(e.target.value)}
          className="text-[13px] border border-[#E5E3DF] px-3 py-2 text-[#1A2B49] bg-white focus:outline-none focus:border-[#1A2B49]">
          {terms.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr><th>Subject</th><th className="text-center">Score (%)</th><th className="text-center">Grade</th><th>Remark</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-[#6B7280]">No grades for this term.</td></tr>
            ) : filtered.map((g) => (
              <tr key={g.id}>
                <td className="font-medium text-[#1A2B49]">{g.subject}</td>
                <td className="text-center font-mono text-[14px]">{g.score}</td>
                <td className="text-center"><Badge variant={variant(g.score)} size="sm">{letter(g.score)}</Badge></td>
                <td className="text-[#6B7280]">{remark(g.score)}</td>
              </tr>
            ))}
          </tbody>
          {avg !== null && (
            <tfoot>
              <tr className="bg-[#F9F8F7] font-medium">
                <td className="text-[#1A2B49]">Term Average</td>
                <td className="text-center font-mono">{avg}</td>
                <td className="text-center"><Badge variant={variant(avg)} size="sm">{letter(avg)}</Badge></td>
                <td className="text-[#6B7280]">{remark(avg)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
