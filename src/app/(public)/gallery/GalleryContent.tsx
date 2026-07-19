"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Classroom", "Events", "Activities", "Campus", "Placements"];

// Placeholder gallery data with gradient-based placeholders
const galleryItems = [
  { id: 1, category: "Classroom", caption: "Data Science Batch in Session", gradient: "from-violet-400 to-purple-600" },
  { id: 2, category: "Events", caption: "Annual Tech Fest 2024", gradient: "from-amber-400 to-orange-600" },
  { id: 3, category: "Placements", caption: "Campus Placement Drive", gradient: "from-emerald-400 to-teal-600" },
  { id: 4, category: "Campus", caption: "Modern Computer Lab", gradient: "from-sky-400 to-blue-600" },
  { id: 5, category: "Activities", caption: "Hackathon Competition", gradient: "from-rose-400 to-pink-600" },
  { id: 6, category: "Classroom", caption: "Python Workshop", gradient: "from-blue-400 to-indigo-600" },
  { id: 7, category: "Events", caption: "Guest Lecture by Industry Expert", gradient: "from-cyan-400 to-teal-600" },
  { id: 8, category: "Placements", caption: "Students with Offer Letters", gradient: "from-green-400 to-emerald-600" },
  { id: 9, category: "Campus", caption: "Student Lounge Area", gradient: "from-purple-400 to-violet-600" },
  { id: 10, category: "Activities", caption: "Team Building Workshop", gradient: "from-orange-400 to-red-600" },
  { id: 11, category: "Classroom", caption: "MERN Stack Live Project", gradient: "from-teal-400 to-cyan-600" },
  { id: 12, category: "Events", caption: "Certificate Distribution Ceremony", gradient: "from-yellow-400 to-amber-600" },
];

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };
  const prevImage = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Camera className="w-4 h-4 text-accent" />
              Our Gallery
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Life at <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">WebiGeeks</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              A glimpse into our classrooms, events, and student activities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-white border-b border-border sticky top-[72px] z-30">
        <div className="container-custom">
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-text-secondary hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => openLightbox(i)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                >
                  {/* Gradient placeholder */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white/30" />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                    <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                      <p className="text-white text-sm font-semibold">{item.caption}</p>
                      <p className="text-white/70 text-xs">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
              <X className="w-8 h-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white/80 hover:text-white">
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white/80 hover:text-white">
              <ChevronRight className="w-10 h-10" />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full mx-4">
              <div className={`aspect-video rounded-2xl bg-gradient-to-br ${filtered[lightboxIndex].gradient} flex items-center justify-center`}>
                <Camera className="w-20 h-20 text-white/30" />
              </div>
              <p className="text-white text-center mt-4 font-semibold">
                {filtered[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
