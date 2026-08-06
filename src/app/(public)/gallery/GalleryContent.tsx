"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
const Hero3DBackground = dynamic(() => import("@/components/three/Hero3DBackground"), { ssr: false });
import type { GalleryImage } from "@/types/gallery";

const categories = ["All", "Classroom", "Events", "Activities", "Campus", "Placements"];

const toCategoryLabel = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1);

export default function GalleryContent({ images }: { images: GalleryImage[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === "All"
    ? images
    : images.filter((item) => toCategoryLabel(item.category) === selectedCategory);

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
        <Hero3DBackground variant="compact" />
        <div className="container-custom relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Camera className="w-4 h-4 text-accent" />
              Our Gallery
            </span>
            <h1 className="heading-hero mb-4">
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
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Camera className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-text-primary">No Photos Yet</h3>
              <p className="text-text-secondary">Check back soon for photos from our campus and events.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filtered.map((item, i) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={item.thumbnailUrl || item.imageUrl}
                      alt={item.caption || toCategoryLabel(item.category)}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="text-white text-sm font-semibold">{item.caption}</p>
                        <p className="text-white/70 text-xs">{toCategoryLabel(item.category)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center"
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
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <Image
                  src={filtered[lightboxIndex].imageUrl}
                  alt={filtered[lightboxIndex].caption || toCategoryLabel(filtered[lightboxIndex].category)}
                  fill
                  sizes="768px"
                  className="object-contain bg-black"
                />
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
