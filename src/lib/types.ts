export interface YouTubeItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  duration: string;
  category: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
}

export interface PodcastItem {
  id: string;
  title: string;
  description: string;
  season: number;
  episode: number;
  duration: string;
  podcastUrl: string;
  tags: string[];
  publishedAt: string;
  featured: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  excerpt: string;
  noteUrl: string;
  thumbnailUrl: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export type ContentItem = YouTubeItem | PodcastItem | NoteItem;

export type MediaType = "youtube" | "podcast" | "journal";
