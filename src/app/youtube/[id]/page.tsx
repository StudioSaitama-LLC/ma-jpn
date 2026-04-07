import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getYouTubeItems,
  getYouTubeItemById,
  getRelatedYouTube,
} from "@/lib/content";

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

export async function generateStaticParams() {
  return getYouTubeItems().map((item) => ({ id: item.id }));
}

export const dynamicParams = false;

export default async function YouTubeArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getYouTubeItemById(id);

  if (!item) notFound();

  const related = getRelatedYouTube(item, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/youtube"
          className="text-xs tracking-widest uppercase text-primary/50 hover:text-on-background transition-colors inline-flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">
            arrow_back
          </span>
          Back to YouTube
        </Link>
      </div>

      {/* Video Player */}
      <div className="aspect-video w-full bg-black mb-8">
        <iframe
          src={getEmbedUrl(item.youtubeUrl)}
          title={item.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Article Content */}
      <div className="grid grid-cols-12 gap-8 md:gap-12 mb-24">
        <div className="col-span-12 md:col-span-8">
          <h1 className="font-headline text-3xl md:text-5xl tracking-tight leading-tight mb-6">
            {item.title}
          </h1>

          {item.description && (
            <div className="font-body font-extralight text-base text-on-surface-variant leading-relaxed">
              <p>{item.description}</p>
            </div>
          )}

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-8">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase px-3 py-1 border border-outline-variant/30 text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Meta sidebar */}
        <div className="col-span-12 md:col-span-4">
          <div className="border-l-2 border-outline-variant/20 pl-6 space-y-6">
            {item.publishedAt && (
              <div>
                <span className="text-[10px] tracking-widest uppercase text-primary/40 block mb-1">
                  Published
                </span>
                <span className="text-sm font-body font-light text-on-surface-variant">
                  {item.publishedAt.replace(/-/g, ".")}
                </span>
              </div>
            )}
            {item.duration && (
              <div>
                <span className="text-[10px] tracking-widest uppercase text-primary/40 block mb-1">
                  Duration
                </span>
                <span className="text-sm font-body font-light text-on-surface-variant">
                  {item.duration}
                </span>
              </div>
            )}
            {item.category && (
              <div>
                <span className="text-[10px] tracking-widest uppercase text-primary/40 block mb-1">
                  Category
                </span>
                <span className="text-sm font-body font-light text-on-surface-variant">
                  {item.category}
                </span>
              </div>
            )}
            <div>
              <a
                href={item.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-widest uppercase text-primary/50 hover:text-on-background transition-colors border-b border-primary/20 pb-1 inline-flex items-center gap-2"
              >
                Watch on YouTube
                <span className="material-symbols-outlined text-sm">
                  open_in_new
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      {related.length > 0 && (
        <section className="mb-24">
          <div className="w-full h-[1px] bg-outline-variant/20 mb-12" />
          <h2 className="text-lg font-headline tracking-widest uppercase mb-8 text-primary/60">
            Related
          </h2>
          <div className="grid grid-cols-12 gap-8">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/youtube/${rel.id}`}
                className="col-span-12 md:col-span-4 group block"
              >
                <div className="aspect-video bg-surface-container overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    src={rel.thumbnailUrl}
                    alt={rel.title}
                  />
                </div>
                <h3 className="font-headline text-lg mb-1 tracking-wide">
                  {rel.title}
                </h3>
                <p className="text-[10px] font-body font-light tracking-widest uppercase text-outline">
                  {rel.duration} {rel.duration && rel.category ? "—" : ""}{" "}
                  {rel.category}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
