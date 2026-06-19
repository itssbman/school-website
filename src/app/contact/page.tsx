"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import schoolConfig from "../../../school.config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { contact } = schoolConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="border-b border-[#E5E3DF] py-12">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">Contact Us</span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2">Get in Touch</h1>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-16">
              <div>
                <h2 className="font-heading text-[24px] font-bold text-[#1A2B49] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: "Address",
                      content: contact.address.full,
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      content: contact.phone.join("\n"),
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      content: `${contact.email.info}\n${contact.email.admissions}`,
                    },
                    {
                      icon: Clock,
                      label: "Office Hours",
                      content: `${contact.hours.weekdays}\n${contact.hours.saturday}`,
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 border border-[#E5E3DF] flex items-center justify-center flex-shrink-0">
                        <item.icon size={16} className="text-terracotta" />
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        {item.content.split("\n").map((line, i) => (
                          <p key={i} className="text-[15px] text-[#1A2B49]">{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border border-[#E5E3DF] overflow-hidden">
                  {contact.address.mapEmbedUrl ? (
                    <iframe
                      src={contact.address.mapEmbedUrl}
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="School location"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[220px] bg-[#F5F4F2] text-center px-6">
                      <svg className="w-8 h-8 text-[#9CA3AF] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-[#6B7280] font-medium">Map loads from</p>
                      <p className="text-xs text-[#9CA3AF] mt-1 font-mono">school.config.ts → contact.mapEmbedUrl</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="font-heading text-[24px] font-bold text-[#1A2B49] mb-6">Send a Message</h2>

                {submitted ? (
                  <div className="p-8 border border-[#3D5A45] bg-[#DCEDE2] text-center">
                    <CheckCircle2 size={32} className="mx-auto text-[#3D5A45] mb-3" />
                    <h3 className="font-heading text-[20px] font-semibold text-[#3D5A45] mb-2">Message Sent!</h3>
                    <p className="text-[14px] text-[#3D5A45]">We&apos;ll get back to you within 2 business days.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                      label="Subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    />
                    <Textarea
                      label="Message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full">
                      Send Message
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
