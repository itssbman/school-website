"use client";

import { useState, useRef } from "react";
import { FileText, Upload } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/Toast";

interface LessonPlan {
  id: string;
  subject: string;
  class: string;
  week: string;
  fileUrl: string;
  uploadedAt: string;
}

interface Props {
  initialPlans: LessonPlan[];
  subjects: string[];
  classes: string[];
}

export default function LessonPlansClient({ initialPlans, subjects, classes }: Props) {
  const { toast } = useToast();
  const [plans, setPlans] = useState(initialPlans);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    subject: subjects[0] ?? "",
    class: classes[0] ?? "",
    week: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file || !form.week) {
      toast("Please fill in all fields and select a file.", "error");
      return;
    }
    setUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("type", "lesson-plans");
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      const saveRes = await fetch("/api/lesson-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: form.subject, class: form.class, week: form.week, fileUrl: url }),
      });
      if (!saveRes.ok) throw new Error("Save failed");
      const newPlan = await saveRes.json();
      setPlans((prev) => [newPlan, ...prev]);
      setForm({ subject: subjects[0] ?? "", class: classes[0] ?? "", week: "" });
      if (fileRef.current) fileRef.current.value = "";
      toast("Lesson plan uploaded successfully.", "success");
    } catch {
      toast("Upload failed. Please try again.", "error");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">Lesson Plans</h2>
        <p className="text-[14px] text-[#6B7280]">Upload and manage your weekly lesson plans</p>
      </div>

      <form onSubmit={handleUpload} className="bg-white border-2 border-dashed border-[#E5E3DF] p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <Upload size={28} className="text-[#9CA3AF] mb-3" />
          <p className="text-[14px] font-medium text-[#1A2B49] mb-1">Upload Lesson Plan</p>
          <p className="text-[12px] text-[#9CA3AF]">PDF, DOCX up to 10 MB</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
          <div>
            <label className="block text-[12px] text-[#6B7280] mb-1">Subject</label>
            <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-[#6B7280] mb-1">Class</label>
            <select value={form.class} onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[12px] text-[#6B7280] mb-1">Week *</label>
            <input required value={form.week} onChange={(e) => setForm({ ...form, week: e.target.value })}
              placeholder="e.g. Week 3 – Algebra" className="w-full px-3 py-2 text-[13px] border border-[#E5E3DF] focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]" />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-[12px] text-[#6B7280] mb-1">File *</label>
            <input required ref={fileRef} type="file" accept=".pdf,.doc,.docx"
              className="w-full text-[13px] text-[#6B7280] file:mr-3 file:px-3 file:py-1.5 file:border file:border-[#E5E3DF] file:text-[12px] file:text-[#1A2B49] file:bg-[#F9F8F7] file:cursor-pointer" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={uploading}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2 text-[13px] font-medium bg-[#1A2B49] text-white hover:bg-[#16243e] transition-colors disabled:opacity-50">
              <Upload size={14} />
              {uploading ? "Uploading…" : "Upload"}
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-5 py-3 border-b border-[#E5E3DF] bg-[#F9F8F7]">
          <p className="text-[13px] font-semibold text-[#1A2B49]">Uploaded Plans ({plans.length})</p>
        </div>
        {plans.length === 0 ? (
          <p className="px-5 py-8 text-center text-[14px] text-[#6B7280]">No lesson plans uploaded yet.</p>
        ) : (
          <div className="divide-y divide-[#E5E3DF]">
            {plans.map((plan) => (
              <div key={plan.id} className="px-5 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-[#C2593F] flex-shrink-0" />
                  <div>
                    <p className="text-[13px] font-medium text-[#1A2B49]">{plan.week}</p>
                    <p className="text-[11px] text-[#6B7280] mt-0.5">
                      {plan.subject} · Class {plan.class} · {format(new Date(plan.uploadedAt), "d MMM yyyy")}
                    </p>
                  </div>
                </div>
                <a href={plan.fileUrl} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 text-[12px] font-medium border border-[#E5E3DF] text-[#1A2B49] hover:border-[#1A2B49] transition-colors flex-shrink-0">
                  Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
