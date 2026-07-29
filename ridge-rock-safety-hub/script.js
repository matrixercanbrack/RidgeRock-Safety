"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const data = safetyHubData;
  const activeReports = data.reports.filter(item => item.active !== false);
  const activeResources = data.resources.filter(item => item.active !== false);
  const activeTalks = data.toolboxTalks
    .filter(item => item.active !== false)
    .sort((a, b) => a.number - b.number);
  const currentTalk = activeTalks.at(-1);

  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const numberLabel = number => String(number).padStart(3, "0");
  const pdfURL = fileName => `toolbox-talks/${encodeURIComponent(fileName)}`;

  $("#lastUpdated").textContent = `Last updated: ${data.lastUpdated}`;
  $("#reportCount").textContent = `${activeReports.length} reporting options`;
  $("#resourceCount").textContent = `${activeResources.length} resources`;
  $("#toolboxCount").textContent = `${activeTalks.length} talks available`;

  $("#quickLinks").innerHTML = data.quickLinks.map(item => `
    <a class="quick-card" href="${escapeHTML(item.target)}">
      <span class="quick-icon">${escapeHTML(item.icon)}</span>
      <span>${escapeHTML(item.label)}</span>
      <span aria-hidden="true">→</span>
    </a>
  `).join("");

  const createCard = item => {
    const linkClass = item.disabled ? "button button-muted" : "button button-primary";
    const attributes = item.disabled
      ? 'aria-disabled="true" tabindex="-1"'
      : 'target="_blank" rel="noopener noreferrer"';
    return `
      <article class="info-card theme-${escapeHTML(item.theme || "blue")}">
        <div class="info-icon">${escapeHTML(item.icon || "•")}</div>
        <div class="info-copy">
          <h3>${escapeHTML(item.title)}</h3>
          <p>${escapeHTML(item.description)}</p>
        </div>
        <a class="${linkClass}" href="${escapeHTML(item.url)}" ${attributes}>
          ${escapeHTML(item.buttonText)}
          ${item.disabled ? "" : '<span aria-hidden="true">↗</span>'}
        </a>
      </article>
    `;
  };

  $("#reportGrid").innerHTML = activeReports.map(createCard).join("");
  $("#resourceGrid").innerHTML = activeResources.map(createCard).join("");

  if (currentTalk) {
    $("#currentTalk").innerHTML = `
      <div class="current-number">
        <span>Current Talk</span>
        <strong>${numberLabel(currentTalk.number)}</strong>
      </div>
      <div class="current-copy">
        <span class="pill">${escapeHTML(currentTalk.category)}</span>
        <h3>${escapeHTML(currentTalk.title)}</h3>
        <p>${escapeHTML(currentTalk.description)}</p>
        <div class="current-actions">
          <a class="button button-warning" href="${pdfURL(currentTalk.fileName)}" target="_blank" rel="noopener noreferrer">Open Current Talk <span aria-hidden="true">↗</span></a>
          <a class="button button-outline" href="https://forms.cloud.microsoft/r/Q3wMn0mKvE" target="_blank" rel="noopener noreferrer">Complete Documentation <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    `;
  }

  const talkGrid = $("#talkGrid");
  const talkSearch = $("#talkSearch");
  const clearSearch = $("#clearSearch");
  const emptyState = $("#emptyState");

  function renderTalks(talks) {
    talkGrid.innerHTML = talks.map(talk => {
      const isCurrent = currentTalk && talk.number === currentTalk.number;
      return `
        <article class="talk-card ${isCurrent ? "is-current" : ""}">
          <div class="talk-card-top">
            <span class="talk-number">${numberLabel(talk.number)}</span>
            <span class="talk-category">${escapeHTML(talk.category)}</span>
          </div>
          <div>
            <div class="title-row">
              <h3>${escapeHTML(talk.title)}</h3>
              ${isCurrent ? '<span class="current-label">Current</span>' : ""}
            </div>
            <p>${escapeHTML(talk.description)}</p>
          </div>
          <a class="button button-outline" href="${pdfURL(talk.fileName)}" target="_blank" rel="noopener noreferrer">Open Toolbox Talk <span aria-hidden="true">↗</span></a>
        </article>
      `;
    }).join("");
    emptyState.hidden = talks.length > 0;
  }

  function updateSearch() {
    const query = talkSearch.value.trim().toLowerCase();
    clearSearch.hidden = query.length === 0;
    const filtered = activeTalks.filter(talk => {
      const haystack = [
        numberLabel(talk.number),
        talk.title,
        talk.category,
        talk.description,
        talk.keywords || ""
      ].join(" ").toLowerCase();
      return query.split(/\s+/).filter(Boolean).every(word => haystack.includes(word));
    });
    renderTalks(filtered);
  }

  talkSearch.addEventListener("input", updateSearch);
  clearSearch.addEventListener("click", () => {
    talkSearch.value = "";
    updateSearch();
    talkSearch.focus();
  });
  renderTalks(activeTalks);

  $("#contactGrid").innerHTML = data.contacts.map(contact => `
    <article class="contact-card">
      <div class="avatar">${escapeHTML(contact.name.split(" ").map(part => part[0]).join("").slice(0, 2))}</div>
      <div>
        <h3>${escapeHTML(contact.name)}</h3>
        <p class="contact-role">${escapeHTML(contact.role)}</p>
        <a href="tel:${contact.phone.replace(/[^\d+]/g, "")}">${escapeHTML(contact.phone)}</a>
        <a href="mailto:${escapeHTML(contact.email)}">${escapeHTML(contact.email)}</a>
      </div>
    </article>
  `).join("");

  const menuButton = $("#menuButton");
  const mainNav = $("#mainNav");
  menuButton.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
});
