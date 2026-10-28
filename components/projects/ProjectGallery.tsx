"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/projects";

interface ProjectGalleryProps {
  images: GalleryImage[];
  projectTitle: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const imagesLength = images?.length ?? 0;

  const handlePrev = useCallback(() => {
    if (imagesLength === 0) return;
    setSelectedIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  }, [imagesLength]);

  const handleNext = useCallback(() => {
    if (imagesLength === 0) return;
    setSelectedIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  }, [imagesLength]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  // Keyboard navigation & scroll-locking for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    // Pause Lenis smooth scroll while lightbox is active
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.stop();
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Safety fallback if images array is empty
  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="w-full flex flex-col gap-3">
      {/* ── Main Showcase Frame ── */}
      <div
        className="w-full flex flex-col"
        style={{
          border: "1px solid var(--step-3)",
          backgroundColor: "var(--step-1)",
        }}
      >
        {/* Frame Topbar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            borderBottom: "1px solid var(--step-3)",
            backgroundColor: "rgba(18, 18, 18, 0.6)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2 h-2"
              style={{ backgroundColor: "var(--step-5)" }}
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--step-6)" }}
            >
              UI Showcase // Screen {(selectedIndex + 1).toString().padStart(2, "0")} of{" "}
              {images.length.toString().padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-colors px-3 py-1.5 min-h-[34px]"
            style={{
              color: "var(--step-5)",
              border: "1px solid var(--step-3)",
              backgroundColor: "var(--step-1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--off-white)";
              e.currentTarget.style.borderColor = "var(--step-4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--step-5)";
              e.currentTarget.style.borderColor = "var(--step-3)";
            }}
            aria-label="Expand image to full screen"
          >
            <Maximize2 size={12} />
            <span>Expand</span>
          </button>
        </div>

        {/* Featured Image Display with Animated Crossfade */}
        <div
          className="relative w-full aspect-[16/9] cursor-zoom-in overflow-hidden group"
          onClick={() => setIsLightboxOpen(true)}
          style={{ backgroundColor: "#0d0d0d" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage.src}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                style={{
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none flex items-center justify-center">
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5"
              style={{
                backgroundColor: "rgba(18, 18, 18, 0.85)",
                border: "1px solid var(--step-4)",
                color: "var(--off-white)",
              }}
            >
              Click to view full screen
            </span>
          </div>
        </div>

        {/* Caption Bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3"
          style={{
            borderTop: "1px solid var(--step-3)",
            backgroundColor: "rgba(18, 18, 18, 0.4)",
          }}
        >
          <p
            className="font-mono text-[11px] leading-relaxed tracking-wide"
            style={{ color: "var(--step-7)" }}
          >
            {currentImage.caption || currentImage.alt}
          </p>
          <span
            className="font-mono text-[10px] tracking-widest uppercase shrink-0"
            style={{ color: "var(--step-5)" }}
          >
            {projectTitle}
          </span>
        </div>
      </div>

      {/* ── Thumbnail Strip (shown when multiple images exist) ── */}
      {images.length > 1 && (
        <div className="w-full flex items-center gap-3 overflow-x-auto pb-2 pt-1 touch-pan-x select-none">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${img.src}-${idx}`}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className="relative aspect-[16/9] w-24 sm:w-28 shrink-0 overflow-hidden transition-all duration-200 text-left min-h-[44px]"
                style={{
                  border: isSelected
                    ? "1px solid var(--off-white)"
                    : "1px solid var(--step-3)",
                  opacity: isSelected ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.borderColor = "var(--step-4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.borderColor = "var(--step-3)";
                  }
                }}
                aria-label={`View screenshot ${idx + 1}: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="120px"
                  style={{
                    objectFit: "cover",
                  }}
                />
                <span
                  className="absolute bottom-0 right-0 font-mono text-[9px] px-1 py-0.5"
                  style={{
                    backgroundColor: "rgba(18, 18, 18, 0.9)",
                    color: isSelected ? "var(--off-white)" : "var(--step-6)",
                  }}
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex flex-col justify-between p-4 sm:p-8 cursor-zoom-out"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.94)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            {/* Lightbox Header */}
            <div
              className="w-full flex items-center justify-between pb-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
              style={{ borderBottom: "1px solid var(--step-3)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--off-white)" }}
                >
                  {projectTitle}
                </span>
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: "var(--step-5)" }}
                >
                  [ {(selectedIndex + 1).toString().padStart(2, "0")} /{" "}
                  {images.length.toString().padStart(2, "0")} ]
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 transition-colors min-h-[36px]"
                style={{
                  border: "1px solid var(--step-3)",
                  color: "var(--step-6)",
                  backgroundColor: "var(--step-1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--off-white)";
                  e.currentTarget.style.borderColor = "var(--off-white)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--step-6)";
                  e.currentTarget.style.borderColor = "var(--step-3)";
                }}
                aria-label="Close fullscreen modal"
              >
                <span>Close [Esc]</span>
                <X size={13} />
              </button>
            </div>

            {/* Lightbox Body: Image + Nav Arrows */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-4 z-10 p-3 sm:p-4 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(18, 18, 18, 0.85)",
                    border: "1px solid var(--step-3)",
                    color: "var(--off-white)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--off-white)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--step-3)";
                  }}
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Main Expanded Image */}
              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative w-full max-w-6xl max-h-[75vh] aspect-[16/9] overflow-hidden cursor-default touch-pan-y"
                style={{
                  border: "1px solid var(--step-3)",
                  backgroundColor: "#000000",
                }}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-4 z-10 p-3 sm:p-4 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  style={{
                    backgroundColor: "rgba(18, 18, 18, 0.85)",
                    border: "1px solid var(--step-3)",
                    color: "var(--off-white)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--off-white)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--step-3)";
                  }}
                  aria-label="Next screenshot"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Lightbox Footer Caption */}
            <div
              className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
              style={{ borderTop: "1px solid var(--step-3)" }}
            >
              <p
                className="font-mono text-[11px] tracking-wide"
                style={{ color: "var(--step-7)" }}
              >
                {currentImage.caption || currentImage.alt}
              </p>
              <div
                className="font-mono text-[10px] tracking-widest uppercase flex items-center gap-4"
                style={{ color: "var(--step-5)" }}
              >
                <span>Swipe / ← →</span>
                <span>ESC to Exit</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
