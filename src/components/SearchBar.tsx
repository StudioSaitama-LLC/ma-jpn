"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onTagFilter: (tag: string | null) => void;
  tags: string[];
  activeTag: string | null;
  placeholder?: string;
}

export function SearchBar({
  onSearch,
  onTagFilter,
  tags,
  activeTag,
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-16">
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full max-w-md bg-transparent border-b border-outline/30 focus:border-primary py-3 text-sm font-body font-light tracking-wide text-on-surface placeholder:text-outline/50 outline-none transition-colors"
        />
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onTagFilter(null)}
          className={`text-[10px] tracking-widest uppercase px-4 py-2 transition-all ${
            activeTag === null
              ? "bg-primary text-on-primary"
              : "bg-transparent text-primary/60 border border-outline-variant/20 hover:text-on-background"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagFilter(activeTag === tag ? null : tag)}
            className={`text-[10px] tracking-widest uppercase px-4 py-2 transition-all ${
              activeTag === tag
                ? "bg-primary text-on-primary"
                : "bg-transparent text-primary/60 border border-outline-variant/20 hover:text-on-background"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
