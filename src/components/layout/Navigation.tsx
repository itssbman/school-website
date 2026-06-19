"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import schoolConfig from "../../../school.config";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-[#FBFBFA] transition-all duration-200 ${
          scrolled ? "border-b border-[#E5E3DF]" : ""
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0">
              <span className="font-heading text-[20px] font-bold text-[#1A2B49]">
                {schoolConfig.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] font-medium transition-colors duration-150 ${
                    pathname === link.href
                      ? "text-terracotta"
                      : "text-[#1A2B49] hover:text-terracotta"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="primary" size="sm">
                  Portal Login
                </Button>
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-[#1A2B49]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FBFBFA] flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-[#E5E3DF]">
              <span className="font-heading text-[20px] font-bold text-[#1A2B49]">
                {schoolConfig.name}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#1A2B49]"
              >
                <X size={22} />
              </button>
            </div>
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="flex flex-col p-6 gap-1"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 px-4 text-[18px] font-medium border-b border-[#E5E3DF] ${
                    pathname === link.href ? "text-terracotta" : "text-[#1A2B49]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6">
                <Link href="/login">
                  <Button variant="primary" size="lg" className="w-full">
                    Portal Login
                  </Button>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
