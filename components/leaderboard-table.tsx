import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { events, formatScore, leaderboardRows } from "@/lib/tour";

export function LeaderboardTable() {
  const rows = leaderboardRows();

  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--pine)]/15 bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-[color:var(--pine)] hover:bg-[color:var(--pine)]">
            <TableHead className="w-16 text-[color:var(--cream)]">Pos</TableHead>
            <TableHead className="text-[color:var(--cream)]">Player</TableHead>
            {events.map((stop) => (
              <TableHead
                key={stop.id}
                className="text-right text-[color:var(--cream)]"
              >
                {stop.name.replace("Scottsdale ", "")}
              </TableHead>
            ))}
            <TableHead className="text-right text-[color:var(--cream)]">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ pos, player, total }) => (
            <TableRow key={player.id} className="h-14">
              <TableCell className="font-heading text-lg">{pos}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium">{player.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {player.hometown} · {player.status}
                  </span>
                </div>
              </TableCell>
              {events.map((stop) => (
                <TableCell
                  key={stop.id}
                  className="text-right font-heading text-lg"
                >
                  {formatScore(player.eventScores[stop.id] ?? null)}
                </TableCell>
              ))}
              <TableCell className="text-right font-heading text-lg">
                {formatScore(total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
