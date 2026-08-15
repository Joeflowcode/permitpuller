# Salem Permit List

Weekly remodel and demo permits for local trades in Salem, Keizer, Stayton, Lyons, and Albany.

This is its own product. It is **not** northwestjunkpros.com and it is **not** Estate-sale-biz.

## Run locally

```bash
cp .env.example .env
# set ADMIN_PASSWORD
npm install
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin

## What it does

- `/` — marketing page. Contact form is mailto to joeymcveigh150@gmail.com with subject `PERMIT LIST`.
- `/admin` — password cookie. Mine tab is Joey’s haul list (never emailed to trades). Sell tab is leftover trades.

## Notes

SQLite file lives at `prisma/dev.db`. No Stripe. No city scraper. Paste a PortlandMaps CSV or add a row by hand.
