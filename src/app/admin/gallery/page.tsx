"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AlertCircle, ImageIcon, Plus, Trash2, X } from "lucide-react";
import api from "@/lib/api";
import DocumentUploadField from "@/components/forms/DocumentUploadField";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";
import type { GalleryCategory, GalleryImage } from "@/types/gallery";

const categories: GalleryCategory[] = ["classroom", "events", "activities", "campus", "placements"];

const toLabel = (category: string) => category.charAt(0).toUpperCase() + category.slice(1);

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<GalleryImage | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const [uploadUrl, setUploadUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("classroom");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const fetchImages = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/gallery/admin/all");
      setImages(res.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not load gallery");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const resetUploadForm = () => {
    setUploadUrl("");
    setCaption("");
    setCategory("classroom");
    setSaveError("");
    setShowUploadForm(false);
  };

  const handleAddImage = async () => {
    if (!uploadUrl) {
      setSaveError("Upload an image first");
      return;
    }
    setIsSaving(true);
    setSaveError("");
    try {
      await api.post("/gallery", {
        imageUrl: uploadUrl,
        thumbnailUrl: uploadUrl,
        caption,
        category,
      });
      resetUploadForm();
      await fetchImages();
    } catch (err: any) {
      setSaveError(err.response?.data?.message || "Could not save image");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (image: GalleryImage) => {
    try {
      await api.put(`/gallery/${image._id}`, { isActive: !image.isActive });
      await fetchImages();
    } catch (err: any) {
      setError(err.response?.data?.message || "Could not update image");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">Manage gallery images shown on the website.</p>
        <button
          onClick={() => setShowUploadForm((v) => !v)}
          className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-bold shadow-sm hover:shadow-glow flex items-center gap-1.5"
        >
          {showUploadForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showUploadForm ? "Cancel" : "Upload Image"}
        </button>
      </div>

      {error && <div className="px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm">{error}</div>}

      {showUploadForm && (
        <div className="bg-white rounded-xl border border-border p-6 space-y-4 max-w-lg">
          {saveError && <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive-light text-destructive text-sm"><AlertCircle className="w-4 h-4" /> {saveError}</div>}
          <DocumentUploadField
            label="Image"
            value={uploadUrl}
            onChange={setUploadUrl}
            uploadType="image"
            folder="webigeeks/gallery"
            accept="image/jpeg,image/png,image/webp"
          />
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GalleryCategory)}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{toLabel(c)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">Caption</label>
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="e.g. Data Science Batch in Session"
            />
          </div>
          <button
            onClick={handleAddImage}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl gradient-primary text-white text-sm font-bold shadow-md hover:shadow-glow disabled:opacity-50 flex items-center gap-2"
          >
            {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
            Add to Gallery
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="bg-white rounded-xl border border-border p-16 text-center text-text-muted">Loading gallery...</div>
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-6">
          <div className="border-2 border-dashed border-border rounded-xl p-16 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 text-text-muted opacity-30" />
            <p className="font-medium text-text-muted">No images uploaded</p>
            <p className="text-xs text-text-muted mt-1">Click &ldquo;Upload Image&rdquo; to add photos.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="bg-white rounded-xl border border-border overflow-hidden group">
              <div className="relative aspect-square">
                <Image src={img.thumbnailUrl || img.imageUrl} alt={img.caption || toLabel(img.category)} fill sizes="200px" className="object-cover" />
                {!img.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Inactive</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-medium text-text-primary truncate">{img.caption || toLabel(img.category)}</p>
                <p className="text-[11px] text-text-muted">{toLabel(img.category)}</p>
                <div className="flex items-center justify-between pt-1">
                  <button onClick={() => toggleActive(img)} className="text-[11px] font-semibold text-primary hover:underline">
                    {img.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button onClick={() => setDeleteTarget(img)} className="p-1 rounded hover:bg-gray-100 text-destructive" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Image"
          message="This permanently removes this image from the gallery."
          onClose={() => setDeleteTarget(null)}
          onConfirm={async () => {
            await api.delete(`/gallery/${deleteTarget._id}`);
            setDeleteTarget(null);
            await fetchImages();
          }}
        />
      )}
    </motion.div>
  );
}
