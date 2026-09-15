export const tour = {
  name: "The Scottsdale Tour",
  shortName: "Scottsdale Tour",
  season: "Inaugural Season",
  year: 2026,
  city: "Guelph, Ontario",
  commissioner: "The Commissioner",
  inboxEmail: "holbrook@uoguelph.ca",
  purse:
    "The winner of each event is embroidered onto the tour jacket",
} as const;

export type TourEvent = {
  id: string;
  name: string;
  year: number;
  fullName: string;
  stop: number;
  role: string;
  dateLabel: string;
  teeTime: string;
  venue: string;
  holes: number;
  format: string;
  par: number;
};

export const events: TourEvent[] = [
  {
    id: "open",
    name: "Scottsdale Open",
    year: 2026,
    fullName: "2026 Scottsdale Open",
    stop: 1,
    role: "Opening championship",
    dateLabel: "TBD",
    teeTime: "TBD",
    venue: "TBD",
    holes: 18,
    format: "Individual stroke play",
    par: 71,
  },
  {
    id: "invitational",
    name: "Scottsdale Invitational",
    year: 2026,
    fullName: "2026 Scottsdale Invitational",
    stop: 2,
    role: "Second stop",
    dateLabel: "TBD",
    teeTime: "TBD",
    venue: "TBD",
    holes: 18,
    format: "Individual stroke play",
    par: 71,
  },
  {
    id: "classic",
    name: "Scottsdale Classic",
    year: 2026,
    fullName: "2026 Scottsdale Classic",
    stop: 3,
    role: "Season finale",
    dateLabel: "TBD",
    teeTime: "TBD",
    venue: "TBD",
    holes: 18,
    format: "Individual stroke play",
    par: 71,
  },
];

export const event = events[0];

export type Player = {
  id: string;
  name: string;
  hometown: string;
  status: "Founding Member";
  plays?: "Left-handed" | "Right-handed";
  homeCourse: string;
  careerBegan: number;
  eventScores: Record<string, number | null>;
  bio?: string;
};

export const field: Player[] = [
  {
    id: "holbrook",
    name: "Ben Holbrook",
    hometown: "St. Jacobs, ON",
    status: "Founding Member",
    plays: "Left-handed",
    homeCourse: "Elmira Golf Club",
    careerBegan: 2020,
    eventScores: { open: null, invitational: null, classic: null },
    bio: "Currently on a hot streak with his short game, and looking for the same consistency with his driver. The longest-tenured player in the field, he has spent six seasons at Elmira figuring out how to score on days when the tee ball is not cooperating. Known for getting up and down from spots that should not yield a par, and for a putting stroke that has quietly become the most reliable in the group.",
  },
  {
    id: "summers",
    name: "Evan Summers",
    hometown: "Etobicoke, ON",
    status: "Founding Member",
    plays: "Right-handed",
    homeCourse: "Centennial Golf Course",
    careerBegan: 2024,
    eventScores: { open: null, invitational: null, classic: null },
    bio: "One of the longest hitters on the tour, and working to fight off the tops off the tee. When he catches one, it is usually the longest ball in the group by a clear margin. Two seasons in, the project is turning that length into fairways and scoring chances instead of a search down the left side. Has the kind of speed that makes par 5s feel reachable, provided the ball is on the clubface.",
  },
  {
    id: "crowdy",
    name: "Ben Crowdy",
    hometown: "Etobicoke, ON",
    status: "Founding Member",
    plays: "Right-handed",
    homeCourse: "Centennial Golf Course",
    careerBegan: 2025,
    eventScores: { open: null, invitational: null, classic: null },
    bio: "His game blossomed in the Next Golf simulator. He is looking to translate that away from the sim and into the spotlight of the Scottsdale Tour. Recently switched to stiff shafts and is hoping to see improvement from that in his game.",
  },
];

export function formatScore(scoreToPar: number | null) {
  if (scoreToPar === null) return "—";
  if (scoreToPar === 0) return "E";
  if (scoreToPar > 0) return `+${scoreToPar}`;
  return `${scoreToPar}`;
}

export function seasonTotal(player: Player) {
  const scores = events.map((stop) => player.eventScores[stop.id] ?? null);
  if (scores.every((score) => score === null)) return null;
  return scores.reduce<number>((sum, score) => sum + (score ?? 0), 0);
}

export function leaderboardRows() {
  const ranked = [...field].sort((a, b) => {
    const aTotal = seasonTotal(a);
    const bTotal = seasonTotal(b);
    if (aTotal === bTotal) return 0;
    if (aTotal === null) return 1;
    if (bTotal === null) return -1;
    return aTotal - bTotal;
  });

  const totals = ranked.map((player) => seasonTotal(player));

  return ranked.map((player, index) => {
    const total = totals[index];
    const firstAtTotal = totals.findIndex((value) => value === total);
    const tied = totals.filter((value) => value === total).length > 1;

    return {
      pos: tied ? `T${firstAtTotal + 1}` : String(index + 1),
      rank: index + 1,
      player,
      total,
    };
  });
}
