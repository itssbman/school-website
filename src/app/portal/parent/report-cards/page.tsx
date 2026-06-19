import { demoParent, demoReportCards } from "@/lib/demo-data";
import { format } from "date-fns";
import { Download, FileText } from "lucide-react";

export default function ParentReportCardsPage() {
  const { children } = demoParent;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Report Cards</h2>
        <p className="text-[14px] text-[#6B7280]">Download end-of-term report cards for your children</p>
      </div>

      {children.map((child) => {
        const cards = demoReportCards.filter((r) => r.studentId === child.id);
        return (
          <div key={child.id} className="bg-white border border-[#E5E3DF]">
            <div className="px-5 py-4 border-b border-[#E5E3DF] bg-[#F9F8F7]">
              <p className="font-heading text-[15px] font-bold text-[#1A2B49]">{child.user.name}</p>
              <p className="text-[12px] text-[#6B7280]">Class {child.class} · {child.admissionNumber}</p>
            </div>
            <div className="divide-y divide-[#E5E3DF]">
              {cards.map((card) => (
                <div key={card.id} className="px-5 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-[#C2593F] flex-shrink-0" />
                    <div>
                      <p className="text-[14px] font-medium text-[#1A2B49]">{card.term}</p>
                      <p className="text-[12px] text-[#6B7280]">
                        Generated {format(new Date(card.generatedAt), "d MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <button
                    disabled
                    title="Available in full version"
                    className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
                  >
                    <Download size={13} />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <p className="text-[12px] text-[#9CA3AF] text-center">
        PDF generation available in the full version
      </p>
    </div>
  );
}
