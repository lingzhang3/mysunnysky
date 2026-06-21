// Real Arlington, VA apartment communities near Washington Metro stations,
// chosen for an easy commute into Washington, DC.
//
// Building names, addresses, nearest stations, and starting rents were
// gathered from public listings (Apartments.com, RentCafe, and official
// property sites) in JUNE 2026. Rents change frequently and vary by unit,
// floor, lease term, and current specials — always confirm with the property.
//
// `walkMin` and `rideMinToDC` are approximate. Ride times are to downtown DC
// (Metro Center for Orange/Silver/Blue; L'Enfant Plaza for Yellow).
//
// Fields:
//   name, address, station, lines[], corridor, neighborhood,
//   walkMin, rideMinToDC, rentFrom (starting $/mo, June 2026), beds[], source
const RENT_AS_OF = "June 2026";

const APARTMENTS = [
  // ---- Rosslyn (Orange / Silver / Blue) ----
  {
    name: "Central Place Residences",
    address: "1800 N Lynn St, Arlington, VA 22209",
    station: "Rosslyn",
    lines: ["Orange", "Silver", "Blue"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Rosslyn",
    walkMin: 2,
    rideMinToDC: 8,
    rentFrom: 2074,
    beds: ["Studio", "1BR", "2BR", "3BR"],
    source: "https://www.apartments.com/central-place-arlington-va/smwqx87/",
  },
  {
    name: "Parc Rosslyn",
    address: "1531 N Pierce St, Arlington, VA 22209",
    station: "Rosslyn",
    lines: ["Orange", "Silver", "Blue"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Rosslyn",
    walkMin: 8,
    rideMinToDC: 8,
    rentFrom: 1670,
    beds: ["Studio", "1BR", "2BR", "3BR"],
    source: "https://www.apartments.com/parc-rosslyn-apartments-arlington-va/fbe5kvs/",
  },
  {
    name: "Cortland Rosslyn",
    address: "1771 N Pierce St, Arlington, VA 22209",
    station: "Rosslyn",
    lines: ["Orange", "Silver", "Blue"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Rosslyn",
    walkMin: 9,
    rideMinToDC: 8,
    rentFrom: 2248,
    beds: ["Studio", "1BR", "2BR", "3BR"],
    source: "https://www.apartments.com/cortland-rosslyn-arlington-va/gzzpqxw/",
  },

  // ---- Court House (Orange / Silver) ----
  {
    name: "Bell at Courthouse",
    address: "2200 12th Ct N, Arlington, VA 22201",
    station: "Court House",
    lines: ["Orange", "Silver"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Courthouse",
    walkMin: 5,
    rideMinToDC: 10,
    rentFrom: 2989,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.apartments.com/bell-at-courthouse-arlington-va/413scyh/",
  },

  // ---- Clarendon (Orange / Silver) ----
  {
    name: "Lyon Place at Clarendon Center",
    address: "1200 N Garfield St, Arlington, VA 22201",
    station: "Clarendon",
    lines: ["Orange", "Silver"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Clarendon",
    walkMin: 2,
    rideMinToDC: 12,
    rentFrom: 2273,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.lyonplace.com/",
  },

  // ---- Virginia Square (Orange / Silver) ----
  {
    name: "The Berkeley",
    address: "1000 N Randolph St, Arlington, VA 22201",
    station: "Virginia Square-GMU",
    lines: ["Orange", "Silver"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Virginia Square",
    walkMin: 6,
    rideMinToDC: 13,
    rentFrom: 1700,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.apartments.com/the-berkeley-arlington-va/d8p99wl/",
  },

  // ---- Ballston (Orange / Silver) ----
  {
    name: "Origin Ballston",
    address: "700 N Randolph St, Arlington, VA 22203",
    station: "Ballston-MU",
    lines: ["Orange", "Silver"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Ballston",
    walkMin: 7,
    rideMinToDC: 15,
    rentFrom: 2225,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.apartments.com/origin-arlington-va/nj7jhzm/",
  },
  {
    name: "Continental Ballston",
    address: "851 N Glebe Rd, Arlington, VA 22203",
    station: "Ballston-MU",
    lines: ["Orange", "Silver"],
    corridor: "Rosslyn–Ballston",
    neighborhood: "Ballston",
    walkMin: 4,
    rideMinToDC: 15,
    rentFrom: 2150,
    beds: ["1BR", "2BR"],
    source: "https://www.apartments.com/continental-ballston-arlington-va/fktbxdr/",
  },

  // ---- Pentagon City (Blue / Yellow) ----
  {
    name: "The Bartlett",
    address: "520 12th St S, Arlington, VA 22202",
    station: "Pentagon City",
    lines: ["Blue", "Yellow"],
    corridor: "Pentagon City–Crystal City",
    neighborhood: "Pentagon City",
    walkMin: 3,
    rideMinToDC: 7,
    rentFrom: 2119,
    beds: ["Studio", "1BR", "2BR", "3BR"],
    source: "https://www.apartments.com/the-bartlett-arlington-va/hjczy92/",
  },
  {
    name: "The Gramercy at Metropolitan Park",
    address: "550 S 14th Rd, Arlington, VA 22202",
    station: "Pentagon City",
    lines: ["Blue", "Yellow"],
    corridor: "Pentagon City–Crystal City",
    neighborhood: "Pentagon City",
    walkMin: 7,
    rideMinToDC: 7,
    rentFrom: 2407,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.gramercyapts.com/",
  },

  // ---- Crystal City (Blue / Yellow) ----
  {
    name: "Crystal Towers",
    address: "1600 S Eads St, Arlington, VA 22202",
    station: "Crystal City",
    lines: ["Blue", "Yellow"],
    corridor: "Pentagon City–Crystal City",
    neighborhood: "Crystal City",
    walkMin: 8,
    rideMinToDC: 9,
    rentFrom: 1907,
    beds: ["Studio", "1BR", "2BR", "3BR"],
    source: "https://www.apartments.com/crystal-towers-arlington-va/kbf8fl9/",
  },
  {
    name: "Bell Crystal City",
    address: "2051 S Bell St, Arlington, VA 22202",
    station: "Crystal City",
    lines: ["Blue", "Yellow"],
    corridor: "Pentagon City–Crystal City",
    neighborhood: "Crystal City",
    walkMin: 5,
    rideMinToDC: 9,
    rentFrom: 1810,
    beds: ["Studio", "1BR", "2BR"],
    source: "https://www.apartments.com/crystal-city-arlington-va/",
  },
];
