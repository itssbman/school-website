"use client";

import { useState } from "react";
import { demoMessageThreads } from "@/lib/demo-data";
import Avatar from "@/components/ui/Avatar";
import { format } from "date-fns";
import { Send } from "lucide-react";

export default function TeacherMessagesPage() {
  const threads = demoMessageThreads.teacher;
  const [activeId, setActiveId] = useState(threads[0]?.userId ?? null);
  const active = threads.find((t) => t.userId === activeId);

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Messages</h2>
        <p className="text-[14px] text-[#6B7280]">Conversations with parents and staff</p>
      </div>

      <div className="bg-white border border-[#E5E3DF] flex overflow-hidden" style={{ height: 500 }}>
        {/* Thread list */}
        <div className="w-56 flex-shrink-0 border-r border-[#E5E3DF] overflow-y-auto">
          {threads.map((t) => (
            <button
              key={t.userId}
              onClick={() => setActiveId(t.userId)}
              className={`w-full px-4 py-3 text-left border-b border-[#E5E3DF] transition-colors ${
                activeId === t.userId ? "bg-[#F5F4F2]" : "hover:bg-[#F9F8F7]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar name={t.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#1A2B49] truncate">{t.name}</p>
                  <p className="text-[11px] text-[#6B7280] truncate mt-0.5">{t.lastMessage}</p>
                </div>
                {t.unread > 0 && (
                  <span className="w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center flex-shrink-0">
                    {t.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Message pane */}
        <div className="flex-1 flex flex-col min-w-0">
          {active ? (
            <>
              <div className="px-4 py-3 border-b border-[#E5E3DF] flex items-center gap-2.5">
                <Avatar name={active.name} size="sm" />
                <p className="text-[14px] font-medium text-[#1A2B49]">{active.name}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {active.messages.map((msg) => {
                  const isMe = msg.senderId === "teacher-1";
                  return (
                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[72%] px-3 py-2 text-[13px] leading-relaxed ${isMe ? "bg-[#1A2B49] text-white" : "bg-[#F5F4F2] text-[#1A2B49]"}`}>
                        {msg.body}
                        <div className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-[#6B7280]"}`}>
                          {format(new Date(msg.createdAt), "h:mm a")}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-3 border-t border-[#E5E3DF] flex items-center gap-2">
                <input
                  disabled
                  placeholder="Messaging disabled in demo mode"
                  className="flex-1 px-3 py-2 text-[13px] border border-[#E5E3DF] bg-[#F9F8F7] text-[#9CA3AF] cursor-not-allowed"
                />
                <button disabled title="Available in full version" className="p-2 bg-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed">
                  <Send size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[14px] text-[#6B7280]">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
