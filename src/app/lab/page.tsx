import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Lab — 間｜MA",
  description:
    "間という現象を、論理と感性の二軸から定義していく研究の場。dictionary・reference room・3 stage architecture のプロトタイプ。",
  robots: {
    index: false,
    follow: false,
  },
};

const items = [
  {
    num: "01",
    href: `${basePath}/lab/architecture/`,
    eyebrow: "architecture",
    title: "全体構想",
    body: "間メディアの 3 stage 構造（定める／広める／感化する）を、ノートと会議録から再構成したドキュメント。",
  },
  {
    num: "02",
    href: `${basePath}/lab/dictionary/`,
    eyebrow: "interactive",
    title: "Dictionary",
    body: "単語・オノマトペ・ヴィジュアルの三層辞書。重力で「間」へ引き寄せられる語を、感覚と論理を往復しながら歩く。",
  },
  {
    num: "03",
    href: `${basePath}/lab/reference-room/`,
    eyebrow: "interactive",
    title: "Reference Room",
    body: "「間」が現れてきた場所をひたすら集めた資料庫。古代から現代まで、領域も時代も越えて、レコード屋のようにディグれる。",
  },
];

export default function LabPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
      {/* Watermark */}
      <div className="ma-watermark absolute -right-12 top-1/4 text-[20rem] opacity-[0.03] leading-none text-primary pointer-events-none select-none">
        間
      </div>

      <div className="mb-20 flex flex-col items-start">
        <div className="flex items-baseline gap-4 mb-4">
          <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
            ──
          </span>
          <h1 className="text-5xl md:text-7xl font-headline tracking-widest leading-tight text-on-background opacity-90">
            Lab
          </h1>
        </div>
        <p className="font-body font-extralight text-base md:text-lg max-w-xl text-on-surface-variant leading-relaxed tracking-wide">
          まだ言葉になっていないものを、言葉に近づけていく。<br />
          「間」を、論理と感性の二軸から定義する研究の場。
        </p>
        <p className="mt-6 font-body font-extralight text-xs text-on-surface-variant/60 tracking-wider uppercase">
          Prototype · 2026.05
        </p>
        <div className="mt-8 w-32 h-[1px] bg-outline-variant/30" />
      </div>

      <div className="space-y-px mb-24">
        {items.map((item) => (
          <a
            key={item.num}
            href={item.href}
            className="group block border-t border-outline-variant/20 last:border-b py-10 md:py-14 transition-colors duration-500 hover:bg-on-surface/[0.02]"
          >
            <div className="grid grid-cols-12 gap-4 md:gap-8 items-baseline">
              <div className="col-span-12 md:col-span-1">
                <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40 group-hover:text-on-background transition-colors duration-500">
                  {item.num}
                </span>
              </div>
              <div className="col-span-12 md:col-span-3">
                <span className="text-xs font-headline tracking-[0.3em] uppercase text-primary/50">
                  {item.eyebrow}
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-headline tracking-wider text-on-background opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  {item.title}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="font-body font-extralight text-sm md:text-base text-on-surface-variant leading-relaxed tracking-wide">
                  {item.body}
                </p>
                <span className="mt-4 inline-block text-xs font-headline tracking-[0.3em] uppercase text-primary/40 group-hover:text-on-background transition-colors duration-500">
                  ────── 開く
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mb-32 max-w-2xl text-xs font-body font-extralight text-on-surface-variant/60 leading-loose tracking-wide">
        <p>
          ここは、まだ公開のための場所ではありません。<br />
          「間」を定義していく途中の、研究室のメモを、外に開いて整えたものです。
        </p>
      </div>
    </div>
  );
}
