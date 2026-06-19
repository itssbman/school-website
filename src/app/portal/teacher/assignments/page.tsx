"use client";

import { useState } from "react";
import { demoAssignments } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format, isPast } from "date-fns";
import { ChevronDown, ChevronRight, Plus, Users } from "lucide-react";

export default function TeacherAssignmentsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Assignments</h2>
          <p className="text-[14px] text-[#6B7280]">Manage and review student submissions</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
        >
          <Plus size={14} />
          New Assignment
        </button>
      </div>

      <div className="space-y-3">
        {demoAssignments.map((a) => {
          const isExpanded = expanded === a.id;
          const overdue = isPast(new Date(a.dueDate));

          return (
            <div key={a.id} className="bg-white border border-[#E5E3DF]">
              <button
                className="w-full px-5 py-4 text-left flex items-center gap-3 hover:bg-[#F9F8F7] transition-colors"
                onClick={() => setExpanded(isExpanded ? null : a.id)}
              >
                {isExpanded ? <ChevronDown size={16} className="text-[#6B7280] flex-shrink-0" /> : <ChevronRight size={16} className="text-[#6B7280] flex-shrink-0" />}
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">
                    Class {a.classId} · Due {format(new Date(a.dueDate), "d MMM yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
                    <Users size={13} />
                    {a.submissions.length} submitted
                  </div>
                  <Badge variant={overdue ? "danger" : "info"} size="sm">
                    {overdue ? "Closed" : "Open"}
                  </Badge>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-4 border-t border-[#E5E3DF] pt-4">
                  <p className="text-[13px] text-[#6B7280] mb-3">
                    {a.submissions.length} submission{a.submissions.length !== 1 ? "s" : ""} received
                  </p>
                  <div className="space-y-2">
                    {a.submissions.map((sub, i) => (
                      <div key={sub.id} className="flex items-center justify-between px-3 py-2 bg-[#F9F8F7] border border-[#E5E3DF]">
                        <p className="text-[13px] text-[#1A2B49]">Submission #{i + 1}</p>
                        <button
                          disabled
                          title="Available in full version"
                          className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-white"
                        >
                          View &amp; Grade
                        </button>
                      </div>
                    ))}
                    {a.submissions.length === 0 && (
                      <p className="text-[13px] text-[#9CA3AF] text-center py-4">No submissions yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
