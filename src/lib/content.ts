import { YouTubeItem, PodcastItem, NoteItem } from "./types";
import youtubeData from "../../content/youtube.json";
import podcastData from "../../content/podcast.json";
import noteData from "../../content/note.json";

export function getYouTubeItems(): YouTubeItem[] {
  return (youtubeData as YouTubeItem[]).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPodcastItems(): PodcastItem[] {
  return (podcastData as PodcastItem[]).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNoteItems(): NoteItem[] {
  return (noteData as NoteItem[]).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedYouTube(): YouTubeItem | undefined {
  return getYouTubeItems().find((item) => item.featured);
}

export function getFeaturedPodcast(): PodcastItem | undefined {
  return getPodcastItems().find((item) => item.featured);
}

export function getFeaturedNote(): NoteItem | undefined {
  return getNoteItems().find((item) => item.featured);
}

export function getYouTubeItemById(id: string): YouTubeItem | undefined {
  return getYouTubeItems().find((item) => item.id === id);
}

export function getRelatedYouTube(
  item: YouTubeItem,
  limit: number = 3
): YouTubeItem[] {
  const allItems = getYouTubeItems().filter((i) => i.id !== item.id);
  const scored = allItems.map((candidate) => {
    let score = 0;
    if (candidate.category === item.category) score += 2;
    const sharedTags = candidate.tags.filter((t) => item.tags.includes(t));
    score += sharedTags.length;
    return { item: candidate, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.item);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getYouTubeItems().forEach((item) => item.tags.forEach((t) => tags.add(t)));
  getPodcastItems().forEach((item) => item.tags.forEach((t) => tags.add(t)));
  getNoteItems().forEach((item) => item.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
