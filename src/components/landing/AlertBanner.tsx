"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import schoolConfig from "../../../school.config";

interface AlertBannerProps {
  notices?: { id: string; title: string; body: string }[];
}

export default function AlertBanner({ notices = [] }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const notice = notices[0] ?? schoolConfig.alertBanner;

  return (
    <div className="bg-[#1A2B49] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          <p className="text-[12px] flex-1 truncate">
            <span className="font-semibold mr-2">{notice.title}:</span>
            {notice.body}
          </p>
          <div className="flex items-center gap-4 ml-6 flex-shrink-0">
            <Link
              href="/login"
              className="text-[12px] text-white/70 hover:text-white transition-colors hidden sm:block"
            >
              Portal Login
            </Link>
            <Link
              href="/admissions"
              className="text-[12px] text-white/70 hover:text-white transition-colors hidden sm:block"
            >
              Admissions
            </Link>
            <Link
              href="/contact"
              className="text-[12px] text-white/70 hover:text-white transition-colors hidden sm:block"
            >
              Contact
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-white/60 hover:text-white transition-colors ml-2"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
