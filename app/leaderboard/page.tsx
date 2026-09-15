import type { Metadata } from "next";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { field, tour } from "@/lib/tour";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: `Official season scoring for ${tour.name}. Scores from the Open, Invitational, and Classic.`,
};

export default function LeaderboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.28em] text-[color:var(--crest-gold-deep)] uppercase">
        Official scoring · {tour.year} season
      </p>
      <h1 className="mt-2 font-heading text-5xl">Tour leaderboard</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Cumulative scoring across the Open, Invitational, and Classic.{" "}
        {field.length} players in the field. No scores have been returned
        because nobody has teed off.
      </p>
      <div className="mt-8">
        <LeaderboardTable />
      </div>
    </div>
  );
}
