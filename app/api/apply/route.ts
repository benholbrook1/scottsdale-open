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
const ntfyTopic =
  process.env.TOUR_NTFY_TOPIC?.trim() || "scottsdale-open-guelph-2026-desk";

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

async function notifyCommissioner(application: Application) {
  const body = [
    `From: ${application.name} <${application.email}>`,
    `Handicap: ${application.handicap || "Not given"}`,
    `Filed: ${application.submittedAt}`,
    "",
    application.letter,
  ].join("\n");

  const response = await fetch("https://ntfy.sh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: ntfyTopic,
      title: `Scottsdale Tour application - ${application.name}`,
      tags: ["golf", "mailbox"],
      message: body,
    }),
  });

  if (!response.ok) {
    throw new Error(`Tour desk notify returned ${response.status}`);
  }
}

export async function POST(request: Request) {
  let body: Partial<Application>;

  try {
    body = (await request.json()) as Partial<Application>;
  } catch {
    return NextResponse.json({ error: "Send a JSON letter." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const handicap = body.handicap?.trim() ?? "";
  const letter = body.letter?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json(
      { error: "A name is required for the bag tag." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Give the Commissioner a real email address." },
      { status: 400 }
    );
  }

  if (letter.length < 80) {
    return NextResponse.json(
      { error: "That is not a letter. Write at least 80 characters." },
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
