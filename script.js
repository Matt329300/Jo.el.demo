// JOEL Sharing Concept – skrypty strony (bez animacji pojawiania się elementów)

(function () {
  "use strict";

  // TODO: podać adres, pod który ma trafiać formularz grup (np. https://formspree.io/f/XXXX).
  // Dopóki jest pusty, formularz nic nie wysyła i prosi o kontakt telefoniczny.
  var FORM_ENDPOINT = "";

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

  // --- Formularz większych grup ---
  var form = document.getElementById("group-form");
  var status = document.getElementById("form-status");
  if (!form) return;

  // Nie pozwalaj wybrać daty z przeszłości
  var dateInput = document.getElementById("g-date");
  if (dateInput) {
    var t = new Date();
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset());
    dateInput.min = t.toISOString().slice(0, 10);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var firstInvalid = null;
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      var field = el.closest(".field");
      var ok = el.checkValidity();
      if (field) field.classList.toggle("is-invalid", !ok);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (!ok && !firstInvalid) firstInvalid = el;
    });

    if (firstInvalid) {
      status.textContent = "Uzupełnij zaznaczone pola.";
      firstInvalid.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      status.textContent = "Formularz nie jest jeszcze podłączony. Zadzwoń: 533 765 552.";
      return;
    }

    status.textContent = "Wysyłanie…";
    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Dziękujemy! Odezwiemy się w sprawie zapytania.";
      })
      .catch(function () {
        status.textContent = "Nie udało się wysłać. Zadzwoń: 533 765 552.";
      });
  });
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
