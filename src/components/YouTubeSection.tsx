"use client";

import { useState } from "react";
import Link from "next/link";
import type { YouTubeItem } from "@/lib/types";
import { VideoViewer } from "./VideoViewer";

interface YouTubeSectionProps {
  featured: YouTubeItem | null;
  subItems: YouTubeItem[];
}

export function YouTubeSection({ featured, subItems }: YouTubeSectionProps) {
  const [selectedItem, setSelectedItem] = useState<YouTubeItem | null>(null);

  return (
    <section className="mb-32">
      <div className="flex items-baseline justify-between mb-12">
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
            01
          </span>
          <h2 className="text-2xl font-headline tracking-widest uppercase">
            YouTube
          </h2>
        </div>
        <Link
          href="/youtube"
          className="text-xs tracking-widest uppercase text-primary/50 hover:text-on-background transition-colors border-b border-primary/20 pb-1"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-12 gap-8 md:gap-12">
        {featured && (
          <button
            type="button"
            onClick={() => setSelectedItem(featured)}
            className="col-span-12 md:col-span-8 group relative block text-left cursor-pointer"
          >
            <div className="aspect-video bg-surface-container overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                src={featured.thumbnailUrl}
                alt={featured.title}
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <span className="bg-primary text-on-primary px-4 py-1 text-[10px] tracking-widest uppercase">
                  Latest Release
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="material-symbols-outlined text-6xl text-white/80">
                  play_circle
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-headline mb-2 tracking-tight">
                  {featured.title}
                </h3>
                <p className="text-sm font-extralight text-on-surface-variant max-w-lg">
                  {featured.description}
                </p>
              </div>
              <span className="material-symbols-outlined text-3xl font-extralight shrink-0 ml-4">
                play_circle
              </span>
            </div>
          </button>
        )}

        <div className="col-span-12 md:col-span-4 flex flex-col gap-8 md:gap-12">
          {subItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className="group text-left cursor-pointer"
            >
              <div className="aspect-video bg-surface-container overflow-hidden mb-4 relative">
                <img
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-4xl text-white/80">
                    play_circle
                  </span>
                </div>
              </div>
              <h4 className="font-headline text-lg mb-1 tracking-wide">
                {item.title}
              </h4>
              <p className="text-[10px] font-body font-light tracking-widest uppercase text-outline">
                {item.duration} {item.duration && item.category ? "—" : ""}{" "}
                {item.category}
              </p>
            </button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <VideoViewer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}
