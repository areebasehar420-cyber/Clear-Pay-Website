// ClearPay — filterable features grid
(function () {
  "use strict";

  var filterBar = document.querySelector("[data-filter-bar]");
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("[data-category]");
  var liveRegion = document.getElementById("filter-status");

  function applyFilter(category) {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var matches = category === "all" || card.getAttribute("data-category") === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    if (liveRegion) {
      liveRegion.textContent =
        visibleCount + (visibleCount === 1 ? " feature shown" : " features shown");
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });
      btn.setAttribute("aria-pressed", "true");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });
})();
