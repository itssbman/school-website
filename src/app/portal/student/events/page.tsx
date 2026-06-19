import { demoEvents } from "@/lib/demo-data";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

const TYPE_COLOR: Record<string, string> = {
  Meeting: "bg-[#EEF2FF] text-[#4F46E5]",
  Academic: "bg-[#FEF3EF] text-[#C2593F]",
  Sports:   "bg-[#ECFDF5] text-[#3D5A45]",
};

export default function StudentEventsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Upcoming Events</h2>
        <p className="text-[14px] text-[#6B7280]">School calendar — important dates and events</p>
      </div>

      <div className="space-y-4">
        {demoEvents.map((evt) => {
          const d = new Date(evt.startDate);
          return (
            <div key={evt.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start gap-5">
              {/* Date badge */}
              <div className="flex-shrink-0 w-14 text-center border border-[#E5E3DF] bg-[#F9F8F7]">
                <div className="bg-[#1A2B49] text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1">
                  {format(d, "MMM")}
                </div>
                <div className="py-2">
                  <span className="text-[24px] font-bold font-heading text-[#1A2B49] leading-none">
                    {format(d, "d")}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[15px] font-medium text-[#1A2B49]">{evt.title}</p>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 flex-shrink-0 ${TYPE_COLOR[evt.type] ?? "bg-[#F5F4F2] text-[#6B7280]"}`}>
                    {evt.type}
                  </span>
                </div>
                <p className="text-[13px] text-[#6B7280] mt-1 flex items-center gap-1.5">
                  <Calendar size={13} />
                  {format(d, "EEEE, d MMMM yyyy · h:mm a")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
