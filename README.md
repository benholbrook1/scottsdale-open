# The Scottsdale Tour

Official (joke) website for **the Scottsdale Tour**, a golf circuit hosted in Guelph, Ontario this fall. The opening event is the **Scottsdale Open**. Date, tee time, and venue are TBD.

The founding field is Ben Holbrook, Evan Summers, and Ben Crowdy. Everyone else has to write a letter.

## What's on the site

- Event overview for the Scottsdale Open
- An empty official leaderboard (all even par, play has not begun)
- An applications page that accepts a written letter and notifies the Commissioner

## Run it locally

```bash
npm install
npm run dev
```

The app listens on [http://127.0.0.1:43127](http://127.0.0.1:43127).

Production mode (no Next.js debug badge):

```bash
npm run build
npm start
```

## Applications inbox

Letters are pushed to a live inbox:

**[Open the Commissioner’s inbox](https://ntfy.sh/scottsdale-open-guelph-2026-desk)**

Leave that tab open, or install [ntfy](https://ntfy.sh) on your phone and subscribe to `scottsdale-open-guelph-2026-desk`. Applicants can also tap “Also send from your email,” which opens a pre-filled message to `holbrook@uoguelph.ca`.

To use a different topic or mailbox, set `TOUR_NTFY_TOPIC` and `TOUR_INBOX_EMAIL` in `.env.local`.

## Keep it online without your laptop

A Cloudflare tunnel from this machine only works while the machine is on. For a URL that stays up 24/7, host it on **Vercel** (free hobby plan). That is the usual free host for a Next.js site.

1. Create a GitHub repository for this project (in Cursor, use the **Create repo** pill if you do not have one yet).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. Import the Scottsdale Tour repo. Leave the defaults (Next.js is detected).
4. Click **Deploy**. After a minute you get a URL like `https://scottsdale-tour.vercel.app`.
5. Share that URL. Vercel keeps serving it with your laptop closed.

Incoming letters still land on the ntfy inbox above. The on-disk `applications.json` file is only a local backup and does not persist on Vercel.
