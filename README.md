# The Scottsdale Tour

Official (joke) website for **the Scottsdale Tour**, a prestigious three-event championship hosted in Guelph, Ontario this fall. In order: the **Scottsdale Open**, the **Scottsdale Invitational**, and the **Scottsdale Classic**. Locations and times are TBD.

The founding field is Ben Holbrook, Evan Summers, and Ben Crowdy. Everyone else has to write a letter.

## What's on the site

- Season schedule for the Open, Invitational, and Classic
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

Letters post to a Discord channel via webhook.

1. Create a private Discord server (or a private channel) for the Tour desk.
2. Open the channel → **Edit Channel** → **Integrations** → **Webhooks** → **New Webhook**.
3. Copy the webhook URL.
4. Put it in `.env.local` as `TOUR_DISCORD_WEBHOOK_URL`, and add the same variable in Vercel under Project Settings → Environment Variables.

Do not commit the webhook URL. Anyone with it can post to that channel.

Applicants can also send a copy from their email to `holbrook@uoguelph.ca`.

## Keep it online without your laptop

A Cloudflare tunnel from this machine only works while the machine is on. For a URL that stays up 24/7, host it on **Vercel** (free hobby plan). That is the usual free host for a Next.js site.

1. Create a GitHub repository for this project (in Cursor, use the **Create repo** pill if you do not have one yet).
2. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
3. Import the Scottsdale Tour repo. Leave the defaults (Next.js is detected).
4. Click **Deploy**. After a minute you get a URL like `https://scottsdale-tour.vercel.app`.
5. Share that URL. Vercel keeps serving it with your laptop closed.

Incoming letters land in Discord. The on-disk `applications.json` file is only a local backup and does not persist on Vercel.
