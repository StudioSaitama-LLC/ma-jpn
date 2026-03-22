"use client";

import { useState, useMemo } from "react";
import { getPodcastItems } from "@/lib/content";
import { searchPodcast } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";

const allItems = getPodcastItems();
const allTags = Array.from(new Set(allItems.flatMap((i) => i.tags))).sort();

export default function PodcastPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => searchPodcast(allItems, query, activeTag ?? undefined),
    [query, activeTag]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div className="mb-16 flex flex-col items-start">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
            02
          </span>
          <h1 className="text-5xl md:text-7xl font-headline tracking-widest leading-tight text-on-background opacity-90">
            Podcast
          </h1>
        </div>
        <p className="font-body font-extralight text-base max-w-md text-on-surface-variant leading-relaxed tracking-wide">
          Conversations on silence, creativity, and the philosophy of space.
        </p>
        <div className="mt-8 w-32 h-[1px] bg-outline-variant/30" />
      </div>

      <SearchBar
        onSearch={setQuery}
        onTagFilter={setActiveTag}
        tags={allTags}
        activeTag={activeTag}
        placeholder="Search episodes..."
      />

      {filtered.length === 0 ? (
        <p className="text-sm font-light text-on-surface-variant py-24 text-center">
          No results found.
        </p>
      ) : (
        <div className="flex flex-col gap-0">
          {filtered.map((item) => (
            <a
              key={item.id}
              href={item.podcastUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-outline-variant/15 py-10 first:pt-0"
            >
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-12 md:col-span-1">
                  <span className="material-symbols-outlined text-3xl text-primary/30 group-hover:text-primary transition-colors">
                    graphic_eq
                  </span>
                </div>
                <div className="col-span-12 md:col-span-2">
                  <span className="text-[10px] tracking-widest uppercase text-primary/50 block">
                    S{String(item.season).padStart(2, "0")} E
                    {String(item.episode).padStart(2, "0")}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-headline text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-extralight text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 flex md:flex-col items-center md:items-end gap-4">
                  <span className="text-xs font-light text-on-surface-variant">
                    {item.duration}
                  </span>
                  <span className="text-[10px] tracking-widest uppercase text-primary/40">
                    {item.publishedAt}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
