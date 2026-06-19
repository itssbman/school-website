"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import schoolConfig from "../../../school.config";

export default function HeroSection() {
  const { hero, stats, accreditations } = schoolConfig;

  return (
    <section className="border-b border-[#E5E3DF] overflow-hidden">

      {/* Two-column hero — min-h-screen so the hero fills the viewport.
          grid-rows-[1fr] gives the single row a definite height (needed for
          next/image fill inside the right column). */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] min-h-screen grid-rows-[1fr]">

          {/* ── Left: Text content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center py-20 lg:py-16 lg:pr-16"
          >
            <div className="mb-4">
              <span className="inline-block text-[12px] font-medium text-terracotta uppercase tracking-widest border-b border-terracotta pb-0.5">
                {hero.eyebrow}
              </span>
            </div>

            <h1 className="font-heading text-[48px] lg:text-[64px] font-bold text-[#1A2B49] leading-[1.1] mb-6">
              {hero.headline[0]}<br />
              <em className="not-italic text-terracotta">{hero.accentWord}</em> of<br />
              {hero.headline[2]}
            </h1>

            <p className="text-[18px] text-[#6B7280] leading-relaxed mb-8 max-w-[480px]">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link href="/admissions">
                <Button variant="primary" size="lg">
                  Apply for Admission
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* ── Right: Hero image (desktop only) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block overflow-hidden"
          >
            {/* Image fills the grid cell. The 1fr row on the grid gives this
                element a definite height, which next/image fill requires. */}
            <Image
              src={hero.heroImageUrl}
              alt={`Students at ${schoolConfig.name}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 0px, 576px"
            />

            {/* Dark overlay for legibility */}
            <div className="absolute inset-0 bg-[#1A2B49]/25 z-10" />

            {/* Stats card pinned to bottom of the image */}
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="bg-white/95 border border-[#E5E3DF] p-5">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: stats.studentsEnrolled, label: "Students Enrolled" },
                    { value: stats.passRate, label: `${stats.examBoard} Pass Rate` },
                    { value: `${stats.yearsOfExcellence}yrs`, label: "Of Excellence" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="font-heading text-[24px] font-bold text-[#1A2B49]">{stat.value}</div>
                      <div className="text-[11px] text-[#6B7280] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Accreditation strip */}
      <div className="border-t border-[#E5E3DF] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-[11px] font-medium text-[#6B7280] uppercase tracking-wider flex-shrink-0 mr-3">
              Accredited by:
            </span>
            {accreditations.map((name) => (
              <span
                key={name}
                className="flex-shrink-0 px-4 py-1.5 border border-[#E5E3DF] text-[12px] font-medium text-[#6B7280]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
