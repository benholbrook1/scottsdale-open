import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { event, field, tour } from "@/lib/tour";

const facts = [
  { label: "Date", value: event.dateLabel },
  { label: "Tee time", value: event.teeTime },
  { label: "Venue", value: event.venue },
  { label: "Format", value: `${event.holes} holes · ${event.format}` },
  { label: "Par", value: String(event.par) },
  { label: "Field", value: `${field.length} announced` },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[color:var(--pine)] text-[color:var(--cream)]">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_top,oklch(0.72_0.08_85)_0,transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.35))]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="text-[11px] font-semibold tracking-[0.32em] text-[color:var(--crest-gold)] uppercase">
            {tour.season} · {tour.city}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.95] sm:text-7xl">
            {event.fullName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--cream)]/80">
            Opening event of {tour.name}. Three founding members, one municipal
            autumn, and a leaderboard that is currently an act of faith.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={<Link href="/leaderboard" />}
              size="lg"
              className="bg-[color:var(--crest-gold)] text-[color:var(--pine)] hover:bg-[color:var(--crest-gold)]/90"
            >
              View leaderboard
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/apply" />}
              size="lg"
              variant="outline"
              className="border-[color:var(--cream)]/40 bg-transparent text-[color:var(--cream)] hover:bg-white/10 hover:text-[color:var(--cream)]"
            >
              Apply to the field
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
              Event overview
            </p>
            <h2 className="mt-2 font-heading text-4xl">The first tee of the Tour</h2>
          </div>
          <Badge variant="secondary" className="tracking-wide uppercase">
            {event.status}
          </Badge>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          The Scottsdale Open is the inaugural championship of a golf tour named
          after Arizona and hosted, with some geographic nerve, in Guelph. Play
          is eighteen holes of stroke play. Course, date, and tee time remain
          TBD. There is no cut, no television tower, and no shuttle from the
          parking lot. There will be a starting time, a pencil, and a very small
          official field.
        </p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border bg-card px-5 py-4 shadow-sm"
            >
              <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1 font-heading text-2xl leading-snug">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 rounded-xl border border-[color:var(--crest-gold)]/40 bg-[color:var(--cream)] px-5 py-5">
          <p className="text-[11px] tracking-[0.22em] text-[color:var(--crest-gold-deep)] uppercase">
            Purse
          </p>
          <p className="mt-2 max-w-3xl font-heading text-2xl">{event.purse}</p>
        </div>
      </section>

      <section className="border-y bg-[color:var(--fairway-wash)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
                Live scoring
              </p>
              <h2 className="mt-2 font-heading text-4xl">
                {event.name} leaderboard
              </h2>
            </div>
            <Button nativeButton={false} render={<Link href="/leaderboard" />} variant="outline">
              Full board
            </Button>
          </div>
          <div className="mt-8">
            <LeaderboardTable />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-heading text-4xl">Founding field</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Membership currently stands at three. Further players may be admitted
          by written letter, which the Commissioner has promised to read with a
          straight face.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {field.map((player) => (
            <li
              key={player.id}
              className="rounded-xl border bg-card px-5 py-6 shadow-sm"
            >
              <p className="font-heading text-2xl">{player.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {player.hometown}
              </p>
            </li>
          ))}
        </ul>
        <Button
          nativeButton={false}
          render={<Link href="/apply" />}
          size="lg"
          className="mt-8"
        >
          Address a letter to the Commissioner
        </Button>
      </section>
    </div>
  );
}
