"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const data = sdsLibraryData;
  const sheets = [...data.sheets];

  const $ = selector => document.querySelector(selector);

  const escapeHTML = value => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const fileURL = fileName => `sds/${encodeURIComponent(fileName)}`;

  const searchInput = $("#sdsSearch");
  const clearSearchButton = $("#sdsClearSearch");
  const categoryGrid = $("#sdsCategoryGrid");
  const categoryReset = $("#sdsCategoryReset");
  const sdsGrid = $("#sdsGrid");
  const emptyState = $("#sdsEmptyState");
  const resultsSection = $("#sdsResults");

  let selectedCategory = "";

  $("#sdsTotal").textContent = sheets.length;
  $("#sdsLastUpdated").textContent = `Last updated: ${data.lastUpdated}`;
  $("#completePackageLink").href = fileURL(data.completePackage.fileName);

  const categoryCounts = sheets.reduce((counts, sheet) => {
    counts[sheet.category] = (counts[sheet.category] || 0) + 1;
    return counts;
  }, {});

  const usedCategories = data.categories
    .filter(category => categoryCounts[category] > 0)
    .concat(
      Object.keys(categoryCounts)
        .filter(category => !data.categories.includes(category))
        .sort((a, b) => a.localeCompare(b))
    );

  function scrollToResults() {
    if (!resultsSection) return;

    setTimeout(() => {
      resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  }

  function renderCategories() {
    categoryGrid.innerHTML = usedCategories.map(category => {
      const count = categoryCounts[category];
      const selected = selectedCategory === category;

      return `
        <button
          class="sds-category-card ${selected ? "is-selected" : ""}"
          type="button"
          data-category="${escapeHTML(category)}"
          aria-pressed="${selected}"
        >
          <span class="sds-category-name">
            ${selected ? "✓ " : ""}${escapeHTML(category)}
          </span>

          <span class="sds-category-count">
            <strong>${count}</strong>
            ${count === 1 ? "SDS" : "SDSs"}
          </span>
        </button>
      `;
    }).join("");

    categoryReset.hidden = !selectedCategory;

    categoryGrid.querySelectorAll(".sds-category-card").forEach(button => {
      button.addEventListener("click", () => {
        const category = button.dataset.category;

        selectedCategory =
          selectedCategory === category ? "" : category;

        renderCategories();
        renderResults();

        if (selectedCategory) {
          scrollToResults();
        }
      });
    });
  }

  function createCard(sheet) {
    return `
      <article class="sds-card">
        <div class="sds-card-top">
          <span class="sds-card-number">${String(sheet.number).padStart(2, "0")}</span>
          <span class="sds-card-category">${escapeHTML(sheet.category)}</span>
        </div>

        <div class="sds-card-copy">
          <h3>${escapeHTML(sheet.title)}</h3>
          <p class="sds-manufacturer">${escapeHTML(sheet.manufacturer)}</p>
        </div>

        <a
          class="button button-outline"
          href="${fileURL(sheet.fileName)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open SDS <span aria-hidden="true">↗</span>
        </a>
      </article>
    `;
  }

  function getFilteredSheets() {
    const query = searchInput.value.trim().toLowerCase();

    return sheets.filter(sheet => {
      const matchesCategory =
        !selectedCategory || sheet.category === selectedCategory;

      const haystack = [
        sheet.title,
        sheet.manufacturer,
        sheet.category,
        sheet.keywords || ""
      ].join(" ").toLowerCase();

      const words = query.split(/\s+/).filter(Boolean);
      const matchesSearch = words.every(word => haystack.includes(word));

      return matchesCategory && matchesSearch;
    });
  }

  function renderResults() {
    const query = searchInput.value.trim();
    const filtered = getFilteredSheets();

    clearSearchButton.hidden = query.length === 0;

    $("#sdsResultCount").textContent =
      `${filtered.length} ${filtered.length === 1 ? "SDS" : "SDSs"}`;

    if (selectedCategory && query) {
      $("#sdsResultsEyebrow").textContent = "Filtered Results";
      $("#sdsResultsTitle").textContent = selectedCategory;
      $("#sdsResultsDescription").textContent =
        `${filtered.length} ${filtered.length === 1 ? "SDS" : "SDSs"} matching "${query}".`;
    } else if (selectedCategory) {
      $("#sdsResultsEyebrow").textContent = "Category";
      $("#sdsResultsTitle").textContent = selectedCategory;
      $("#sdsResultsDescription").textContent =
        `${filtered.length} ${filtered.length === 1 ? "SDS" : "SDSs"} in this category.`;
    } else if (query) {
      $("#sdsResultsEyebrow").textContent = "Search Results";
      $("#sdsResultsTitle").textContent = "Matching Safety Data Sheets";
      $("#sdsResultsDescription").textContent =
        `${filtered.length} ${filtered.length === 1 ? "SDS" : "SDSs"} matching "${query}".`;
    } else {
      $("#sdsResultsEyebrow").textContent = "All Safety Data Sheets";
      $("#sdsResultsTitle").textContent = "All SDSs";
      $("#sdsResultsDescription").textContent =
        "Browse all Safety Data Sheets currently in the Ridge Rock library.";
    }

    sdsGrid.innerHTML = filtered.map(createCard).join("");
    emptyState.hidden = filtered.length > 0;
  }

  searchInput.addEventListener("input", renderResults);

  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    renderResults();
    searchInput.focus();
  });

  categoryReset.addEventListener("click", () => {
    selectedCategory = "";
    renderCategories();
    renderResults();
  });

  const menuButton = $("#menuButton");
  const mainNav = $("#mainNav");

  menuButton.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  renderCategories();
  renderResults();
});
