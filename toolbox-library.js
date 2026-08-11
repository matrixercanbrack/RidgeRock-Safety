"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const data = safetyHubData;

  const activeTalks = data.toolboxTalks
    .filter(item => item.active !== false)
    .sort((a, b) => a.number - b.number);

  const currentTalk = activeTalks.at(-1);

  const categoryOrder = [
    "Vehicle Safety",
    "Heavy Equipment",
    "PPE",
    "Distraction Awareness",
    "Excavation",
    "Fall Prevention",
    "Heat & Weather",
    "Tools & Equipment",
    "Environmental Safety",
    "Hazard Communication",
    "Fire Prevention",
    "Traffic Control",
    "Lifting & Rigging",
    "Material Handling",
    "Injury Prevention",
    "Electrical Safety",
    "Housekeeping",
    "Emergency Response",
    "Health & Wellness",
    "General Safety",
    "Work Zone Safety",
    "Concrete & Asphalt",
    "Utility Safety",
    "Confined Space"
  ];

  const $ = selector => document.querySelector(selector);

  const escapeHTML = value => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const numberLabel = number => String(number).padStart(3, "0");

  const pdfURL = fileName =>
    `toolbox-talks/${encodeURIComponent(fileName)}`;

  const searchInput = $("#librarySearch");
  const clearSearchButton = $("#libraryClearSearch");
  const categoryGrid = $("#categoryGrid");
  const categoryReset = $("#categoryReset");
  const talkGrid = $("#libraryTalkGrid");
  const emptyState = $("#libraryEmptyState");
  const viewAllButton = $("#viewAllTalks");
  const resultsSection = $(".library-results-heading");

  let selectedCategory = "";
  let viewAll = false;

  $("#lastUpdated").textContent =
    `Last updated: ${data.lastUpdated}`;

  $("#libraryTotal").textContent =
    activeTalks.length;

  const categoryCounts = activeTalks.reduce((counts, talk) => {
    counts[talk.category] =
      (counts[talk.category] || 0) + 1;

    return counts;
  }, {});

  const usedCategories = categoryOrder
    .filter(category => categoryCounts[category] > 0)
    .concat(
      Object.keys(categoryCounts)
        .filter(category => !categoryOrder.includes(category))
        .sort((a, b) => a.localeCompare(b))
    );

  function scrollToResults() {
    setTimeout(() => {
      resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
  }

  function renderCategories() {
    categoryGrid.innerHTML = usedCategories
      .map(category => {
        const count = categoryCounts[category];
        const selected =
          selectedCategory === category;

        return `
          <button
            class="category-card ${selected ? "is-selected" : ""}"
            type="button"
            data-category="${escapeHTML(category)}"
            aria-pressed="${selected}"
          >
            <span class="category-card-name">
              ${selected ? "✓ " : ""}
              ${escapeHTML(category)}
            </span>

            <span class="category-card-count">
              <strong>${count}</strong>
              ${count === 1 ? "talk" : "talks"}
            </span>
          </button>
        `;
      })
      .join("");

    categoryReset.hidden = !selectedCategory;

    categoryGrid
      .querySelectorAll(".category-card")
      .forEach(button => {
        button.addEventListener("click", () => {
          const category =
            button.dataset.category;

          selectedCategory =
            selectedCategory === category
              ? ""
              : category;

          viewAll = true;

          renderCategories();
          renderResults();

          if (selectedCategory) {
            scrollToResults();
          }
        });
      });
  }

  function createTalkCard(talk) {
    const isCurrent =
      currentTalk &&
      talk.number === currentTalk.number;

    return `
      <article class="talk-card ${isCurrent ? "is-current" : ""}">
        <div class="talk-card-top">
          <span class="talk-number">
            ${numberLabel(talk.number)}
          </span>

          <span class="talk-category">
            ${escapeHTML(talk.category)}
          </span>
        </div>

        <div>
          <div class="title-row">
            <h3>
              ${escapeHTML(talk.title)}
            </h3>

            ${
              isCurrent
                ? '<span class="current-label">Current</span>'
                : ""
            }
          </div>

          <p>
            ${escapeHTML(talk.description)}
          </p>
        </div>

        <a
          class="button button-outline"
          href="${pdfURL(talk.fileName)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Toolbox Talk
          <span aria-hidden="true">↗</span>
        </a>
      </article>
    `;
  }

  function getFilteredTalks() {
    const query =
      searchInput.value
        .trim()
        .toLowerCase();

    return activeTalks.filter(talk => {
      const matchesCategory =
        !selectedCategory ||
        talk.category === selectedCategory;

      const haystack = [
        numberLabel(talk.number),
        talk.title,
        talk.category,
        talk.description,
        talk.keywords || ""
      ]
        .join(" ")
        .toLowerCase();

      const words =
        query
          .split(/\s+/)
          .filter(Boolean);

      const matchesSearch =
        words.every(word =>
          haystack.includes(word)
        );

      return matchesCategory && matchesSearch;
    });
  }

  function renderResults() {
    const query =
      searchInput.value.trim();

    const filtered =
      getFilteredTalks();

    clearSearchButton.hidden =
      query.length === 0;

    let talksToShow = filtered;

    const browsing =
      Boolean(
        query ||
        selectedCategory ||
        viewAll
      );

    if (!browsing) {
      talksToShow = [...filtered]
        .sort((a, b) => b.number - a.number)
        .slice(0, 6);

      $("#resultsEyebrow").textContent =
        "Recently Added";

      $("#resultsTitle").textContent =
        "Latest Toolbox Talks";

      $("#resultsDescription").textContent =
        "The newest talks in the Ridge Rock safety library.";

      viewAllButton.hidden =
        activeTalks.length <= 6;
    } else {
      talksToShow =
        [...filtered]
          .sort((a, b) => b.number - a.number);

      $("#resultsEyebrow").textContent =
        "Toolbox Talk Archive";

      if (selectedCategory && query) {
        $("#resultsTitle").textContent =
          selectedCategory;

        $("#resultsDescription").textContent =
          `${filtered.length} ${
            filtered.length === 1
              ? "talk"
              : "talks"
          } in this category matching "${query}".`;
      }

      else if (selectedCategory) {
        $("#resultsTitle").textContent =
          selectedCategory;

        $("#resultsDescription").textContent =
          `${filtered.length} ${
            filtered.length === 1
              ? "talk"
              : "talks"
          } in this category.`;
      }

      else if (query) {
        $("#resultsTitle").textContent =
          "Search Results";

        $("#resultsDescription").textContent =
          `${filtered.length} ${
            filtered.length === 1
              ? "talk"
              : "talks"
          } matching "${query}".`;
      }

      else {
        $("#resultsTitle").textContent =
          "All Toolbox Talks";

        $("#resultsDescription").textContent =
          `${filtered.length} ${
            filtered.length === 1
              ? "talk"
              : "talks"
          } in the complete archive.`;
      }

      viewAllButton.hidden = true;
    }

    talkGrid.innerHTML =
      talksToShow
        .map(createTalkCard)
        .join("");

    emptyState.hidden =
      talksToShow.length > 0;
  }

  searchInput.addEventListener("input", () => {
    viewAll = true;
    renderResults();
  });

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

  viewAllButton.addEventListener("click", () => {
    viewAll = true;
    renderResults();
    scrollToResults();
  });

  const menuButton =
    $("#menuButton");

  const mainNav =
    $("#mainNav");

  menuButton.addEventListener("click", () => {
    const open =
      mainNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(open)
    );
  });

  mainNav
    .querySelectorAll("a")
    .forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });

  renderCategories();
  renderResults();
});
