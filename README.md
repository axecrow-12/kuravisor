# KuraVisor

KuraVisor is an offline first crop doctor and farm assistant for smallholder farmers. It is a mobile focused Next.js web app with an optional Express backend for accounts.

## What the app does

**Crop Doctor.** Take or pick a photo, choose the crop, tick the signs you can see, and get the most likely pest, disease or nutrient problem with first steps and a full treatment plan. Matching runs on the phone against the library in `src/lib/library.ts`, so it works without internet.

**Farm Records.** Add plots, then record expenses, income and harvests per plot. KuraVisor works out profit, profit per hectare, return and cost per kg, shows where the money went, and exports CSV. USD and ZiG are both supported.

**Tasks.** Plan scouting, spraying, weeding and harvests with due dates. Overdue and due tasks show on the home screen and nav badge, and optional daily browser notifications remind you.

**Knowledge Base.** Offline articles for every pest and disease in the library plus practical guides (Pfumvudza, crop rotation, scouting, safe spraying, storage).

**Agro Dealers.** Save the shops you use with phone numbers to call offline, and search for nearby shops on a map when connected.

**Settings.** Language (English, chiShona, isiNdebele), text size, light or dark theme, main currency, task reminders, data backup and restore (JSON), CSV export, sign out and delete all data.

## Languages

The app is available in English, chiShona and isiNdebele. Farmers pick a language on the first onboarding screen, on the register page, or later in Settings, and the whole interface switches immediately.

1. Text lives in `src/locales/en.ts`, `sn.ts` and `nd.ts`. English is the source of truth for message keys, and the build fails if Shona or Ndebele is missing a key.
2. Components read text through `useT()` from `src/lib/i18n.ts`, which also formats dates with local month and weekday names.
3. Crop names, record categories, units, severity and task types are translated. Farm data is always stored in English so it stays the same whatever language is shown.

**Not yet translated:** the crop health library in `src/lib/library.ts` (symptoms, diagnoses, treatments, pesticide safety, guides and daily tips). A wrong translation of pesticide or diagnosis advice could cause harm, so it stays in English until a native speaking agronomist can translate and check it. The app shows a notice about this on those screens when Shona or Ndebele is selected.

**Review needed:** the Shona and Ndebele interface text has not yet been reviewed by native speakers. Please have both files checked before release.

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
| `src/lib/i18n.ts` | Translation hook and helpers |
| `src/locales` | English, Shona and Ndebele interface text |
| `backend` | Express and Prisma API for accounts |

## Checks

```bash
npx tsc --noEmit
npm run lint
npm run build
```
