# Arlington Metro Apartments 🚇

A simple, no-build static website that lists apartment communities in
**Arlington, VA** that are close to a **Washington Metro** station and offer an
**easy commute into Washington, DC**.

## Why Arlington + Metro?

Arlington's two main transit corridors put DC minutes away:

- **Rosslyn–Ballston corridor** (Orange / Silver lines): Rosslyn, Court House,
  Clarendon, Virginia Square, Ballston
- **Pentagon City–Crystal City corridor** (Blue / Yellow lines): Pentagon City,
  Crystal City

Each listing shows the nearest station, the Metro line(s), the walk time to the
station, the ride time into DC, and an estimated **total commute** so you can
compare options at a glance.

## Features

- 🔍 Search by name, neighborhood, or station
- 🚇 Filter by Metro line (Orange / Silver / Blue / Yellow)
- 🧭 Filter by corridor
- 🚶 Cap the maximum walk to Metro
- 💵 Cap the maximum rent
- ↕️ Sort by total commute to DC, walk time, or rent

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
cd arlington-apartments
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page layout and filter controls |
| `styles.css` | Styling |
| `data.js` | Sample apartment data |
| `app.js` | Filtering, sorting, rendering |

## Data

`data.js` contains **sample/demo data** — it is **not** a live listings feed.
Walk times, ride times, and rents are approximate. To make it production-ready,
replace the `APARTMENTS` array with a real source (an apartments listing API, a
scraped feed, or your own backend) while keeping the same fields:

```
name, station, lines[], corridor, neighborhood,
walkMin, rideMinToDC, rentFrom, rentTo, beds[]
```
