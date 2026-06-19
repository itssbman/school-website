import { demoExamTimetable } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format, parseISO } from "date-fns";
import { Plus } from "lucide-react";

const CLASSES = Array.from(new Set(demoExamTimetable.map((e) => e.class)));

export default function AdminExamsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Exam Schedule</h2>
          <p className="text-[14px] text-[#6B7280]">End-of-term examinations · {demoExamTimetable.length} entries</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            disabled
            title="Available in full version"
            className="px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
          >
            Export PDF
          </button>
          <button
            disabled
            title="Available in full version"
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
          >
            <Plus size={14} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Grouped by class */}
      {CLASSES.map((cls) => {
        const entries = demoExamTimetable.filter((e) => e.class === cls);
        return (
          <div key={cls} className="bg-white border border-[#E5E3DF]">
            <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7] flex items-center justify-between">
              <p className="text-[13px] font-bold text-[#1A2B49]">Class {cls}</p>
              <span className="text-[12px] text-[#6B7280]">{entries.length} exams</span>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Venue</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((e) => (
                    <tr key={e.id}>
                      <td className="font-medium text-[#1A2B49]">{e.subject}</td>
                      <td className="text-[#6B7280]">{format(parseISO(e.date), "d MMM yyyy (EEE)")}</td>
                      <td className="text-[#6B7280]">{e.time}</td>
                      <td>
                        <Badge variant="outline" size="sm">{e.duration}</Badge>
                      </td>
                      <td className="text-[#6B7280]">{e.venue}</td>
                      <td className="text-center">
                        <button
                          disabled
                          title="Available in full version"
                          className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
