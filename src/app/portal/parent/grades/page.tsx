"use client";

import { useState } from "react";
import { demoParent } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";

const TERMS = ["Term 1 2024/25", "Term 2 2024/25", "Term 1 2025/26"] as const;

function letterGrade(score: number) {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 40) return "D";
  return "F";
}

function gradeVariant(score: number): "success" | "warning" | "danger" | "info" {
  if (score >= 70) return "success";
  if (score >= 50) return "warning";
  return "danger";
}

function remark(score: number) {
  if (score >= 70) return "Excellent";
  if (score >= 60) return "Very Good";
  if (score >= 50) return "Good";
  if (score >= 40) return "Pass";
  return "Fail";
}

export default function ParentGradesPage() {
  const { children } = demoParent;
  const [childIdx, setChildIdx] = useState(0);
  const [term, setTerm] = useState<string>("Term 1 2025/26");

  const child = children[childIdx];
  const grades = child.grades.filter((g) => g.term === term);
  const avg = grades.length
    ? Math.round(grades.reduce((s, g) => s + g.score, 0) / grades.length)
    : null;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Grades</h2>
        <p className="text-[14px] text-[#6B7280]">Academic performance by term</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex border border-[#E5E3DF] overflow-hidden">
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
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="text-[13px] border border-[#E5E3DF] px-3 py-2 text-[#1A2B49] bg-white focus:outline-none focus:border-[#1A2B49]"
        >
          {TERMS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th className="text-center">Score (%)</th>
              <th className="text-center">Grade</th>
              <th>Remark</th>
            </tr>
          </thead>
          <tbody>
            {grades.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-[#6B7280] py-8">No grades for this term.</td>
              </tr>
            ) : (
              grades.map((g) => (
                <tr key={g.id}>
                  <td className="font-medium text-[#1A2B49]">{g.subject}</td>
                  <td className="text-center font-mono text-[14px]">{g.score}</td>
                  <td className="text-center">
                    <Badge variant={gradeVariant(g.score)} size="sm">{letterGrade(g.score)}</Badge>
                  </td>
                  <td className="text-[#6B7280]">{remark(g.score)}</td>
                </tr>
              ))
            )}
          </tbody>
          {avg !== null && (
            <tfoot>
              <tr className="bg-[#F9F8F7] font-medium">
                <td className="text-[#1A2B49]">Class Average</td>
                <td className="text-center font-mono">{avg}</td>
                <td className="text-center">
                  <Badge variant={gradeVariant(avg)} size="sm">{letterGrade(avg)}</Badge>
                </td>
                <td className="text-[#6B7280]">{remark(avg)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
