export const dynamic = "force-dynamic";

const DEMO_NOTIFICATIONS = [
  { id: "1", title: "Term 2 timetable published", body: "The updated timetable for Term 2 is now available.", time: "2 hours ago", read: false },
  { id: "2", title: "Fee payment reminder", body: "Please clear outstanding fees before end of term.", time: "1 day ago", read: false },
  { id: "3", title: "PTA meeting scheduled", body: "Parent-Teacher meeting on Friday, 3 PM in the Assembly Hall.", time: "2 days ago", read: true },
  { id: "4", title: "Assignment due tomorrow", body: "Mathematics assignment is due tomorrow at 8 AM.", time: "3 days ago", read: true },
  { id: "5", title: "School sports day", body: "Annual sports day is set for next Saturday. Students should bring appropriate kit.", time: "1 week ago", read: true },
];

export default function NotificationsPage() {
  const unread = DEMO_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Notifications</h2>
          <p className="text-[14px] text-[#6B7280]">
            {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "All caught up"}
          </p>
        </div>
      </div>

      <div className="bg-white border border-[#E5E3DF] divide-y divide-[#E5E3DF]">
        {DEMO_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`px-5 py-4 flex items-start gap-4 ${!n.read ? "bg-[#FAFAF9]" : ""}`}
          >
            {!n.read && (
              <span className="mt-1.5 w-2 h-2 rounded-full bg-terracotta flex-shrink-0" />
            )}
            {n.read && <span className="mt-1.5 w-2 h-2 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className={`text-[14px] font-medium text-[#1A2B49] ${!n.read ? "" : "text-[#374151]"}`}>
                {n.title}
              </p>
              <p className="text-[13px] text-[#6B7280] mt-0.5">{n.body}</p>
              <p className="text-[11px] text-[#9CA3AF] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
