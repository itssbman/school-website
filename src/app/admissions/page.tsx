"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  { number: "01", title: "Submit Application", desc: "Complete the online application form with personal and academic details." },
  { number: "02", title: "Document Submission", desc: "Upload birth certificate, previous school results, and passport photographs." },
  { number: "03", title: "Entrance Assessment", desc: "Sit for our age-appropriate assessment in English, Mathematics, and General Knowledge." },
  { number: "04", title: "Interview", desc: "Shortlisted candidates are invited for a parent-child interview with our admissions team." },
  { number: "05", title: "Offer Letter", desc: "Successful candidates receive an official admission offer with registration instructions." },
];

const requirements = [
  "Birth certificate (original + copy)",
  "Last school report card (2 most recent terms)",
  "2 recent passport photographs",
  "Recommendation letter from previous school principal",
  "Completed medical form",
  "Proof of immunisation",
];

export default function AdmissionsPage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    class: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {}
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Admissions</span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2 mb-4 max-w-xl">
              Begin Your Journey Here
            </h1>
            <p className="text-[18px] text-[#6B7280] max-w-2xl">
              We admit students with intellectual curiosity, strong character, and the drive to excel. Applications for 2025/2026 are now open.
            </p>
          </div>
        </section>

        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mb-10">
              Admissions Process
            </h2>
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-8 py-6 border-b border-[#E5E3DF] last:border-0">
                  <span className="font-heading text-[48px] font-bold text-[#E5E3DF] flex-shrink-0 leading-none">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold text-[#1A2B49] mb-1">{step.title}</h3>
                    <p className="text-[15px] text-[#6B7280]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#E5E3DF] py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mb-6">
                  Required Documents
                </h2>
                <ul className="space-y-3">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#3D5A45] mt-0.5 flex-shrink-0" />
                      <span className="text-[15px] text-[#6B7280]">{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-5 border border-[#E5E3DF] bg-[#FBFBFA]">
                  <h4 className="font-semibold text-[#1A2B49] mb-2">Application Deadlines</h4>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">JSS1 Applications</span>
                      <span className="font-medium text-[#1A2B49]">Feb 28, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">SS1 Applications</span>
                      <span className="font-medium text-[#1A2B49]">Mar 15, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B7280]">Other Classes</span>
                      <span className="font-medium text-[#1A2B49]">Rolling Basis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-[28px] font-bold text-[#1A2B49] mb-6">
                  Apply Online
                </h2>

                {submitted ? (
                  <div className="p-8 border border-[#3D5A45] bg-[#DCEDE2] text-center">
                    <CheckCircle2 size={32} className="mx-auto text-[#3D5A45] mb-3" />
                    <h3 className="font-heading text-[20px] font-semibold text-[#3D5A45] mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-[14px] text-[#3D5A45]">
                      Thank you. Our admissions team will contact you within 5 business days.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="First Name"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      />
                      <Input
                        label="Last Name"
                        required
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      />
                    </div>
                    <Input
                      label="Parent/Guardian Email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    <div>
                      <label className="block text-[13px] font-medium text-[#1A2B49] mb-1.5">
                        Class Applying For
                      </label>
                      <select
                        value={form.class}
                        onChange={(e) => setForm({ ...form, class: e.target.value })}
                        required
                        className="w-full px-3 py-2.5 text-[14px] border border-[#E5E3DF] rounded focus:outline-none focus:border-[#1A2B49] text-[#1A2B49]"
                      >
                        <option value="">Select class...</option>
                        {["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <Textarea
                      label="Additional Notes (optional)"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={3}
                    />
                    <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
                      Submit Application
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
