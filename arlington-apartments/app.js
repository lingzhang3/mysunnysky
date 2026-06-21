// Arlington Metro Apartments — filtering, sorting, and rendering.
(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const keywordInput = $("keyword");
  const lineSelect = $("line");
  const corridorSelect = $("corridor");
  const maxWalkInput = $("maxWalk");
  const maxWalkValue = $("maxWalkValue");
  const maxRentInput = $("maxRent");
  const maxRentValue = $("maxRentValue");
  const sortSelect = $("sort");
  const resetBtn = $("resetBtn");
  const resultsEl = $("results");
  const resultCountEl = $("resultCount");

  // Color per Metro line for the line pills.
  const LINE_COLORS = {
    Orange: "#f7941d",
    Silver: "#a1a3a1",
    Blue: "#0077c0",
    Yellow: "#ffd200",
  };

  function totalCommute(apt) {
    return apt.walkMin + apt.rideMinToDC;
  }

  function populateFilters() {
    const corridors = [...new Set(APARTMENTS.map((a) => a.corridor))].sort();
    for (const c of corridors) {
      corridorSelect.appendChild(new Option(c, c));
    }
  }

  function getFilters() {
    return {
      keyword: keywordInput.value.trim().toLowerCase(),
      line: lineSelect.value,
      corridor: corridorSelect.value,
      maxWalk: Number(maxWalkInput.value),
      maxRent: Number(maxRentInput.value),
      sort: sortSelect.value,
    };
  }

  function matches(apt, f) {
    if (f.keyword) {
      const hay = `${apt.name} ${apt.neighborhood} ${apt.station}`.toLowerCase();
      if (!hay.includes(f.keyword)) return false;
    }
    if (f.line && !apt.lines.includes(f.line)) return false;
    if (f.corridor && apt.corridor !== f.corridor) return false;
    if (f.maxWalk > 0 && apt.walkMin > f.maxWalk) return false;
    if (f.maxRent > 0 && apt.rentFrom > f.maxRent) return false;
    return true;
  }

  function sortApts(apts, sort) {
    const sorted = [...apts];
    switch (sort) {
      case "walk":
        sorted.sort((a, b) => a.walkMin - b.walkMin);
        break;
      case "rentLow":
        sorted.sort((a, b) => a.rentFrom - b.rentFrom);
        break;
      case "rentHigh":
        sorted.sort((a, b) => b.rentFrom - a.rentFrom);
        break;
      case "commute":
      default:
        sorted.sort((a, b) => totalCommute(a) - totalCommute(b));
        break;
    }
    return sorted;
  }

  function linePills(lines) {
    return lines
      .map((l) => {
        const color = LINE_COLORS[l] || "#888";
        const textColor = l === "Yellow" || l === "Silver" ? "#1f2933" : "#fff";
        return `<span class="line-pill" style="background:${color};color:${textColor}">${l}</span>`;
      })
      .join("");
  }

  function render(apts) {
    resultsEl.innerHTML = "";

    if (apts.length === 0) {
      resultCountEl.textContent = "No apartments match your filters — try loosening them.";
      return;
    }

    resultCountEl.textContent = `${apts.length} apartment${apts.length === 1 ? "" : "s"} found`;

    for (const a of apts) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <div class="card-head">
          <h2 class="card-title">${a.name}</h2>
          <div class="lines">${linePills(a.lines)}</div>
        </div>
        <p class="card-loc">${a.address}</p>
        <p class="card-sub">${a.neighborhood} · ${a.corridor}</p>
        <dl class="card-meta">
          <div><dt>Nearest Metro</dt><dd>${a.station}</dd></div>
          <div><dt>Walk to Metro</dt><dd>~${a.walkMin} min</dd></div>
          <div><dt>Ride to DC</dt><dd>~${a.rideMinToDC} min</dd></div>
          <div class="highlight"><dt>Total to DC</dt><dd>~${totalCommute(a)} min</dd></div>
          <div><dt>Starting rent</dt><dd>From $${a.rentFrom.toLocaleString()}/mo</dd></div>
        </dl>
        <div class="tags">
          ${a.beds.map((b) => `<span class="tag">${b}</span>`).join("")}
        </div>
        <a class="card-link" href="${a.source}" target="_blank" rel="noopener">View listing ↗</a>
      `;
      resultsEl.appendChild(card);
    }
  }

  function update() {
    const f = getFilters();
    maxWalkValue.textContent = f.maxWalk === 0 ? "Any" : `${f.maxWalk} min`;
    maxRentValue.textContent = f.maxRent === 0 ? "Any" : `$${f.maxRent.toLocaleString()}`;
    const filtered = sortApts(APARTMENTS.filter((a) => matches(a, f)), f.sort);
    render(filtered);
  }

  function reset() {
    keywordInput.value = "";
    lineSelect.value = "";
    corridorSelect.value = "";
    maxWalkInput.value = "0";
    maxRentInput.value = "0";
    sortSelect.value = "commute";
    update();
  }

  function init() {
    const note = document.getElementById("dataNote");
    if (note && typeof RENT_AS_OF !== "undefined") {
      note.textContent = `Real Arlington apartment communities near Metro. Starting rents gathered from public listings as of ${RENT_AS_OF}.`;
    }
    populateFilters();
    [keywordInput, maxWalkInput, maxRentInput].forEach((el) =>
      el.addEventListener("input", update)
    );
    [lineSelect, corridorSelect, sortSelect].forEach((el) =>
      el.addEventListener("change", update)
    );
    resetBtn.addEventListener("click", reset);
    update();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
