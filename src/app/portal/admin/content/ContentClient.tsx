"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { format } from "date-fns";
import { Plus, Trash2, X } from "lucide-react";

const TABS = ["News", "Events", "Announcements", "Gallery"] as const;
type Tab = typeof TABS[number];

interface NewsArticle { id: string; title: string; published: boolean; publishedAt: string; }
interface Event { id: string; title: string; type: string; startDate: string; isPublic: boolean; }
interface Announcement { id: string; title: string; body: string; targetRole: string; createdAt: string; }
interface GalleryItem { id: string; imageUrl: string; caption: string | null; category: string; uploadedAt: string; }

interface Props {
  initialNews: NewsArticle[];
  initialEvents: Event[];
  initialAnnouncements: Announcement[];
  initialGallery: GalleryItem[];
}

export default function ContentClient({ initialNews, initialEvents, initialAnnouncements, initialGallery }: Props) {
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("News");
  const [news, setNews] = useState(initialNews);
  const [events, setEvents] = useState(initialEvents);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [gallery, setGallery] = useState(initialGallery);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", body: "", targetRole: "all",
    type: "Academic", startDate: "", endDate: "",
  });

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let endpoint = "";
      let payload: any = {};

      if (tab === "News") {
        endpoint = "/api/news";
        payload = { title: form.title, body: form.body };
      } else if (tab === "Events") {
        endpoint = "/api/events";
        payload = { title: form.title, description: form.body, type: form.type, startDate: form.startDate, endDate: form.endDate || form.startDate };
      } else if (tab === "Announcements") {
        endpoint = "/api/announcements";
        payload = { title: form.title, body: form.body, targetRole: form.targetRole };
      } else {
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const item = await res.json();

      if (tab === "News") setNews((prev) => [item, ...prev]);
      else if (tab === "Events") setEvents((prev) => [item, ...prev]);
      else if (tab === "Announcements") setAnnouncements((prev) => [item, ...prev]);

      setForm({ title: "", body: "", targetRole: "all", type: "Academic", startDate: "", endDate: "" });
      setShowForm(false);
      toast(`${tab.slice(0, -1)} published.`, "success");
    } catch {
      toast("Failed to publish. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, endpoint: string, remove: (id: string) => void) {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      remove(id);
      toast("Item deleted.", "success");
    } catch {
      toast("Failed to delete.", "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Content Manager</h2>
          <p className="text-[14px] text-[#6B7280]">Manage news, events, announcements, and gallery</p>
        </div>
        {tab !== "Gallery" && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors flex-shrink-0"
          >
            <Plus size={14} />
            New {tab.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="flex border-b border-[#E5E3DF]">
        {TABS.map((t) => (
          <button key={t} onClick={() => { setTab(t); setShowForm(false); }}
            className={`px-5 py-2.5 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
              tab === t ? "border-[#C2593F] text-[#C2593F]" : "border-transparent text-[#6B7280] hover:text-[#1A2B49]"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {showForm && tab !== "Gallery" && (
        <div className="bg-white border border-[#E5E3DF] p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14px] font-semibold text-[#1A2B49]">New {tab.slice(0, -1)}</p>
            <button onClick={() => setShowForm(false)}><X size={16} className="text-[#9CA3AF]" /></button>
          </div>
          <form onSubmit={handleCreate} className="space-y-3">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title *" className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]" />
            {tab !== "Events" && (
              <textarea required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={3} placeholder="Content *" className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49] resize-none" />
            )}
            {tab === "Events" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] text-[#6B7280] mb-1">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none text-[#1A2B49]">
                    {["Academic","Sports","Cultural","Meeting","Celebration"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] text-[#6B7280] mb-1">Start Date *</label>
                  <input required type="datetime-local" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none text-[#1A2B49]" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12px] text-[#6B7280] mb-1">Description</label>
                  <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                    rows={2} className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none text-[#1A2B49] resize-none" />
                </div>
              </div>
            )}
            {tab === "Announcements" && (
              <div className="flex items-center gap-2">
                <label className="text-[13px] text-[#6B7280]">Audience:</label>
                <select value={form.targetRole} onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                  className="text-[13px] border border-[#E5E3DF] px-2 py-1.5 text-[#1A2B49] focus:outline-none">
                  <option value="all">Everyone</option>
                  <option value="parent">Parents</option>
                  <option value="student">Students</option>
                  <option value="teacher">Teachers</option>
                </select>
              </div>
            )}
            <div className="flex justify-end">
              <button type="submit" disabled={saving}
                className="px-5 py-2 text-[13px] font-medium bg-[#C2593F] text-white hover:bg-[#a8472f] transition-colors disabled:opacity-50">
                {saving ? "Publishing…" : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}

      {tab === "News" && (
        <div className="space-y-3">
          {news.length === 0 && <p className="text-center py-8 text-[#6B7280]">No news articles yet.</p>}
          {news.map((a) => (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                  <Badge variant={a.published ? "success" : "warning"} size="sm">{a.published ? "Published" : "Draft"}</Badge>
                </div>
                <p className="text-[12px] text-[#6B7280]">{a.published ? `Published ${format(new Date(a.publishedAt), "d MMM yyyy")}` : "Draft"}</p>
              </div>
              <button onClick={() => handleDelete(a.id, "/api/news", (id) => setNews((p) => p.filter((x) => x.id !== id)))}
                className="text-[#C2593F] hover:opacity-70 flex-shrink-0"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}

      {tab === "Events" && (
        <div className="space-y-3">
          {events.length === 0 && <p className="text-center py-8 text-[#6B7280]">No events yet.</p>}
          {events.map((evt) => (
            <div key={evt.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-[#1A2B49]">{evt.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-1">{evt.type} · {format(new Date(evt.startDate), "d MMM yyyy, h:mm a")}</p>
              </div>
              <button onClick={() => handleDelete(evt.id, "/api/events", (id) => setEvents((p) => p.filter((x) => x.id !== id)))}
                className="text-[#C2593F] hover:opacity-70 flex-shrink-0"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}

      {tab === "Announcements" && (
        <div className="space-y-3">
          {announcements.length === 0 && <p className="text-center py-8 text-[#6B7280]">No announcements yet.</p>}
          {announcements.map((a) => (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-1 capitalize">{a.targetRole} · {format(new Date(a.createdAt), "d MMM yyyy")}</p>
              </div>
              <button onClick={() => handleDelete(a.id, "/api/announcements", (id) => setAnnouncements((p) => p.filter((x) => x.id !== id)))}
                className="text-[#C2593F] hover:opacity-70 flex-shrink-0"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}

      {tab === "Gallery" && (
        <div>
          {gallery.length === 0 ? (
            <div className="bg-white border border-[#E5E3DF] p-12 text-center">
              <p className="text-[14px] text-[#6B7280]">No gallery photos yet. Upload photos via the public gallery section.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.map((item) => (
                <div key={item.id} className="relative group">
                  <img src={item.imageUrl} alt={item.caption ?? ""} className="aspect-square object-cover w-full border border-[#E5E3DF]" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDelete(item.id, "/api/gallery", (id) => setGallery((p) => p.filter((x) => x.id !== id)))}
                      className="bg-white text-[#C2593F] p-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {item.caption && <p className="text-[11px] text-[#6B7280] mt-1 truncate">{item.caption}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
