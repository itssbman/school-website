"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { format, isPast } from "date-fns";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowLeft, Upload, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

interface Props {
  assignment: any;
  studentId: string;
}

export default function AssignmentSubmitClient({ assignment, studentId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(assignment.submissions?.length > 0);

  const isOverdue = isPast(new Date(assignment.dueDate));

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0] || null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc", ".docx"],
      "image/*": [],
    },
  });

  const handleSubmit = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assignmentId", assignment.id);
      const res = await fetch("/api/assignments/submit", {
        method: "POST",
        body: formData,
      });
      if (res.ok) setSubmitted(true);
    } catch {}
    setUploading(false);
  };

  return (
    <div className="max-w-2xl">
      <Link
        href="/portal/student"
        className="inline-flex items-center gap-1 text-[13px] text-[#6B7280] hover:text-[var(--accent)] mb-6"
      >
        <ArrowLeft size={13} /> Back to Dashboard
      </Link>

      <div className="bg-white border border-[#E5E3DF] p-8">
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#E5E3DF]">
          <div>
            <h1 className="font-heading text-[28px] font-bold text-[#1A2B49]">{assignment.title}</h1>
            <p className="text-[14px] text-[#6B7280] mt-1">
              Set by {assignment.teacher?.user?.name || "Teacher"} · {assignment.classId}
            </p>
          </div>
          <Badge
            variant={isOverdue ? "danger" : "warning"}
            size="md"
          >
            {isOverdue ? "Overdue" : "Pending"}
          </Badge>
        </div>

        <div className="mb-6">
          <h3 className="text-[13px] font-medium text-[#6B7280] uppercase tracking-wider mb-2">Instructions</h3>
          <p className="text-[15px] text-[#1A2B49] leading-relaxed">{assignment.description}</p>
        </div>

        <div className="flex items-center gap-2 mb-6 text-[14px]">
          <AlertTriangle size={15} className={isOverdue ? "text-[var(--accent)]" : "text-[#92400E]"} />
          <span className={isOverdue ? "text-[var(--accent)]" : "text-[#92400E]"}>
            Due: {format(new Date(assignment.dueDate), "EEEE, d MMMM yyyy 'at' h:mm a")}
          </span>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center py-10 text-center border border-[#3D5A45] bg-[#DCEDE2]">
            <CheckCircle2 size={36} className="text-[#3D5A45] mb-3" />
            <h3 className="font-heading text-[20px] font-semibold text-[#3D5A45] mb-1">
              Assignment Submitted
            </h3>
            <p className="text-[14px] text-[#3D5A45]">
              Submitted on {format(new Date(assignment.submissions[0]?.submittedAt || new Date()), "d MMM yyyy")}
            </p>
            {assignment.submissions[0]?.fileUrl && (
              <a
                href={assignment.submissions[0].fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1 text-[13px] text-[#3D5A45] hover:underline"
              >
                <FileText size={13} /> View submitted file
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-terracotta bg-terracotta/5"
                  : "border-[#E5E3DF] hover:border-[#1A2B49]/40"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div>
                  <FileText size={32} className="mx-auto text-[#3D5A45] mb-2" />
                  <p className="text-[15px] font-medium text-[#3D5A45]">{file.name}</p>
                  <p className="text-[12px] text-[#6B7280] mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · Click to change
                  </p>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto text-[#6B7280] mb-2" />
                  <p className="text-[15px] font-medium text-[#1A2B49]">
                    {isDragActive ? "Drop file here" : "Drag & drop your file here"}
                  </p>
                  <p className="text-[13px] text-[#6B7280] mt-1">or click to browse</p>
                  <p className="text-[11px] text-[#6B7280]/70 mt-2">Accepts PDF, DOC, DOCX, Images</p>
                </div>
              )}
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              loading={uploading}
              disabled={!file}
              className="w-full"
            >
              Submit Assignment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
