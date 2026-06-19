"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const categories = ["All", "Academic", "Sports", "Cultural", "Graduation", "Facilities"];

const galleryItems = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80", caption: "Annual Science Exhibition", category: "Academic" },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80", caption: "Inter-House Sports Day", category: "Sports" },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80", caption: "Class of 2024 Graduation", category: "Graduation" },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80", caption: "Annual Cultural Night", category: "Cultural" },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80", caption: "New Library Wing", category: "Facilities" },
  { id: 6, imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80", caption: "Basketball Championships", category: "Sports" },
  { id: 7, imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&auto=format&fit=crop&q=80", caption: "Debate Competition", category: "Academic" },
  { id: 8, imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80", caption: "Graduation Ceremony 2023", category: "Graduation" },
  { id: 9, imageUrl: "https://images.unsplash.com/photo-1564979395537-f50a57f6fd6d?w=800&auto=format&fit=crop&q=80", caption: "Drama & Performing Arts", category: "Cultural" },
  { id: 10, imageUrl: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&auto=format&fit=crop&q=80", caption: "STEM Innovation Lab", category: "Facilities" },
  { id: 11, imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80", caption: "Football Field", category: "Sports" },
  { id: 12, imageUrl: "https://images.unsplash.com/photo-1522661067900-ab829854a57f?w=800&auto=format&fit=crop&q=80", caption: "Award Presentation Day", category: "Academic" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <section className="border-b border-[#E5E3DF] py-12">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <span className="text-[12px] font-medium text-terracotta uppercase tracking-widest">School Life</span>
            <h1 className="font-heading text-[48px] font-bold text-[#1A2B49] mt-2">Photo Gallery</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 text-[13px] font-medium border transition-colors ${
                    activeCategory === cat
                      ? "bg-[#1A2B49] text-white border-[#1A2B49]"
                      : "border-[#E5E3DF] text-[#6B7280] hover:border-[#1A2B49] hover:text-[#1A2B49]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer"
                >
                  <div
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${item.imageUrl}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-[#1A2B49]/0 group-hover:bg-[#1A2B49]/50 transition-all duration-300 flex items-end">
                    <span className="px-3 py-2.5 text-white text-[13px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.caption}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-2 py-0.5 bg-terracotta text-white text-[10px] font-medium">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
