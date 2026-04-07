"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { YouTubeItem } from "@/lib/types";

function getEmbedUrl(youtubeUrl: string): string {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];
  for (const pattern of patterns) {
    const match = youtubeUrl.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return youtubeUrl;
}

interface VideoViewerProps {
  item: YouTubeItem;
  onClose: () => void;
}

export function VideoViewer({ item, onClose }: VideoViewerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return createPortal(
    <div
      className="video-viewer-overlay fixed inset-0 z-[200] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-on-surface/90" />

      {/* Content */}
      <div className="video-viewer-content relative z-10 w-full max-w-5xl mx-6 md:mx-12">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-surface/60 hover:text-surface transition-colors"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* YouTube Embed */}
        <div className="aspect-video w-full bg-black">
          <iframe
            src={getEmbedUrl(item.youtubeUrl)}
            title={item.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Info */}
        <div className="mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h2 className="font-headline text-2xl md:text-3xl text-surface tracking-tight mb-2">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-sm font-extralight text-surface/60 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-3">
              {item.duration && (
                <span className="text-[10px] tracking-widest uppercase text-surface/40">
                  {item.duration}
                </span>
              )}
              {item.category && (
                <span className="text-[10px] tracking-widest uppercase text-surface/40">
                  {item.category}
                </span>
              )}
            </div>
          </div>

          <Link
            href={`/youtube/${item.id}`}
            className="shrink-0 text-xs tracking-widest uppercase text-surface/60 hover:text-surface border-b border-surface/20 hover:border-surface/60 pb-1 transition-all"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
