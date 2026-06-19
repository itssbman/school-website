import { demoLessonPlans } from "@/lib/demo-data";
import { format } from "date-fns";
import { FileText, Upload } from "lucide-react";

export default function TeacherLessonPlansPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Lesson Plans</h2>
        <p className="text-[14px] text-[#6B7280]">Upload and manage your weekly lesson plans</p>
      </div>

      {/* Upload zone */}
      <div className="bg-white border-2 border-dashed border-[#E5E3DF] p-10 text-center">
        <Upload size={28} className="text-[#9CA3AF] mx-auto mb-3" />
        <p className="text-[14px] font-medium text-[#1A2B49] mb-1">Upload Lesson Plan</p>
        <p className="text-[12px] text-[#9CA3AF] mb-4">PDF, DOCX up to 10 MB — available in the full version</p>
        <button
          disabled
          title="Available in full version"
          className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
        >
          <Upload size={14} />
          Choose File
        </button>
      </div>

      {/* Uploaded plans */}
      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7]">
          <p className="text-[13px] font-semibold text-[#1A2B49]">Uploaded Plans ({demoLessonPlans.length})</p>
        </div>
        <div className="divide-y divide-[#E5E3DF]">
          {demoLessonPlans.map((plan) => (
            <div key={plan.id} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-[#C2593F] flex-shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-[#1A2B49]">{plan.title}</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">
                    {plan.subject} · {plan.size} · Uploaded {format(new Date(plan.uploadedAt), "d MMM yyyy")}
                  </p>
                </div>
              </div>
              <button
                disabled
                title="Available in full version"
                className="px-3 py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
