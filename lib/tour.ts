export const tour = {
  name: "The Scottsdale Tour",
  shortName: "Scottsdale Tour",
  season: "Inaugural Season",
  year: 2026,
  city: "Guelph, Ontario",
  commissioner: "The Commissioner",
  inboxEmail: "holbrook@uoguelph.ca",
} as const;

export const event = {
  name: "Scottsdale Open",
  year: 2026,
  fullName: "2026 Scottsdale Open",
  dateLabel: "TBD",
  teeTime: "TBD",
  venue: "TBD",
  holes: 18,
  format: "Individual stroke play",
  par: 71,
  purse: "Bragging rights, a round at the 19th, and naming rights to the group chat until spring",
  status: "Field announced · Play has not begun",
} as const;

export type Player = {
  id: string;
  name: string;
  hometown: string;
  status: "Member";
  scoreToPar: number | null;
  thru: string;
  today: string;
};

export const field: Player[] = [
  {
    id: "holbrook",
    name: "Ben Holbrook",
    hometown: "Guelph, ON",
    status: "Member",
    scoreToPar: null,
    thru: "—",
    today: "—",
  },
  {
    id: "summers",
    name: "Evan Summers",
    hometown: "Guelph, ON",
    status: "Member",
    scoreToPar: null,
    thru: "—",
    today: "—",
  },
  {
    id: "crowdy",
    name: "Ben Crowdy",
    hometown: "Guelph, ON",
    status: "Member",
    scoreToPar: null,
    thru: "—",
    today: "—",
  },
];

export function formatScore(scoreToPar: number | null) {
  if (scoreToPar === null) return "E";
  if (scoreToPar === 0) return "E";
  if (scoreToPar > 0) return `+${scoreToPar}`;
  return `${scoreToPar}`;
}

export function leaderboardRows() {
  return field.map((player, index) => ({
    pos: "T1",
    rank: index + 1,
    player,
  }));
}
