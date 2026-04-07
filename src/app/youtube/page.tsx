"use client";

import { useState, useMemo } from "react";
import { getYouTubeItems } from "@/lib/content";
import { searchYouTube } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";
import { VideoViewer } from "@/components/VideoViewer";
import type { YouTubeItem } from "@/lib/types";

const allItems = getYouTubeItems();
const allTags = Array.from(new Set(allItems.flatMap((i) => i.tags))).sort();

export default function YouTubePage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<YouTubeItem | null>(null);

  const filtered = useMemo(
    () => searchYouTube(allItems, query, activeTag ?? undefined),
    [query, activeTag]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div className="mb-16 flex flex-col items-start">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
            01
          </span>
          <h1 className="text-5xl md:text-7xl font-headline tracking-widest leading-tight text-on-background opacity-90">
            YouTube
          </h1>
        </div>
        <p className="font-body font-extralight text-base max-w-md text-on-surface-variant leading-relaxed tracking-wide">
          沈黙、空間、そのあいだにある時間の記録。
        </p>
        <div className="mt-8 w-32 h-[1px] bg-outline-variant/30" />
      </div>

      <SearchBar
        onSearch={setQuery}
        onTagFilter={setActiveTag}
        tags={allTags}
        activeTag={activeTag}
        placeholder="Search videos..."
      />

      {filtered.length === 0 ? (
        <p className="text-sm font-light text-on-surface-variant py-24 text-center">
          No results found.
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item)}
              className={`group block text-left cursor-pointer ${
                index === 0
                  ? "col-span-12 md:col-span-8"
                  : "col-span-12 md:col-span-4"
              }`}
            >
              <div className="aspect-video bg-surface-container overflow-hidden relative">
                <img
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
                {item.featured && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-on-primary px-3 py-1 text-[10px] tracking-widest uppercase">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-5xl text-white/80">
                    play_circle
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3
                  className={`font-headline mb-2 tracking-tight ${index === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}
                >
                  {item.title}
                </h3>
                <p className="text-xs font-extralight text-on-surface-variant leading-relaxed mb-2 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-body font-light tracking-widest uppercase text-outline">
                    {item.duration}
                  </span>
                  <span className="text-[10px] font-body font-light tracking-widest uppercase text-outline">
                    {item.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedItem && (
        <VideoViewer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
