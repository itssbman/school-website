import { demoEvents } from "@/lib/demo-data";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

const TYPE_COLORS: Record<string, string> = {
  Academic:    "bg-[#1A2B49] text-white",
  Sports:      "bg-[#3D5A45] text-white",
  Cultural:    "bg-[#C2593F] text-white",
  Meeting:     "bg-[#D97706] text-white",
  Celebration: "bg-[#6B7280] text-white",
};

export default function StudentEventsPage() {
  const now = new Date();
  const upcoming = demoEvents.filter((e) => new Date(e.startDate) >= now);
  const past     = demoEvents.filter((e) => new Date(e.startDate) < now);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">School Events</h2>
        <p className="text-[14px] text-[#6B7280]">{upcoming.length} upcoming · {past.length} past</p>
      </div>

      {upcoming.length > 0 && (
        <>
          <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider">Upcoming</h3>
          <div className="space-y-3">
            {upcoming.map((evt) => (
              <div key={evt.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start gap-5">
                <div className="flex-shrink-0 text-center w-14">
                  <p className="text-[24px] font-bold font-heading text-[#C2593F] leading-none">
                    {format(new Date(evt.startDate), "d")}
                  </p>
                  <p className="text-[11px] text-[#6B7280] uppercase">{format(new Date(evt.startDate), "MMM")}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[15px] font-semibold text-[#1A2B49]">{evt.title}</p>
                    <span className={`text-[11px] px-2 py-0.5 font-medium ${TYPE_COLORS[evt.type] ?? "bg-[#F5F4F2] text-[#6B7280]"}`}>
                      {evt.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {past.length > 0 && (
        <>
          <h3 className="text-[13px] font-semibold text-[#6B7280] uppercase tracking-wider mt-4">Past Events</h3>
          <div className="space-y-2 opacity-70">
            {past.map((evt) => (
              <div key={evt.id} className="bg-white border border-[#E5E3DF] px-5 py-3 flex items-center gap-4">
                <Calendar size={16} className="text-[#9CA3AF] flex-shrink-0" />
                <span className="text-[13px] text-[#6B7280]">{evt.title}</span>
                <span className="ml-auto text-[12px] text-[#9CA3AF]">{format(new Date(evt.startDate), "d MMM yyyy")}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {demoEvents.length === 0 && (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <Calendar size={32} className="text-[#E5E3DF] mx-auto mb-3" />
          <p className="text-[#6B7280]">No events scheduled.</p>
        </div>
      )}
    </div>
  );
}
