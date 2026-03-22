interface SectionHeaderProps {
  number: string;
  title: string;
  reverse?: boolean;
}

export function SectionHeader({
  number,
  title,
  reverse = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`flex items-baseline gap-4 mb-12 ${reverse ? "flex-row-reverse" : ""}`}
    >
      <span className="text-xs font-headline tracking-[0.4em] uppercase text-primary/40">
        {number}
      </span>
      <h2 className="text-2xl font-headline tracking-widest uppercase">
        {title}
      </h2>
    </div>
  );
}
