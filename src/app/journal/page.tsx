"use client";

import { useState, useMemo } from "react";
import { getNoteItems } from "@/lib/content";
import { searchNotes } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";

const allItems = getNoteItems();
const allTags = Array.from(new Set(allItems.flatMap((i) => i.tags))).sort();

export default function JournalPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => searchNotes(allItems, query, activeTag ?? undefined),
    [query, activeTag]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      <div className="mb-16 flex flex-col items-start">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
            03
          </span>
          <h1 className="text-5xl md:text-7xl font-headline tracking-widest leading-tight text-on-background opacity-90">
            Journal
          </h1>
        </div>
        <p className="font-body font-extralight text-base max-w-md text-on-surface-variant leading-relaxed tracking-wide">
          Fragments, essays, and observations on the quiet architecture of daily
          life.
        </p>
        <div className="mt-8 w-32 h-[1px] bg-outline-variant/30" />
      </div>

      <SearchBar
        onSearch={setQuery}
        onTagFilter={setActiveTag}
        tags={allTags}
        activeTag={activeTag}
        placeholder="Search notes..."
      />

      {filtered.length === 0 ? (
        <p className="text-sm font-light text-on-surface-variant py-24 text-center">
          No results found.
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-8">
          {filtered.map((item, index) => {
            if (item.thumbnailUrl) {
              return (
                <a
                  key={item.id}
                  href={item.noteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative overflow-hidden group block min-h-[350px] ${
                    index === 0 ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"
                  }`}
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    src={item.thumbnailUrl}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="font-headline text-white text-xl md:text-2xl mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-white/70 text-[10px] uppercase tracking-widest">
                        {item.category}
                      </span>
                      <span className="text-white/50 text-[10px] uppercase tracking-widest">
                        {item.readTime} Read
                      </span>
                    </div>
                  </div>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.noteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-surface-container-low p-8 md:p-10 flex flex-col justify-between block min-h-[300px] group ${
                  index === 0 ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface/50 mb-4 block">
                    {item.id.replace("note-", "Note #")}
                  </span>
                  <h3 className="text-xl md:text-2xl font-headline leading-snug mb-4 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body font-extralight text-sm leading-relaxed opacity-70 line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40 mt-8">
                  <span>{item.publishedAt.replace(/-/g, ".")}</span>
                  <span>{item.readTime} Read</span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
