import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatScore, leaderboardRows } from "@/lib/tour";

export function LeaderboardTable() {
  const rows = leaderboardRows();

  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--pine)]/15 bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-[color:var(--pine)] hover:bg-[color:var(--pine)]">
            <TableHead className="w-16 text-[color:var(--cream)]">Pos</TableHead>
            <TableHead className="text-[color:var(--cream)]">Player</TableHead>
            <TableHead className="text-right text-[color:var(--cream)]">
              Total
            </TableHead>
            <TableHead className="text-right text-[color:var(--cream)]">
              Thru
            </TableHead>
            <TableHead className="hidden text-right text-[color:var(--cream)] sm:table-cell">
              Today
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ pos, player }) => (
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
              <TableCell className="text-right font-heading text-lg">
                {formatScore(player.scoreToPar)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {player.thru}
              </TableCell>
              <TableCell className="hidden text-right text-muted-foreground sm:table-cell">
                {player.today}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="border-t bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        Official scoring has not opened. The field is even par by administrative
        courtesy until someone actually hits a ball.
      </p>
    </div>
  );
}
