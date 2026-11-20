// JOEL Sharing Concept – skrypty strony (bez animacji pojawiania się elementów)

(function () {
  "use strict";

  // --- Menu mobilne ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });
  }

  // --- Rok w stopce ---
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

// --- Zakładki menu (Jedzenie / Napoje) ---
// Bez JS obie karty są widoczne; skrypt ukrywa nieaktywną.
(function () {
  "use strict";
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".menu-tab"));
  if (!tabs.length) return;

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  }

  document.querySelectorAll(".menu-panel[data-hidden]").forEach(function (p) { p.hidden = true; });

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { select(tab); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
})();

// --- Karuzela opinii (zmienia się sama co kilka sekund) ---
// Zatrzymuje się po najechaniu, przy fokusie i gdy karta jest w tle.
// Przy "ograniczonym ruchu" nie przewija się sama.
(function () {
  "use strict";
  var track = document.getElementById("reviews-track");
  if (!track) return;
  var slides = Array.prototype.slice.call(track.querySelectorAll(".review"));
  var prev = document.getElementById("reviews-prev");
  var next = document.getElementById("reviews-next");
  var section = track.closest(".reviews");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DELAY = 6000;
  var index = 0, timer = null, paused = false;

  function go(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) {
      var on = n === index;
      s.classList.toggle("is-active", on);
      s.setAttribute("aria-hidden", String(!on));
    });
  }

  function start() {
    if (reduce || paused || timer) return;
    timer = setInterval(function () { go(index + 1); }, DELAY);
  }
  function stop() { clearInterval(timer); timer = null; }
  function restart() { stop(); start(); }

  prev.addEventListener("click", function () { go(index - 1); restart(); });
  next.addEventListener("click", function () { go(index + 1); restart(); });

  section.addEventListener("mouseenter", function () { paused = true; stop(); });
  section.addEventListener("mouseleave", function () { paused = false; start(); });
  section.addEventListener("focusin", function () { paused = true; stop(); });
  section.addEventListener("focusout", function (e) {
    if (!section.contains(e.relatedTarget)) { paused = false; start(); }
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  go(0);
  start();
})();
