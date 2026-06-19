import Link from "next/link";
import Button from "@/components/ui/Button";
import { Download, ArrowRight } from "lucide-react";
import schoolConfig from "../../../school.config";

export default function AdmissionsCTA() {
  const { admissions } = schoolConfig;

  return (
    <section className="bg-[#1A2B49] border-b border-[#1A2B49]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-12 items-center">
          <div>
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">
              {admissions.academicSession} Session
            </span>
            <h2 className="font-heading text-[48px] font-bold text-white mt-2 mb-4 leading-tight">
              {admissions.ctaHeading}
            </h2>
            <p className="text-[18px] text-white/70 leading-relaxed max-w-[540px]">
              {admissions.ctaBody}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-start">
            <Link href="/admissions">
              <Button variant="primary" size="lg">
                Apply Now
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <a href="/prospectus.pdf" download>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#1A2B49]"
              >
                <Download size={16} className="mr-2" />
                Download Prospectus
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
