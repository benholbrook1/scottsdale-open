import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

type Application = {
  id: string;
  name: string;
  email: string;
  handicap: string;
  letter: string;
  submittedAt: string;
};

const dataDir = path.join(
  process.env.VERCEL ? "/tmp" : process.cwd(),
  "data"
);
const dataFile = path.join(dataDir, "applications.json");
const discordWebhook = process.env.TOUR_DISCORD_WEBHOOK_URL?.trim();

async function loadApplications(): Promise<Application[]> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as Application[];
  } catch {
    return [];
  }
}

async function saveApplications(applications: Application[]) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(dataFile, JSON.stringify(applications, null, 2), "utf8");
}

function applicationLetter(letter: string) {
  if (letter.length <= 4096) return letter;
  return `${letter.slice(0, 4090)}…`;
}

async function notifyCommissioner(application: Application) {
  if (!discordWebhook) {
    throw new Error("Discord webhook is not configured.");
  }

  const response = await fetch(discordWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Scottsdale Tour Desk",
      embeds: [
        {
          title: `Application — ${application.name}`,
          color: 0x1e3d32,
          timestamp: application.submittedAt,
          fields: [
            { name: "Name", value: application.name, inline: true },
            { name: "Email", value: application.email, inline: true },
            {
              name: "Handicap",
              value: application.handicap || "Not given",
              inline: true,
            },
          ],
          description: applicationLetter(application.letter),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook returned ${response.status}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<Application>;

  try {
    body = (await request.json()) as Partial<Application>;
  } catch {
    return NextResponse.json({ error: "Please send a valid application." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const handicap = body.handicap?.trim() ?? "";
  const letter = body.letter?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json(
      { error: "A full name is required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 }
    );
  }

  if (letter.length < 80) {
    return NextResponse.json(
      { error: "Your letter must be at least 80 characters." },
      { status: 400 }
    );
  }

  const application: Application = {
    id: crypto.randomUUID(),
    name,
    email,
    handicap,
    letter,
    submittedAt: new Date().toISOString(),
  };

  try {
    const existing = await loadApplications();
    existing.push(application);
    await saveApplications(existing);
  } catch (error) {
    console.error("Could not persist application locally", error);
  }

  let emailed = false;
  try {
    await notifyCommissioner(application);
    emailed = true;
  } catch (error) {
    console.error("Could not notify the Commissioner", error);
  }

  return NextResponse.json({ ok: true, emailed });
}
