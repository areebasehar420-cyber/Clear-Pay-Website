// ClearPay — shared behaviour: theme toggle, mobile nav, scroll reveal
(function () {
  "use strict";

  /* ---------- Theme persistence ---------- */
  var STORAGE_KEY = "clearpay-theme";
  var root = document.documentElement;
  var toggleBtn = document.querySelector("[data-theme-toggle]");

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      /* localStorage unavailable (private mode) — theme just won't persist */
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      var isDark = theme === "dark";
      toggleBtn.setAttribute("aria-pressed", String(isDark));
      var label = toggleBtn.querySelector(".toggle-label");
      if (label) label.textContent = isDark ? "Dark" : "Light";
    }
  }

  var initial = getStoredTheme();
  if (!initial) {
    initial = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  applyTheme(initial);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      storeTheme(next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var primaryNav = document.getElementById("primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    primaryNav.addEventListener("click", function (evt) {
      if (evt.target.tagName === "A" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
