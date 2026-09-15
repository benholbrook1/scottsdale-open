import { tour } from "@/lib/tour";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color:var(--crest-gold)]/25 bg-[color:var(--pine)] text-[color:var(--cream)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-heading text-lg tracking-wide">
          {tour.name}
          <span className="block text-xs tracking-[0.2em] text-[color:var(--crest-gold)] uppercase">
            {tour.city} · {tour.year}
          </span>
        </p>
        <p className="max-w-md text-sm text-[color:var(--cream)]/70">
          A prestigious three-event championship with official stationery.
          Applications are read by the Commissioner and, when the internet
          cooperates, emailed to the tour desk.
        </p>
      </div>
    </footer>
  );
}
