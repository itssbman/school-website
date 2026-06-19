import { demoStudent, demoTimetableAll } from "@/lib/demo-data";
import { format } from "date-fns";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;
const PERIODS = [1, 2, 3] as const;
const PERIOD_TIMES: Record<number, string> = {
  1: "8:00 – 9:00",
  2: "9:00 – 10:00",
  3: "10:30 – 11:30",
};

export default function StudentTimetablePage() {
  const todayName = format(new Date(), "EEEE") as typeof DAYS[number];
  const timetable = demoTimetableAll.filter((t) => t.class === demoStudent.class);

  function getCell(day: string, period: number) {
    return timetable.find((t) => t.day === day && t.period === period);
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Timetable</h2>
        <p className="text-[14px] text-[#6B7280]">
          Class {demoStudent.class} · Week schedule ·{" "}
          <span className="font-medium text-[#C2593F]">Today: {todayName}</span>
        </p>
      </div>

      <div className="bg-white border border-[#E5E3DF] overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-[#E5E3DF]">
              <th className="text-left px-4 py-3 text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide w-28 bg-[#F9F8F7]">
                Period
              </th>
              {DAYS.map((day) => (
                <th
                  key={day}
                  className={`px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-center ${
                    day === todayName
                      ? "bg-[#1A2B49] text-white"
                      : "bg-[#F9F8F7] text-[#6B7280]"
                  }`}
                >
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Break row */}
            <tr className="border-b border-[#E5E3DF]">
              <td className="px-4 py-2 text-[12px] text-[#6B7280] bg-[#F9F8F7]">
                <div className="font-medium">P1 &amp; P2</div>
                <div className="text-[11px]">8:00–10:00</div>
              </td>
              {DAYS.map((day) => {
                const p1 = getCell(day, 1);
                const p2 = getCell(day, 2);
                const isToday = day === todayName;
                return (
                  <td key={day} className={`px-4 py-3 text-center align-top ${isToday ? "bg-[#F0F4F8]" : ""}`}>
                    {p1 && (
                      <div className={`px-2 py-1.5 mb-1.5 text-[12px] font-medium ${isToday ? "bg-[#1A2B49] text-white" : "bg-[#F5F4F2] text-[#1A2B49]"}`}>
                        {p1.subject}
                        <div className={`text-[10px] font-normal mt-0.5 ${isToday ? "text-white/60" : "text-[#6B7280]"}`}>
                          {p1.startTime}–{p1.endTime}
                        </div>
                      </div>
                    )}
                    {p2 && (
                      <div className={`px-2 py-1.5 text-[12px] font-medium ${isToday ? "bg-[#1A2B49] text-white" : "bg-[#F5F4F2] text-[#1A2B49]"}`}>
                        {p2.subject}
                        <div className={`text-[10px] font-normal mt-0.5 ${isToday ? "text-white/60" : "text-[#6B7280]"}`}>
                          {p2.startTime}–{p2.endTime}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Break */}
            <tr className="border-b border-[#E5E3DF] bg-[#FFFBF5]">
              <td className="px-4 py-1.5 text-[11px] text-[#D97706] font-medium bg-[#FFF8EC]">Break</td>
              {DAYS.map((day) => (
                <td key={day} className="px-4 py-1.5 text-center text-[11px] text-[#D97706]">10:00 – 10:30</td>
              ))}
            </tr>

            {/* Period 3 */}
            <tr>
              <td className="px-4 py-3 text-[12px] text-[#6B7280] bg-[#F9F8F7]">
                <div className="font-medium">P3</div>
                <div className="text-[11px]">10:30–11:30</div>
              </td>
              {DAYS.map((day) => {
                const p3 = getCell(day, 3);
                const isToday = day === todayName;
                return (
                  <td key={day} className={`px-4 py-3 text-center ${isToday ? "bg-[#F0F4F8]" : ""}`}>
                    {p3 && (
                      <div className={`px-2 py-1.5 text-[12px] font-medium ${isToday ? "bg-[#1A2B49] text-white" : "bg-[#F5F4F2] text-[#1A2B49]"}`}>
                        {p3.subject}
                        <div className={`text-[10px] font-normal mt-0.5 ${isToday ? "text-white/60" : "text-[#6B7280]"}`}>
                          {p3.startTime}–{p3.endTime}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
