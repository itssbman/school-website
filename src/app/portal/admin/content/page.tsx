"use client";

import { useState } from "react";
import { demoNewsArticles, demoEvents, demoAnnouncements } from "@/lib/demo-data";
import Badge from "@/components/ui/Badge";
import { format } from "date-fns";
import { Plus } from "lucide-react";

const TABS = ["News", "Events", "Announcements", "Gallery"] as const;
type Tab = typeof TABS[number];

export default function AdminContentPage() {
  const [tab, setTab] = useState<Tab>("News");

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Content Manager</h2>
          <p className="text-[14px] text-[#6B7280]">Manage news, events, announcements, and gallery</p>
        </div>
        <button
          disabled
          title="Available in full version"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7] flex-shrink-0"
        >
          <Plus size={14} />
          New {tab === "Gallery" ? "Photo" : tab.slice(0, -1)}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E3DF]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-[13px] font-medium border-b-2 transition-colors -mb-px ${
              tab === t
                ? "border-[#C2593F] text-[#C2593F]"
                : "border-transparent text-[#6B7280] hover:text-[#1A2B49]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* News tab */}
      {tab === "News" && (
        <div className="space-y-3">
          {demoNewsArticles.map((article) => (
            <div key={article.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[14px] font-medium text-[#1A2B49]">{article.title}</p>
                  {article.draft && <Badge variant="warning" size="sm">Draft</Badge>}
                </div>
                <p className="text-[12px] text-[#6B7280]">
                  {article.category} · {article.draft ? "Not published" : `Published ${format(new Date(article.publishedAt), "d MMM yyyy")}`}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Edit</button>
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Events tab */}
      {tab === "Events" && (
        <div className="space-y-3">
          {demoEvents.map((evt) => (
            <div key={evt.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-[#1A2B49]">{evt.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-1">
                  {evt.type} · {format(new Date(evt.startDate), "d MMM yyyy, h:mm a")}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Edit</button>
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Announcements tab */}
      {tab === "Announcements" && (
        <div className="space-y-3">
          {[...demoAnnouncements.parent, ...demoAnnouncements.student, ...demoAnnouncements.teacher].map((a) => (
            <div key={a.id} className="bg-white border border-[#E5E3DF] p-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[14px] font-medium text-[#1A2B49]">{a.title}</p>
                <p className="text-[12px] text-[#6B7280] mt-1">{format(new Date(a.createdAt), "d MMM yyyy")}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Edit</button>
                <button disabled title="Available in full version" className="text-[12px] border border-[#E5E3DF] px-3 py-1 text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Gallery tab */}
      {tab === "Gallery" && (
        <div className="bg-white border border-[#E5E3DF] p-10 text-center">
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-[#F5F4F2] border border-[#E5E3DF] flex items-center justify-center">
                <span className="text-[11px] text-[#9CA3AF]">Photo {i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#9CA3AF] mb-4">Gallery management available in the full version</p>
          <button
            disabled
            title="Available in full version"
            className="inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium border border-[#E5E3DF] text-[#9CA3AF] cursor-not-allowed opacity-60 bg-[#F9F8F7]"
          >
            <Plus size={14} />
            Upload Photos
          </button>
        </div>
      )}
    </div>
  );
}
