# KuraVisor

KuraVisor is an offline first crop doctor and farm assistant for smallholder farmers. It is a mobile focused Next.js web app with an optional Express backend for accounts.

## What the app does

**Crop Doctor.** Take or pick a photo, choose the crop, tick the signs you can see, and get the most likely pest, disease or nutrient problem with first steps and a full treatment plan. Matching runs on the phone against the library in `src/lib/library.ts`, so it works without internet.

**Farm Records.** Add plots, then record expenses, income and harvests per plot. KuraVisor works out profit, profit per hectare, return and cost per kg, shows where the money went, and exports CSV. USD and ZiG are both supported.

**Tasks.** Plan scouting, spraying, weeding and harvests with due dates. Overdue and due tasks show on the home screen and nav badge, and optional daily browser notifications remind you.

**Knowledge Base.** Offline articles for every pest and disease in the library plus practical guides (Pfumvudza, crop rotation, scouting, safe spraying, storage).

**Agro Dealers.** Save the shops you use with phone numbers to call offline, and search for nearby shops on a map when connected.

**Settings.** Text size, light or dark theme, main currency, task reminders, data backup and restore (JSON), CSV export, sign out and delete all data.

## How data is stored

Everything the farmer enters is saved on the device in `localStorage` (see `src/lib/store.ts`). Nothing is uploaded. Farmers can back up to a file and restore it on another phone from Settings.

Accounts can be either:

1. **Online account**, created through the backend (`POST /api/auth/register` and `/api/auth/login`).
2. **Offline profile**, created on the phone with just a name. No internet needed.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To use online accounts, run the backend (see `backend/`) and point the app at it:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

`http://localhost:5000` is also the default when the variable is not set.

## Project layout

| Path | Contents |
| --- | --- |
| `src/app` | Pages (App Router) |
| `src/components` | Shared UI: navigation, headers, forms, rows |
| `src/lib/store.ts` | On device data store and actions |
| `src/lib/library.ts` | Crops, symptoms, conditions, treatments, guides, tips |
| `src/lib/farm.ts` | Money and harvest calculations, CSV helpers |
| `src/lib/api.ts` | Backend client |
| `backend` | Express and Prisma API for accounts |

## Checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```
