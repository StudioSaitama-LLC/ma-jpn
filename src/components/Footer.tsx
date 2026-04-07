import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mt-24 bg-surface-container-low border-t border-primary/10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-16 gap-8">
        <div className="text-sm font-headline italic text-primary">
          間｜MA
        </div>
        <div className="flex gap-12">
          <Link
            href="/youtube"
            className="font-body font-light tracking-widest text-[10px] uppercase text-primary/50 hover:text-on-background transition-all"
          >
            YouTube
          </Link>
          <Link
            href="/podcast"
            className="font-body font-light tracking-widest text-[10px] uppercase text-primary/50 hover:text-on-background transition-all"
          >
            Podcast
          </Link>
          <Link
            href="/journal"
            className="font-body font-light tracking-widest text-[10px] uppercase text-primary/50 hover:text-on-background transition-all"
          >
            Journal
          </Link>
        </div>
        <div className="font-body font-light tracking-widest text-[10px] uppercase text-primary">
          &copy; 間｜MA
        </div>
      </div>
    </footer>
  );
}
