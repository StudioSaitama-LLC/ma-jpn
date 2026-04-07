import Link from "next/link";
import {
  getYouTubeItems,
  getFeaturedYouTube,
  getPodcastItems,
  getFeaturedPodcast,
  getNoteItems,
  getFeaturedNote,
} from "@/lib/content";
import { YouTubeSection } from "@/components/YouTubeSection";

export default function ArchivePage() {
  const youtubeItems = getYouTubeItems();
  const featuredYT = getFeaturedYouTube();
  const subYT = youtubeItems.filter((i) => i.id !== featuredYT?.id).slice(0, 2);

  const podcastItems = getPodcastItems();
  const featuredPod = getFeaturedPodcast();
  const subPod = podcastItems
    .filter((i) => i.id !== featuredPod?.id)
    .slice(0, 2);

  const noteItems = getNoteItems();
  const featuredNote = getFeaturedNote();
  const subNotes = noteItems
    .filter((i) => i.id !== featuredNote?.id)
    .slice(0, 2);

  return (
    <>
      {/* MA Watermark */}
      <div className="ma-watermark absolute -left-12 top-1/4 text-[20rem] opacity-[0.03] leading-none text-primary pointer-events-none">
        間
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Section */}
        <div className="mb-24 flex flex-col items-start">
          <h1 className="font-headline text-6xl md:text-8xl tracking-widest leading-tight mb-4 text-on-background opacity-90">
            間｜MA
          </h1>
          <p className="font-body font-extralight text-lg max-w-md text-on-surface-variant leading-relaxed tracking-wide">
            立ち止まること。余白を残すこと。
            すぐに、意味を求めないこと。
          </p>
          <div className="mt-8 w-32 h-[1px] bg-outline-variant/30" />
        </div>


        {/* YouTube Section */}
        <YouTubeSection
          featured={featuredYT ?? null}
          subItems={subYT}
        />


        {/* Podcast Section */}
        <section className="mb-32">
          <div className="flex items-baseline justify-between mb-12">
            <div className="flex items-baseline gap-4 flex-row-reverse">
              <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
                02
              </span>
              <h2 className="text-2xl font-headline tracking-widest uppercase">
                Podcast
              </h2>
            </div>
            <Link
              href="/podcast"
              className="text-xs tracking-widest uppercase text-primary/50 hover:text-on-background transition-colors border-b border-primary/20 pb-1"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="col-span-12 md:col-span-4 order-2 md:order-1 flex flex-col gap-12">
              {subPod.map((item) => (
                <a
                  key={item.id}
                  href={item.podcastUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-l-2 border-outline-variant/20 pl-6 group block"
                >
                  <span className="text-[10px] tracking-widest uppercase text-primary/50 mb-2 block">
                    Episode {item.episode}
                  </span>
                  <h4 className="font-headline text-xl mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-extralight text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

            {featuredPod && (
              <div className="col-span-12 md:col-span-8 order-1 md:order-2">
                <div className="bg-surface-container-low p-8 md:p-12 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-16">
                      <span className="material-symbols-outlined text-5xl font-thin">
                        graphic_eq
                      </span>
                      <span className="text-[10px] font-body font-light tracking-[0.3em] uppercase">
                        Season {String(featuredPod.season).padStart(2, "0")} —
                        Episode {featuredPod.episode}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-headline leading-tight mb-8 max-w-xl">
                      {featuredPod.title}
                    </h3>
                    <div className="flex items-center gap-8">
                      <a
                        href={featuredPod.podcastUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-on-primary px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-primary-dim transition-colors"
                      >
                        Listen Now
                      </a>
                      <span className="text-xs font-light text-on-surface-variant">
                        {featuredPod.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Journal Section */}
        <section className="mb-24">
          <div className="flex items-baseline justify-between mb-12">
            <div className="flex items-baseline gap-4">
              <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
                03
              </span>
              <h2 className="text-2xl font-headline tracking-widest uppercase">
                Journal
              </h2>
            </div>
            <Link
              href="/journal"
              className="text-xs tracking-widest uppercase text-primary/50 hover:text-on-background transition-colors border-b border-primary/20 pb-1"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {featuredNote && (
              <div className="col-span-12 md:col-span-5 bg-surface-container-highest p-8 md:p-10 flex flex-col justify-between min-h-[400px] md:aspect-[4/5]">
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-on-surface/50 mb-4 block">
                    {featuredNote.id.replace("note-", "Note #")}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-headline leading-snug mb-6 italic">
                    {featuredNote.title}
                  </h3>
                  <p className="font-body font-extralight text-sm leading-relaxed mb-8 opacity-80">
                    {featuredNote.excerpt}
                  </p>
                </div>
                <a
                  href={featuredNote.noteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase border-b border-primary/20 w-max pb-1 hover:border-primary transition-all"
                >
                  Read Fragment
                </a>
              </div>
            )}

            <div className="col-span-12 md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {subNotes.map((item) =>
                item.thumbnailUrl ? (
                  <a
                    key={item.id}
                    href={item.noteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden group h-full min-h-[300px] block"
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      src={item.thumbnailUrl}
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <h4 className="font-headline text-white text-xl mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/70 text-[10px] uppercase tracking-widest">
                        {item.category}
                      </p>
                    </div>
                  </a>
                ) : (
                  <a
                    key={item.id}
                    href={item.noteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-surface-container-low p-8 flex flex-col justify-between block"
                  >
                    <div className="mb-12">
                      <h4 className="font-headline text-xl mb-4">
                        {item.title}
                      </h4>
                      <p className="font-body font-extralight text-xs leading-relaxed opacity-70">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                      <span>{item.publishedAt.replace(/-/g, ".")}</span>
                      <span>{item.readTime} Read</span>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>
        </section>
      </div>

    </>
  );
}
