"use client";

import { useState } from "react";
import { FileText, ExternalLink, Download } from "lucide-react";

const RESOURCES: Record<string, { id: string; name: string; type: "PDF" | "Link" | "Video"; url?: string; size?: string }[]> = {
  Mathematics: [
    { id: "m1", name: "Further Maths Textbook (SS1–SS3)", type: "PDF", size: "12.4 MB" },
    { id: "m2", name: "WAEC Past Questions — Mathematics", type: "PDF", size: "8.1 MB" },
    { id: "m3", name: "Khan Academy — Algebra", type: "Link" },
  ],
  "English Language": [
    { id: "e1", name: "English Grammar & Composition", type: "PDF", size: "6.3 MB" },
    { id: "e2", name: "Oral English Practice", type: "Video" },
  ],
  Physics: [
    { id: "p1", name: "Physics for SS1 Textbook", type: "PDF", size: "14.2 MB" },
    { id: "p2", name: "Newton's Laws — Video Series", type: "Video" },
  ],
  Chemistry: [
    { id: "c1", name: "New School Chemistry SS2", type: "PDF", size: "10.8 MB" },
    { id: "c2", name: "Organic Chemistry Notes", type: "PDF", size: "3.1 MB" },
  ],
  Biology: [
    { id: "b1", name: "Comprehensive Biology", type: "PDF", size: "9.4 MB" },
  ],
};

const SUBJECTS = Object.keys(RESOURCES);

const ICONS = {
  PDF:   <FileText size={15} className="text-[#C2593F]" />,
  Link:  <ExternalLink size={15} className="text-[#1A2B49]" />,
  Video: <ExternalLink size={15} className="text-[#3D5A45]" />,
};

export default function StudentResourcesPage() {
  const [active, setActive] = useState(SUBJECTS[0]);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Learning Resources</h2>
        <p className="text-[14px] text-[#6B7280]">Textbooks, past questions, and reference materials</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {SUBJECTS.map((s) => (
          <button key={s} onClick={() => setActive(s)}
            className={`px-4 py-2 text-[13px] font-medium border transition-colors ${
              active === s ? "bg-[#1A2B49] text-white border-[#1A2B49]" : "border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49]"
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E5E3DF] divide-y divide-[#E5E3DF]">
        {(RESOURCES[active] ?? []).map((r) => (
          <div key={r.id} className="px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {ICONS[r.type]}
              <div>
                <p className="text-[14px] font-medium text-[#1A2B49]">{r.name}</p>
                <p className="text-[11px] text-[#6B7280] mt-0.5">{r.type}{r.size ? ` · ${r.size}` : ""}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49] transition-colors">
              <Download size={13} />
              {r.type === "Link" || r.type === "Video" ? "Open" : "Download"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
