"use client";

import Link from "next/link";
import schoolConfig from "../../../school.config";

export default function DemoBanner() {
  return (
    <div className="w-full bg-[#1A2B49] px-4 lg:px-6 py-2 flex items-center justify-between gap-4 flex-shrink-0 z-40">
      <p className="text-[13px] text-white/90 truncate">
        🎓 <span className="font-semibold">Demo Mode</span>
        {" — "}This is a preview of {schoolConfig.name}. Contact us to deploy for your school.
      </p>
      <Link
        href="/contact"
        className="text-[12px] font-semibold text-terracotta whitespace-nowrap hover:underline flex-shrink-0"
      >
        Buy Now →
      </Link>
    </div>
  );
}
