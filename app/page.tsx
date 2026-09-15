import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { event, events, field, tour } from "@/lib/tour";

const facts = [
  { label: "Events", value: String(events.length) },
  { label: "Format", value: `${event.holes} holes · ${event.format}` },
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
            {tour.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-[color:var(--cream)]/80">
            For years the Scottsdale Tour has been a private proving ground:
            a small field, a high standard, and no patience for a round that is
            merely fine. This season the Open, Invitational, and Classic will
            put that standard on display.
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
              2026 schedule
            </p>
            <h2 className="mt-2 font-heading text-4xl">
              A prestigious set of events
            </h2>
          </div>
          <Badge variant="secondary" className="tracking-wide uppercase">
            Locations and times TBD
          </Badge>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {tour.name} is a championship of three events: the Open, the
          Invitational, and the Classic. Each is eighteen holes of stroke play.
          Dates, venues, and tee times will be announced. The field is small,
          admission is by letter, and the stationery is official.
        </p>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          {events.map((stop) => (
            <li
              key={stop.id}
              className="flex flex-col rounded-xl border bg-card px-5 py-6 shadow-sm"
            >
              <p className="text-[11px] tracking-[0.22em] text-[color:var(--crest-gold-deep)] uppercase">
                Event {stop.stop} · {stop.role}
              </p>
              <h3 className="mt-2 font-heading text-3xl">{stop.name}</h3>
              <dl className="mt-5 grid gap-3">
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Date
                  </dt>
                  <dd className="font-heading text-xl">{stop.dateLabel}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Tee time
                  </dt>
                  <dd className="font-heading text-xl">{stop.teeTime}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Venue
                  </dt>
                  <dd className="font-heading text-xl">{stop.venue}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
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
          <p className="mt-2 max-w-3xl font-heading text-2xl">{tour.purse}</p>
        </div>
      </section>

      <section className="border-y bg-[color:var(--fairway-wash)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
                Season standings
              </p>
              <h2 className="mt-2 font-heading text-4xl">Tour leaderboard</h2>
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
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {field.map((player) => (
            <li
              key={player.id}
              className="flex flex-col rounded-xl border bg-card px-5 py-6 shadow-sm"
            >
              <p className="font-heading text-2xl">{player.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {player.hometown}
              </p>
              <dl className="mt-5 grid gap-3">
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Plays
                  </dt>
                  <dd className="font-heading text-xl">
                    {player.plays ?? "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Home course
                  </dt>
                  <dd className="font-heading text-xl">{player.homeCourse}</dd>
                </div>
                <div>
                  <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    Career
                  </dt>
                  <dd className="font-heading text-xl">
                    Since {player.careerBegan}
                  </dd>
                </div>
              </dl>
              {player.bio ? (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {player.bio}
                </p>
              ) : null}
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
