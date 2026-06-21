// 公屋查詢前端邏輯
(function () {
  "use strict";

  const keywordInput = document.getElementById("keyword");
  const regionSelect = document.getElementById("region");
  const flatTypeSelect = document.getElementById("flatType");
  const maxRentInput = document.getElementById("maxRent");
  const maxRentValue = document.getElementById("maxRentValue");
  const resetBtn = document.getElementById("resetBtn");
  const resultsEl = document.getElementById("results");
  const resultCountEl = document.getElementById("resultCount");

  // 從資料中建立下拉選項
  function populateFilters() {
    const regions = [...new Set(HOUSING_DATA.map((e) => e.region))].sort();
    for (const r of regions) {
      regionSelect.appendChild(new Option(r, r));
    }

    const flatTypes = [
      ...new Set(HOUSING_DATA.flatMap((e) => e.flatTypes)),
    ];
    for (const t of flatTypes) {
      flatTypeSelect.appendChild(new Option(t, t));
    }
  }

  function getFilters() {
    return {
      keyword: keywordInput.value.trim(),
      region: regionSelect.value,
      flatType: flatTypeSelect.value,
      maxRent: Number(maxRentInput.value),
    };
  }

  function matches(estate, f) {
    if (f.keyword && !estate.name.includes(f.keyword)) return false;
    if (f.region && estate.region !== f.region) return false;
    if (f.flatType && !estate.flatTypes.includes(f.flatType)) return false;
    // maxRent === 0 代表不限；否則屋邨最低租金須在上限之內
    if (f.maxRent > 0 && estate.rentFrom > f.maxRent) return false;
    return true;
  }

  function formatRent(estate) {
    return `HK$${estate.rentFrom.toLocaleString()} – ${estate.rentTo.toLocaleString()}`;
  }

  function render(estates) {
    resultsEl.innerHTML = "";

    if (estates.length === 0) {
      resultCountEl.textContent = "找不到符合條件的屋邨，請放寬搜尋條件。";
      return;
    }

    resultCountEl.textContent = `共找到 ${estates.length} 個屋邨`;

    for (const e of estates) {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h2 class="card-title">${e.name}</h2>
        <p class="card-loc">${e.region} · ${e.district}</p>
        <dl class="card-meta">
          <div><dt>月租</dt><dd>${formatRent(e)}</dd></div>
          <div><dt>單位數目</dt><dd>${e.units.toLocaleString()}</dd></div>
          <div><dt>落成年份</dt><dd>${e.completed}</dd></div>
        </dl>
        <div class="tags">
          ${e.flatTypes.map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      `;
      resultsEl.appendChild(card);
    }
  }

  function update() {
    const f = getFilters();
    maxRentValue.textContent = f.maxRent === 0 ? "不限" : `HK$${f.maxRent.toLocaleString()}`;
    const filtered = HOUSING_DATA.filter((e) => matches(e, f));
    render(filtered);
  }

  function reset() {
    keywordInput.value = "";
    regionSelect.value = "";
    flatTypeSelect.value = "";
    maxRentInput.value = "0";
    update();
  }

  function init() {
    populateFilters();
    keywordInput.addEventListener("input", update);
    regionSelect.addEventListener("change", update);
    flatTypeSelect.addEventListener("change", update);
    maxRentInput.addEventListener("input", update);
    resetBtn.addEventListener("click", reset);
    update();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
