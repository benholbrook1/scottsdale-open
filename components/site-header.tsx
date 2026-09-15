"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { TourWordmark } from "@/components/tour-wordmark";
import { TourCrest } from "@/components/tour-crest";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "The Tour" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/apply", label: "Applications" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--crest-gold)]/30 bg-[color:var(--pine)] text-[color:var(--cream)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="The Scottsdale Tour"
          onClick={() => setOpen(false)}
        >
          <TourCrest className="h-12 text-[color:var(--crest-gold)]" />
          <TourWordmark established className="text-[color:var(--cream)]" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors",
                pathname === link.href
                  ? "text-[color:var(--crest-gold)]"
                  : "text-[color:var(--cream)]/80 hover:text-[color:var(--crest-gold)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="text-[color:var(--cream)] hover:bg-white/10 hover:text-[color:var(--crest-gold)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2 py-2 text-sm tracking-[0.16em] uppercase",
                  pathname === link.href
                    ? "bg-white/10 text-[color:var(--crest-gold)]"
                    : "text-[color:var(--cream)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
