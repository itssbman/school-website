"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&auto=format&fit=crop&q=80", caption: "Annual Science Fair", col: "col-span-1 row-span-2" },
  { id: 2, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80", caption: "Sports Day 2024", col: "col-span-1 row-span-1" },
  { id: 3, src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&auto=format&fit=crop&q=80", caption: "Graduation Ceremony", col: "col-span-1 row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80", caption: "Cultural Night", col: "col-span-1 row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&auto=format&fit=crop&q=80", caption: "Library & Study Hall", col: "col-span-1 row-span-1" },
];

export default function GalleryPreview() {
  return (
    <section className="border-b border-[#E5E3DF]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">School Life</span>
            <h2 className="font-heading text-[32px] font-bold text-[#1A2B49] mt-1">Moments That Matter</h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-1 text-[13px] font-medium text-[#6B7280] hover:text-terracotta transition-colors"
          >
            View Full Gallery <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[480px]">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={`group relative overflow-hidden ${i === 0 ? "row-span-2" : ""}`}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url('${img.src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-[#1A2B49]/0 group-hover:bg-[#1A2B49]/40 transition-all duration-300 flex items-end">
                <span className="text-white text-[13px] font-medium px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
