"use client";

import schoolConfig from "../../../school.config";

export default function Timeline() {
  const { history, stats } = schoolConfig;

  return (
    <section className="border-b border-[#E5E3DF] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Our History</span>
          <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-2">
            {stats.yearsOfExcellence} Years of Shaping Lives
          </h2>
        </div>

        <div className="hidden lg:block overflow-x-auto scrollbar-hide">
          <div className="flex gap-0 min-w-max">
            {history.milestones.map((m, i) => (
              <div key={m.year} className="relative flex flex-col" style={{ width: "200px" }}>
                <div className="flex items-center h-8">
                  <div className="flex-1 h-px bg-[#E5E3DF]" />
                  <div className="w-3 h-3 rounded-full border-2 border-terracotta bg-white flex-shrink-0 mx-1" />
                  {i === history.milestones.length - 1 ? null : <div className="flex-1 h-px bg-[#E5E3DF]" />}
                </div>
                <div className="pt-4 pr-6">
                  <span className="inline-block font-heading text-[14px] font-bold text-terracotta mb-1">
                    {m.year}
                  </span>
                  <h4 className="font-heading text-[15px] font-semibold text-[#1A2B49] mb-1">{m.title}</h4>
                  <p className="text-[12px] text-[#6B7280] leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-0">
          {history.milestones.map((m, i) => (
            <div key={m.year} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full border-2 border-terracotta bg-white flex-shrink-0 mt-1" />
                {i < history.milestones.length - 1 && (
                  <div className="w-px flex-1 bg-[#E5E3DF] my-1" />
                )}
              </div>
              <div className="pb-8">
                <span className="font-heading text-[14px] font-bold text-terracotta">{m.year}</span>
                <h4 className="font-heading text-[16px] font-semibold text-[#1A2B49] mt-0.5 mb-1">{m.title}</h4>
                <p className="text-[14px] text-[#6B7280] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
