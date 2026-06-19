"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { format } from "date-fns";

interface Message {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
  read: boolean;
}

interface Thread {
  userId: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastAt: string;
  unread: number;
}

interface MessagingPanelProps {
  height?: number;
}

export default function MessagingPanel({ height = 500 }: MessagingPanelProps) {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThread, setActiveThread] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    if (activeThread) fetchMessages(activeThread);
  }, [activeThread]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchThreads = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setThreads(data);
        if (data.length > 0 && !activeThread) setActiveThread(data[0].userId);
      }
    } catch {}
    setLoading(false);
  };

  const fetchMessages = async (userId: string) => {
    try {
      const res = await fetch(`/api/messages?with=${userId}`);
      if (res.ok) setMessages(await res.json());
    } catch {}
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !activeThread) return;
    const body = newMessage.trim();
    setNewMessage("");
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: activeThread, body }),
      });
      fetchMessages(activeThread);
      fetchThreads();
    } catch {}
  };

  const activeUser = threads.find((t) => t.userId === activeThread);

  return (
    <div className="flex overflow-hidden" style={{ height }}>
      <div className="w-56 flex-shrink-0 border-r border-[#E5E3DF] overflow-y-auto">
        {loading ? (
          <div className="p-4 text-[13px] text-[#6B7280]">Loading...</div>
        ) : threads.length === 0 ? (
          <div className="p-4 text-[13px] text-[#6B7280]">No conversations yet.</div>
        ) : (
          threads.map((thread) => (
            <button
              key={thread.userId}
              onClick={() => setActiveThread(thread.userId)}
              className={`w-full px-4 py-3 text-left border-b border-[#E5E3DF] transition-colors ${
                activeThread === thread.userId ? "bg-[#F5F4F2]" : "hover:bg-[#F9F8F7]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Avatar src={thread.avatar} name={thread.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#1A2B49] truncate">{thread.name}</p>
                  <p className="text-[11px] text-[#6B7280] truncate mt-0.5">{thread.lastMessage}</p>
                </div>
                {thread.unread > 0 && (
                  <span className="w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center flex-shrink-0">
                    {thread.unread}
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {activeUser ? (
          <>
            <div className="px-4 py-3 border-b border-[#E5E3DF] flex items-center gap-2.5">
              <Avatar src={activeUser.avatar} name={activeUser.name} size="sm" />
              <p className="text-[14px] font-medium text-[#1A2B49]">{activeUser.name}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => {
                const isMe = false;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[72%] px-3 py-2 text-[13px] leading-relaxed ${
                        isMe
                          ? "bg-[#1A2B49] text-white"
                          : "bg-[#F5F4F2] text-[#1A2B49]"
                      }`}
                    >
                      {msg.body}
                      <div className={`text-[10px] mt-1 ${isMe ? "text-white/60" : "text-[#6B7280]"}`}>
                        {format(new Date(msg.createdAt), "h:mm a")}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-4 py-3 border-t border-[#E5E3DF] flex items-center gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-[13px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49] placeholder:text-[#9CA3AF]"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="p-2 bg-terracotta text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#A8482F] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[14px] text-[#6B7280]">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
