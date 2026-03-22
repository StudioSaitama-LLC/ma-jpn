import { YouTubeItem, PodcastItem, NoteItem } from "./types";

export function searchYouTube(
  items: YouTubeItem[],
  query: string,
  tag?: string
): YouTubeItem[] {
  return filterItems(items, query, tag, (item) => [
    item.title,
    item.description,
    item.category,
    ...item.tags,
  ]);
}

export function searchPodcast(
  items: PodcastItem[],
  query: string,
  tag?: string
): PodcastItem[] {
  return filterItems(items, query, tag, (item) => [
    item.title,
    item.description,
    ...item.tags,
  ]);
}

export function searchNotes(
  items: NoteItem[],
  query: string,
  tag?: string
): NoteItem[] {
  return filterItems(items, query, tag, (item) => [
    item.title,
    item.excerpt,
    item.category,
    ...item.tags,
  ]);
}

function filterItems<T extends { tags: string[] }>(
  items: T[],
  query: string,
  tag: string | undefined,
  getSearchableFields: (item: T) => string[]
): T[] {
  let result = items;

  if (tag) {
    result = result.filter((item) => item.tags.includes(tag));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    result = result.filter((item) =>
      getSearchableFields(item).some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }

  return result;
}
