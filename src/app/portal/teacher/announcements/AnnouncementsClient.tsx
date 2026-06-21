"use client";

import { useState } from "react";
import { Bell, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/Toast";

interface Announcement {
  id: string;
  title: string;
  body: string;
  targetRole: string;
  createdAt: string;
  author?: { name: string };
}

interface Props {
  initialAnnouncements: Announcement[];
}

export default function AnnouncementsClient({ initialAnnouncements }: Props) {
  const { toast } = useToast();
  const [items, setItems] = useState(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", targetRole: "all" });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.body) return;
    setSaving(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
      setForm({ title: "", body: "", targetRole: "all" });
      setShowForm(false);
      toast("Announcement posted successfully.", "success");
    } catch {
      toast("Failed to post announcement. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-center justify-between">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Announcements</h2>
          <p className="text-[14px] text-[#6B7280]">Notices from administration · post to your students</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#1A2B49] text-[#1A2B49] hover:bg-[#1A2B49] hover:text-white transition-colors"
        >
          <Plus size={14} />
          New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[#E5E3DF] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-[#1A2B49]">Post Announcement</p>
            <button onClick={() => setShowForm(false)} className="text-[#9CA3AF] hover:text-[#1A2B49]">
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Announcement title *"
              className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
            />
            <textarea
              required
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={4}
              placeholder="Announcement content…"
              className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49] resize-none"
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#6B7280]">Audience:</label>
                <select
                  value={form.targetRole}
                  onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                  className="text-[13px] border border-[#E5E3DF] px-2 py-1.5 text-[#1A2B49] focus:outline-none"
                >
                  <option value="student">Students</option>
                  <option value="parent">Parents</option>
                  <option value="all">Everyone</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 text-[13px] font-medium bg-[#C2593F] text-white hover:bg-[#a8472f] transition-colors disabled:opacity-50"
              >
                {saving ? "Posting…" : "Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {items.length === 0 ? (
        <div className="bg-white border border-[#E5E3DF] p-12 text-center">
          <Bell size={32} className="text-[#E5E3DF] mx-auto mb-3" />
          <p className="text-[14px] text-[#6B7280]">No announcements to show.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((a) => (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-[#FEF3EF] border border-[#F5D0C5] flex items-center justify-center flex-shrink-0">
                  <Bell size={16} className="text-[#C2593F]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1A2B49] text-[15px]">{a.title}</p>
                  <p className="text-[12px] text-[#6B7280] mt-0.5">
                    {format(new Date(a.createdAt), "d MMMM yyyy")}
                    {a.author?.name ? ` · ${a.author.name}` : ""}
                    {" · "}
                    <span className="capitalize">{a.targetRole}</span>
                  </p>
                  <p className="text-[13px] text-[#6B7280] mt-3 leading-relaxed">{a.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
