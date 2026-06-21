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

`data.js` lists **real Arlington apartment communities** near Metro. Building
names, addresses, nearest stations, and **starting rents** were gathered from
public listings (Apartments.com, RentCafe, and official property sites) in
**June 2026**. Each card links to its source via **“View listing.”**

Caveats:

- **Rents change frequently** and vary by unit, floor, lease term, and current
  specials. The `rentFrom` value is the lowest advertised starting rent at the
  time of collection — confirm current pricing with the property.
- `walkMin` and `rideMinToDC` are **approximate**. Ride times are to downtown DC
  (Metro Center for Orange/Silver/Blue; L'Enfant Plaza for Yellow).

Each record uses these fields:

```
name, address, station, lines[], corridor, neighborhood,
walkMin, rideMinToDC, rentFrom, beds[], source
```

### Keeping it current

Listing sites block automated scraping, so there is no live feed here. To
refresh, update `rentFrom` per building from the linked sources and bump
`RENT_AS_OF` at the top of `data.js`. For a fully automated feed you'd need a
paid listings API (e.g. a rentals data provider) or your own backend.
