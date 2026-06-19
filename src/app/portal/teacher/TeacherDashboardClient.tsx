"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { format } from "date-fns";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Avatar from "@/components/ui/Avatar";
import { Users, ClipboardCheck, BookOpen, Upload, Plus, Bell } from "lucide-react";
import MessagingPanel from "@/components/portal/MessagingPanel";

interface Props {
  teacher: any;
  studentsByClass: { class: string; students: any[] }[];
  announcements: any[];
}

function ClassOverview({ classes }: { classes: string[] }) {
  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
        <Users size={16} /> My Classes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {classes.map((cls) => (
          <div key={cls} className="flex items-center gap-3 p-3 border border-[#E5E3DF]">
            <div className="w-8 h-8 bg-[#1A2B49] text-white flex items-center justify-center text-[12px] font-bold">
              {cls.substring(0, 2)}
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#1A2B49]">{cls}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceMarker({ studentsByClass }: { studentsByClass: { class: string; students: any[] }[] }) {
  const [selectedClass, setSelectedClass] = useState(studentsByClass[0]?.class || "");
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const students = studentsByClass.find((c) => c.class === selectedClass)?.students || [];

  const setStatus = (id: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString(),
          records: Object.entries(attendance).map(([studentId, status]) => ({ studentId, status })),
        }),
      });
    } catch {}
    setSaving(false);
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] flex items-center gap-2">
          <ClipboardCheck size={16} /> Mark Attendance
        </h3>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="text-[13px] border border-[#E5E3DF] px-2 py-1 rounded focus:outline-none text-[#1A2B49]"
        >
          {studentsByClass.map((c) => (
            <option key={c.class} value={c.class}>{c.class}</option>
          ))}
        </select>
      </div>
      {students.length === 0 ? (
        <p className="text-[14px] text-[#6B7280]">No students in this class.</p>
      ) : (
        <>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {students.map((s: any) => (
              <div key={s.id} className="flex items-center gap-3 py-2 border-b border-[#E5E3DF]">
                <Avatar src={s.user.avatar} name={s.user.name} size="sm" />
                <span className="flex-1 text-[14px] text-[#1A2B49]">{s.user.name}</span>
                <div className="flex gap-1">
                  {(["present", "absent", "late"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatus(s.id, status)}
                      className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                        attendance[s.id] === status
                          ? status === "present"
                            ? "bg-[#3D5A45] text-white"
                            : status === "absent"
                            ? "bg-terracotta text-white"
                            : "bg-[#1A2B49] text-white"
                          : "border border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49]"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="primary" size="sm" onClick={saveAttendance} loading={saving}>
              Save Attendance
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function AssignmentManager({ assignments, classes, subjects }: { assignments: any[]; classes: string[]; subjects: string[] }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", classId: classes[0] || "", subject: subjects[0] || "" });
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!form.title || !form.dueDate) return;
    setSaving(true);
    try {
      await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ title: "", description: "", dueDate: "", classId: classes[0] || "", subject: subjects[0] || "" });
    } catch {}
    setSaving(false);
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49]">Assignments</h3>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus size={14} className="mr-1" />
          New
        </Button>
      </div>

      {showForm && (
        <div className="border border-[#E5E3DF] p-4 mb-4 space-y-3">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Due Date</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3 py-2.5 text-[14px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]" />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">Class</label>
              <select value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}
                className="w-full px-3 py-2.5 text-[14px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]">
                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={handleCreate} loading={saving}>Create</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {assignments.slice(0, 6).map((a: any) => (
          <div key={a.id} className="flex items-center gap-4 py-2.5 border-b border-[#E5E3DF] last:border-0">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-medium text-[#1A2B49] truncate">{a.title}</p>
              <p className="text-[12px] text-[#6B7280]">
                Due {format(new Date(a.dueDate), "d MMM")} · {a.classId}
              </p>
            </div>
            <Badge variant="info" size="sm">{a.submissions?.length || 0} submitted</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function LessonPlanUpload() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((files: File[]) => setFile(files[0] || null), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "lesson-plan");
      await fetch("/api/upload", { method: "POST", body: formData });
      setFile(null);
    } catch {}
    setUploading(false);
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
        <Upload size={16} /> Upload Lesson Plan
      </h3>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-terracotta bg-terracotta/5" : "border-[#E5E3DF] hover:border-[#1A2B49]/40"
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <p className="text-[14px] text-[#3D5A45] font-medium">{file.name}</p>
        ) : (
          <>
            <Upload size={24} className="mx-auto text-[#6B7280] mb-2" />
            <p className="text-[14px] text-[#6B7280]">Drag & drop PDF or click to browse</p>
          </>
        )}
      </div>
      {file && (
        <Button variant="primary" size="sm" className="mt-3 w-full" onClick={handleUpload} loading={uploading}>
          Upload Lesson Plan
        </Button>
      )}
    </div>
  );
}

export default function TeacherDashboardClient({ teacher, studentsByClass, announcements }: Props) {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E5E3DF]">
        <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">
          Welcome, {teacher.user.name.split(" ")[0]}
        </h2>
        <p className="text-[14px] text-[#6B7280]">
          {teacher.classes.join(", ")} · {teacher.subjects.join(", ")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ClassOverview classes={teacher.classes} />
        <AttendanceMarker studentsByClass={studentsByClass} />
      </div>

      <AssignmentManager
        assignments={teacher.assignments}
        classes={teacher.classes}
        subjects={teacher.subjects}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LessonPlanUpload />
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
            <Bell size={16} /> Staff Announcements
          </h3>
          {announcements.length === 0 ? (
            <p className="text-[14px] text-[#6B7280]">No staff announcements.</p>
          ) : (
            <ul className="space-y-3">
              {announcements.map((ann: any) => (
                <li key={ann.id} className="py-2 border-b border-[#E5E3DF] last:border-0">
                  <p className="text-[14px] font-medium text-[#1A2B49]">{ann.title}</p>
                  <p className="text-[12px] text-[#6B7280] line-clamp-2 mt-0.5">{ann.body}</p>
                  <time className="text-[11px] text-[#6B7280]/70 block mt-1">
                    {format(new Date(ann.createdAt), "d MMM yyyy")}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-white border border-[#E5E3DF]">
        <div className="px-6 py-4 border-b border-[#E5E3DF]">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49]">Messages from Parents</h3>
        </div>
        <MessagingPanel height={400} />
      </div>
    </div>
  );
}
