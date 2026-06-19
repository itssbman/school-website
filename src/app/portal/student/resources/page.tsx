"use client";

import { useState } from "react";
import { demoResources } from "@/lib/demo-data";
import { Download, ExternalLink, FileText } from "lucide-react";

const SUBJECTS = Object.keys(demoResources);

export default function StudentResourcesPage() {
  const [active, setActive] = useState(SUBJECTS[0]);
  const items = demoResources[active] ?? [];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Resources</h2>
        <p className="text-[14px] text-[#6B7280]">Study materials and reference links by subject</p>
      </div>

      {/* Subject tabs */}
      <div className="flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-4 py-2 text-[13px] font-medium border transition-colors ${
              active === s
                ? "bg-[#1A2B49] text-white border-[#1A2B49]"
                : "border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Resource list */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-[#E5E3DF] p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 flex items-center justify-center flex-shrink-0 ${item.type === "Link" ? "bg-[#EEF2FF]" : "bg-[#FEF3EF]"}`}>
                {item.type === "Link" ? (
                  <ExternalLink size={15} className="text-[#4F46E5]" />
                ) : (
                  <FileText size={15} className="text-[#C2593F]" />
                )}
              </div>
              <div>
                <p className="text-[13px] font-medium text-[#1A2B49]">{item.name}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">
                  {item.type}{item.size ? ` · ${item.size}` : ""}
                </p>
              </div>
            </div>
            <button
              disabled
              title="Available in full version"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
            >
              {item.type === "Link" ? <ExternalLink size={12} /> : <Download size={12} />}
              {item.type === "Link" ? "Open" : "Download"}
            </button>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-10 text-[#6B7280] text-[14px]">No resources for this subject yet.</div>
        )}
      </div>
    </div>
  );
}
