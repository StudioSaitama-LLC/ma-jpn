"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/youtube", label: "YouTube" },
  { href: "/podcast", label: "Podcast" },
  { href: "/journal", label: "Journal" },
  { href: "/", label: "Archive" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
      <nav className="flex justify-between items-center w-full px-6 md:px-12 py-6">
        <Link
          href="/"
          className="text-2xl font-headline tracking-[0.5rem] text-on-background"
        >
          MA
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive
                    ? "font-headline tracking-[0.2em] uppercase text-xs text-on-background border-b border-primary pb-1"
                    : "font-headline tracking-[0.2em] uppercase text-xs text-primary/60 hover:text-on-background transition-colors duration-500"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden material-symbols-outlined text-primary hover:opacity-70 transition-opacity duration-300">
          menu
        </button>
      </nav>
    </header>
  );
}
