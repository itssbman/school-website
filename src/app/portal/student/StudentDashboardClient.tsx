"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { format, isToday, isPast } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import schoolConfig from "../../../../school.config";
import { Upload, Clock, CheckCircle2, AlertCircle, BookOpen, Calendar } from "lucide-react";

interface Props {
  student: any;
  timetable: any[];
  events: any[];
  announcements: any[];
  assignments: any[];
}

function Timetable({ timetable, currentHour }: { timetable: any[]; currentHour: number }) {
  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
        <Clock size={16} />
        Today&apos;s Timetable
      </h3>
      {timetable.length === 0 ? (
        <p className="text-[14px] text-[#6B7280]">No classes scheduled for today.</p>
      ) : (
        <div className="space-y-2">
          {timetable.map((period, i) => {
            const startHour = parseInt(period.startTime.split(":")[0]);
            const isCurrent = currentHour === startHour;
            return (
              <div
                key={period.id}
                className={`flex items-center gap-4 p-3 border-l-2 ${
                  isCurrent
                    ? "border-terracotta bg-terracotta/5"
                    : "border-[#E5E3DF] hover:border-[#1A2B49]/30"
                } transition-colors`}
              >
                <div className="w-20 flex-shrink-0">
                  <p className="text-[12px] font-medium text-[#6B7280]">
                    {period.startTime} – {period.endTime}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-[#1A2B49]">{period.subject}</p>
                </div>
                {isCurrent && (
                  <Badge variant="danger" size="sm">Now</Badge>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AssignmentDropzone({ assignments, submissions }: { assignments: any[]; submissions: any[] }) {
  const [selectedAssignment, setSelectedAssignment] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const submittedIds = new Set(submissions.map((s: any) => s.assignmentId));
  const pending = assignments.filter((a) => !submittedIds.has(a.id) && !isPast(new Date(a.dueDate)));

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setUploadedFile(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "application/pdf": [".pdf"], "application/msword": [".doc", ".docx"], "image/*": [] },
  });

  const handleSubmit = async () => {
    if (!uploadedFile || !selectedAssignment) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("assignmentId", selectedAssignment);
      await fetch("/api/assignments/submit", { method: "POST", body: formData });
      setUploadedFile(null);
      setSelectedAssignment("");
    } catch {}
    setUploading(false);
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
        <Upload size={16} />
        Submit Assignment
      </h3>
      {pending.length === 0 ? (
        <p className="text-[14px] text-[#6B7280]">No pending assignments to submit.</p>
      ) : (
        <div className="space-y-4">
          <select
            value={selectedAssignment}
            onChange={(e) => setSelectedAssignment(e.target.value)}
            className="w-full px-3 py-2.5 text-[14px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
          >
            <option value="">Select assignment...</option>
            {pending.map((a: any) => (
              <option key={a.id} value={a.id}>
                {a.title} — Due {format(new Date(a.dueDate), "d MMM")}
              </option>
            ))}
          </select>

          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-terracotta bg-terracotta/5"
                : "border-[#E5E3DF] hover:border-[#1A2B49]/40"
            }`}
          >
            <input {...getInputProps()} />
            {uploadedFile ? (
              <p className="text-[14px] font-medium text-[#3D5A45]">
                <CheckCircle2 size={16} className="inline mr-1" />
                {uploadedFile.name}
              </p>
            ) : (
              <>
                <Upload size={24} className="mx-auto text-[#6B7280] mb-2" />
                <p className="text-[14px] text-[#6B7280]">
                  {isDragActive ? "Drop file here" : "Drag & drop or click to upload"}
                </p>
                <p className="text-[12px] text-[#6B7280]/70 mt-1">PDF, DOC, or images</p>
              </>
            )}
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleSubmit}
            loading={uploading}
            disabled={!uploadedFile || !selectedAssignment}
            className="w-full"
          >
            Submit Assignment
          </Button>
        </div>
      )}
    </div>
  );
}

function GradesDashboard({ grades }: { grades: any[] }) {
  const [term, setTerm] = useState("all");
  const terms = [...new Set(grades.map((g) => g.term))];

  const filtered = term === "all" ? grades : grades.filter((g) => g.term === term);

  const subjectMap: Record<string, number[]> = {};
  filtered.forEach((g) => {
    if (!subjectMap[g.subject]) subjectMap[g.subject] = [];
    subjectMap[g.subject].push(g.score);
  });

  const data = Object.entries(subjectMap).map(([subject, scores]) => ({
    subject,
    score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));

  const getScoreVariant = (score: number) => {
    if (score >= 70) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  return (
    <div className="bg-white border border-[#E5E3DF] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] flex items-center gap-2">
          <BookOpen size={16} /> Grades
        </h3>
        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="text-[13px] border border-[#E5E3DF] px-2 py-1 rounded text-[#1A2B49] focus:outline-none"
        >
          <option value="all">All Terms</option>
          {terms.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      {data.length === 0 ? (
        <p className="text-[14px] text-[#6B7280]">No grades available.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="subject" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 13, border: "1px solid #E5E3DF", borderRadius: 4 }} formatter={(v: any) => [`${v}%`, "Avg Score"]} />
              <Bar dataKey="score" radius={[2, 2, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.score >= 70 ? "#3D5A45" : entry.score >= 50 ? "#1A2B49" : schoolConfig.brand.accentColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <table className="data-table mt-4">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Avg Score</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => {
                const grade = row.score >= 70 ? "A" : row.score >= 60 ? "B" : row.score >= 50 ? "C" : row.score >= 40 ? "D" : "F";
                return (
                  <tr key={row.subject}>
                    <td>{row.subject}</td>
                    <td>{row.score}%</td>
                    <td>
                      <Badge variant={getScoreVariant(row.score) as any}>{grade}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default function StudentDashboardClient({ student, timetable, events, announcements, assignments }: Props) {
  const currentHour = new Date().getHours();

  const submittedIds = new Set(student.submissions?.map((s: any) => s.assignmentId) || []);
  const pendingCount = assignments.filter((a) => !submittedIds.has(a.id) && !isPast(new Date(a.dueDate))).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-[#E5E3DF]">
        <div>
          <h2 className="font-heading text-[24px] font-bold text-[#1A2B49]">
            Welcome back, {student.user.name.split(" ")[0]}
          </h2>
          <p className="text-[14px] text-[#6B7280]">
            {student.class} · {format(new Date(), "EEEE, d MMMM yyyy")}
          </p>
        </div>
        <div className="ml-auto flex gap-3">
          <div className="text-center px-4 py-2 border border-[#E5E3DF] bg-white">
            <p className="text-[24px] font-bold font-heading text-terracotta">{pendingCount}</p>
            <p className="text-[11px] text-[#6B7280]">Pending</p>
          </div>
          <div className="text-center px-4 py-2 border border-[#E5E3DF] bg-white">
            <p className="text-[24px] font-bold font-heading text-[#3D5A45]">
              {student.attendance?.filter((a: any) => a.status === "present").length || 0}
            </p>
            <p className="text-[11px] text-[#6B7280]">Days Present</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Timetable timetable={timetable} currentHour={currentHour} />
        <AssignmentDropzone assignments={assignments} submissions={student.submissions || []} />
      </div>

      <GradesDashboard grades={student.grades} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4 flex items-center gap-2">
            <Calendar size={16} /> Upcoming Events
          </h3>
          {events.length === 0 ? (
            <p className="text-[14px] text-[#6B7280]">No upcoming events.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((event: any) => (
                <li key={event.id} className="flex items-start gap-3 py-2 border-b border-[#E5E3DF] last:border-0">
                  <div className="w-10 h-10 bg-terracotta text-white text-center flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-[14px] font-bold leading-none">{format(new Date(event.startDate), "d")}</span>
                    <span className="text-[9px] uppercase">{format(new Date(event.startDate), "MMM")}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#1A2B49]">{event.title}</p>
                    <p className="text-[12px] text-[#6B7280]">{event.type}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-[#E5E3DF] p-6">
          <h3 className="font-heading text-[16px] font-semibold text-[#1A2B49] mb-4">
            Announcements
          </h3>
          {announcements.length === 0 ? (
            <p className="text-[14px] text-[#6B7280]">No announcements.</p>
          ) : (
            <ul className="space-y-3">
              {announcements.map((ann: any) => (
                <li key={ann.id} className="py-2 border-b border-[#E5E3DF] last:border-0">
                  <p className="text-[14px] font-medium text-[#1A2B49]">{ann.title}</p>
                  <p className="text-[12px] text-[#6B7280] line-clamp-2 mt-0.5">{ann.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
