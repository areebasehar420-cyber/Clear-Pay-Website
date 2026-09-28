// ClearPay — real-time pricing calculator
(function () {
  "use strict";

  var form = document.getElementById("calculator");
  if (!form) return;

  var volumeInput = document.getElementById("volume");
  var volumeValueOut = document.getElementById("volume-value");
  var avgTicketInput = document.getElementById("avg-ticket");
  var avgTicketValueOut = document.getElementById("avg-ticket-value");
  var planInputs = form.querySelectorAll('input[name="plan"]');

  var resultAmount = document.getElementById("result-amount");
  var resultTx = document.getElementById("result-tx-count");
  var breakdownPercent = document.getElementById("breakdown-percent");
  var breakdownFlat = document.getElementById("breakdown-flat");
  var breakdownSubtotal = document.getElementById("breakdown-subtotal");
  var breakdownDiscount = document.getElementById("breakdown-discount");

  var PLANS = {
    starter: { label: "Starter", percent: 0.029, flat: 0.30, discount: 0 },
    growth: { label: "Growth", percent: 0.024, flat: 0.20, discount: 0.10 },
    scale: { label: "Scale", percent: 0.018, flat: 0.10, discount: 0.18 }
  };

  var currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
  var currencyFormatterCents = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });

  function currentPlan() {
    var checked = form.querySelector('input[name="plan"]:checked');
    return checked ? PLANS[checked.value] : PLANS.starter;
  }

  function calculate() {
    var monthlyVolume = Number(volumeInput.value);
    var avgTicket = Number(avgTicketInput.value);
    var plan = currentPlan();

    var txCount = avgTicket > 0 ? Math.round(monthlyVolume / avgTicket) : 0;
    var percentFee = monthlyVolume * plan.percent;
    var flatFee = txCount * plan.flat;
    var subtotal = percentFee + flatFee;
    var discountAmount = subtotal * plan.discount;
    var total = subtotal - discountAmount;

    volumeValueOut.textContent = currencyFormatter.format(monthlyVolume);
    avgTicketValueOut.textContent = currencyFormatterCents.format(avgTicket);

    resultAmount.textContent = currencyFormatterCents.format(total);
    resultTx.textContent = txCount.toLocaleString("en-US") + " transactions / mo";

    breakdownPercent.textContent = currencyFormatterCents.format(percentFee);
    breakdownFlat.textContent = currencyFormatterCents.format(flatFee);
    breakdownSubtotal.textContent = currencyFormatterCents.format(subtotal);
    breakdownDiscount.textContent =
      "-" + currencyFormatterCents.format(discountAmount);
  }

  form.addEventListener("input", calculate);
  calculate();
})();
