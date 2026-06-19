import { demoAdminStudents } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { Search } from "lucide-react";

function feeVariant(s: string): "success" | "warning" | "danger" {
  if (s === "paid") return "success";
  if (s === "overdue") return "danger";
  return "warning";
}

export default function AdminStudentsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Students</h2>
          <p className="text-[14px] text-[#6B7280]">{demoAdminStudents.length} students shown · 1,247 total</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
        >
          + Add Student
        </button>
      </div>

      {/* Search (static) */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          disabled
          placeholder="Search students by name or admission number — available in full version"
          className="w-full pl-9 pr-4 py-2.5 text-[13px] border border-[#E5E3DF] bg-[#F9F8F7] text-[#9CA3AF] cursor-not-allowed"
        />
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Admission No.</th>
              <th>Class</th>
              <th className="text-center">Attendance</th>
              <th>Fee Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoAdminStudents.map((s) => (
              <tr key={s.id}>
                <td className="font-medium text-[#1A2B49]">{s.name}</td>
                <td className="font-mono text-[13px] text-[#6B7280]">{s.admissionNumber}</td>
                <td className="text-[#6B7280]">{s.class}</td>
                <td className="text-center">
                  <span className={`font-mono text-[13px] font-medium ${s.attendancePct >= 80 ? "text-[#3D5A45]" : s.attendancePct >= 60 ? "text-[#D97706]" : "text-[#C2593F]"}`}>
                    {s.attendancePct}%
                  </span>
                </td>
                <td>
                  <Badge variant={feeVariant(s.feeStatus)} size="sm" className="capitalize">{s.feeStatus}</Badge>
                </td>
                <td className="text-center">
                  <button
                    disabled
                    title="Available in full version"
                    className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (static) */}
      <div className="flex items-center justify-between text-[13px] text-[#6B7280]">
        <span>Showing 1–{demoAdminStudents.length} of 1,247</span>
        <div className="flex gap-2">
          <button disabled className="px-3 py-1.5 border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60">← Prev</button>
          <span className="px-3 py-1.5 bg-[#1A2B49] text-white">1</span>
          <button disabled title="Available in full version" className="px-3 py-1.5 border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60">2</button>
          <button disabled title="Available in full version" className="px-3 py-1.5 border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60">Next →</button>
        </div>
      </div>
    </div>
  );
}
