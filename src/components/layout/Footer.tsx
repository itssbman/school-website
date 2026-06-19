import Link from "next/link";
import { Mail, Phone, MapPin, Share2, MessageCircle, Camera, PlayCircle } from "lucide-react";
import schoolConfig from "../../../school.config";

export default function Footer() {
  return (
    <footer className="bg-[#FBFBFA] border-t border-[#E5E3DF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-heading text-[20px] font-bold text-[#1A2B49] mb-4">
              {schoolConfig.name}
            </h3>
            <p className="text-[14px] text-[#6B7280] leading-relaxed mb-6">
              A premier educational institution dedicated to academic excellence, character building, and holistic development.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Share2, href: schoolConfig.social.facebook },
                { Icon: MessageCircle, href: schoolConfig.social.twitter },
                { Icon: Camera, href: schoolConfig.social.instagram },
                { Icon: PlayCircle, href: schoolConfig.social.youtube },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 border border-[#E5E3DF] flex items-center justify-center text-[#6B7280] hover:text-terracotta hover:border-terracotta transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-[#1A2B49] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Admissions", href: "/admissions" },
                { label: "Academics", href: "/academics" },
                { label: "News & Events", href: "/news" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
                { label: "Student Portal", href: "/login" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[14px] text-[#6B7280] hover:text-terracotta transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-[#1A2B49] uppercase tracking-wider mb-4">
              Contact Details
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-terracotta mt-0.5 flex-shrink-0" />
                <span className="text-[14px] text-[#6B7280]">
                  {schoolConfig.contact.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-terracotta flex-shrink-0" />
                <span className="text-[14px] text-[#6B7280]">{schoolConfig.contact.phone[0]}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-terracotta flex-shrink-0" />
                <span className="text-[14px] text-[#6B7280]">{schoolConfig.contact.email.info}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold text-[#1A2B49] uppercase tracking-wider mb-4">
              School Hours
            </h4>
            <ul className="space-y-2.5">
              {[
                { day: schoolConfig.contact.hours.weekdaysShort, time: schoolConfig.contact.hours.weekdaysTime },
                { day: schoolConfig.contact.hours.saturdayShort, time: schoolConfig.contact.hours.saturdayTime },
                { day: "Sunday", time: "Closed" },
              ].map((item) => (
                <li key={item.day}>
                  <p className="text-[13px] font-medium text-[#1A2B49]">{item.day}</p>
                  <p className="text-[13px] text-[#6B7280]">{item.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E3DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#6B7280]">
            © {new Date().getFullYear()} {schoolConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-[#6B7280] hover:text-[#1A2B49] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
