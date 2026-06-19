"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Bell, Search, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { useSession } from "next-auth/react";

interface TopBarProps {
  title: string;
  onMobileMenuToggle: () => void;
  unreadCount?: number;
}

export default function TopBar({ title, onMobileMenuToggle, unreadCount = 0 }: TopBarProps) {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-[#E5E3DF] flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
      <button
        onClick={onMobileMenuToggle}
        className="md:hidden p-2 text-[#6B7280] hover:text-[#1A2B49]"
      >
        <Menu size={20} />
      </button>

      <h1 className="font-heading text-[18px] font-semibold text-[#1A2B49] flex-1 hidden md:block">
        {title}
      </h1>

      <div className="flex items-center gap-2 ml-auto">
        {searchOpen ? (
          <div className="flex items-center border border-[#E5E3DF] rounded bg-white">
            <Search size={15} className="ml-3 text-[#6B7280]" />
            <input
              autoFocus
              placeholder="Search..."
              className="px-3 py-1.5 text-[14px] text-[#1A2B49] bg-transparent w-48 outline-none"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="pr-3 text-[#6B7280] hover:text-[#1A2B49]"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-[#6B7280] hover:text-[#1A2B49] transition-colors"
          >
            <Search size={18} />
          </button>
        )}

        <Link
          href="/portal/notifications"
          className="relative p-2 text-[#6B7280] hover:text-[#1A2B49] transition-colors"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-terracotta text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        <div className="ml-1">
          <Avatar
            src={session?.user?.avatar}
            name={session?.user?.name || "User"}
            size="sm"
          />
        </div>
      </div>
    </header>
  );
}
