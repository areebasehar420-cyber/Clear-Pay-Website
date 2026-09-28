// ClearPay — contact form validation
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  var validators = {
    name: function (value) {
      if (!value.trim()) return "Enter your full name.";
      if (value.trim().length < 2) return "Name looks too short.";
      return "";
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Enter your email address.";
      if (!pattern.test(value.trim())) return "Enter a valid email address.";
      return "";
    },
    company: function () {
      return "";
    },
    topic: function (value) {
      if (!value) return "Choose a topic.";
      return "";
    },
    message: function (value) {
      if (!value.trim()) return "Enter a message.";
      if (value.trim().length < 10) return "Message should be at least 10 characters.";
      return "";
    }
  };

  function fieldElements(name) {
    var input = form.elements[name];
    var row = input.closest(".form-row");
    var error = row.querySelector(".error-msg");
    return { input: input, row: row, error: error };
  }

  function validateField(name) {
    var els = fieldElements(name);
    var message = validators[name] ? validators[name](els.input.value) : "";
    els.row.classList.toggle("has-error", Boolean(message));
    els.error.textContent = message;
    els.input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  Object.keys(validators).forEach(function (name) {
    var input = form.elements[name];
    if (!input) return;
    input.addEventListener("blur", function () {
      validateField(name);
    });
    input.addEventListener("input", function () {
      var row = input.closest(".form-row");
      if (row.classList.contains("has-error")) validateField(name);
    });
  });

  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    var allValid = Object.keys(validators)
      .map(validateField)
      .every(Boolean);

    if (!allValid) {
      status.textContent = "Please fix the highlighted fields before sending.";
      status.className = "form-status is-visible error";
      var firstError = form.querySelector(".has-error input, .has-error textarea, .has-error select");
      if (firstError) firstError.focus();
      return;
    }

    // No backend is wired up for this demo — simulate a successful send.
    status.textContent = "Thanks — your message has been sent. ClearPay will reply within one business day.";
    status.className = "form-status is-visible success";
    form.reset();
  });
})();
