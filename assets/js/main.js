/* 66221 Living — site behaviour (no dependencies) */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Mobile menu ---------- */
  var mb = $(".menu-btn"), nav = $(".nav");
  if (mb && nav) mb.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o ? "true" : "false");
  });

  /* ---------- Year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -40px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* ---------- Cookie notice ---------- */
  var ck = $(".cookie");
  try {
    if (ck && !localStorage.getItem("ck66221")) ck.classList.add("show");
  } catch (e) { if (ck) ck.classList.add("show"); }
  $$("[data-cookie]").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("ck66221", b.getAttribute("data-cookie")); } catch (e) {}
      if (b.getAttribute("data-cookie") === "essential") {
        (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
      }
      ck.classList.remove("show");
    });
  });

  /* ---------- Click-to-load YouTube (privacy-enhanced) ---------- */
  $$(".video[data-yt]").forEach(function (v) {
    var id = v.getAttribute("data-yt"), t = v.getAttribute("data-title") || "Video";
    v.style.backgroundImage = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
    v.innerHTML = '<button class="play" aria-label="Play: ' + t.replace(/"/g, "") + '"></button><span class="vt">' + t + "</span>";
    v.addEventListener("click", function () {
      v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '?autoplay=1&rel=0" title="' + t.replace(/"/g, "") + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }, { once: true });
  });

  /* ---------- Form relay (address is assembled at send time, never in markup) ---------- */
  function relay() {
    var k = S._k || [];
    var d = function (x) { return atob(x).split("").reverse().join(""); };
    return "https://formsubmit.co/ajax/" + d(k[0]) + "@" + d(k[1]);
  }

  function validStep(step) {
    var ok = true;
    $$("input,select,textarea", step).forEach(function (f) {
      if (!f.checkValidity()) { ok = false; }
    });
    if (!ok) {
      var bad = $$("input,select,textarea", step).filter(function (f) { return !f.checkValidity(); })[0];
      if (bad) bad.reportValidity();
    }
    return ok;
  }

  /* Multi-step forms */
  $$("form[data-steps]").forEach(function (form) {
    var steps = $$(".step", form), i = 0;
    var bar = $(".progress i", form), lab = $(".step-label", form);
    function show(n) {
      steps.forEach(function (s, k) { s.classList.toggle("active", k === n); });
      i = n;
      if (bar) bar.style.width = ((n + 1) / steps.length * 100) + "%";
      if (lab) lab.textContent = "Step " + (n + 1) + " of " + steps.length;
      var first = $("input,select,textarea", steps[n]);
      if (first && n > 0) first.focus({ preventScroll: true });
    }
    $$("[data-next]", form).forEach(function (b) {
      b.addEventListener("click", function () { if (validStep(steps[i])) show(Math.min(i + 1, steps.length - 1)); });
    });
    $$("[data-prev]", form).forEach(function (b) {
      b.addEventListener("click", function () { show(Math.max(i - 1, 0)); });
    });
    /* auto-advance on single-choice tiles */
    $$(".step[data-auto] input[type=radio]", form).forEach(function (r) {
      r.addEventListener("change", function () { setTimeout(function () { if (i < steps.length - 1) show(i + 1); }, 180); });
    });
    show(0);
  });

  /* Preselect service from ?service= */
  try {
    var qs = new URLSearchParams(location.search), sv = qs.get("service");
    if (sv) $$('input[name="service"]').forEach(function (r) { if (r.value === sv) r.checked = true; });
  } catch (e) {}

  /* Submit handler for every relay form */
  $$("form[data-relay]").forEach(function (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = $(".form-msg", form);
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (form.querySelector('[name="_honey"]') && form.querySelector('[name="_honey"]').value) return;
      var btn = form.querySelector('[type="submit"]'), label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      var data = {};
      new FormData(form).forEach(function (v, k) {
        if (k === "_honey") return;
        data[k] = data[k] ? data[k] + ", " + v : v;
      });
      data._subject = "[66221.com] " + (form.getAttribute("data-relay") || "Form") + " — " + (data.name || data.email || "new submission");
      data._template = "table";
      data._captcha = "false";
      data.page = location.pathname;
      data.submitted = new Date().toISOString();
      fetch(relay(), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && String(res.j.success) !== "false") {
            location.href = "/thank-you.html?f=" + encodeURIComponent(form.getAttribute("data-relay") || "form");
          } else { throw new Error("relay"); }
        })
        .catch(function () {
          if (msg) { msg.className = "form-msg err"; msg.textContent = "We couldn't send that just now. Please try again in a minute."; }
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  });

  /* ---------- Support page: payment links ---------- */
  var P = S.payments || {};
  $$("[data-pay]").forEach(function (a) {
    var url = P[a.getAttribute("data-pay")];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = "#pledge"; }
  });
  $$("[data-amount]").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = $("#pledge-amount"); if (f) f.value = b.getAttribute("data-amount");
    });
  });

  /* ---------- Thank-you page message ---------- */
  var ty = $("[data-ty]");
  if (ty) {
    var f = new URLSearchParams(location.search).get("f") || "";
    var map = {
      "Quote request": "Your project details are in. Expect contact from up to three vetted local pros, usually within one business day.",
      "Home value request": "Your home-value request is in. A local market specialist will prepare your estimate and reach out.",
      "Rate check": "Your rate-check request is in. A licensed loan officer will follow up — no credit pull until you say so.",
      "Donation pledge": "Thank you for backing independent local information in 66221. We'll reply with secure payment details.",
      "Contest entry": "Your entry is received. Winners are announced on the Contests page and notified directly.",
      "Job application": "Thanks for applying. We review every application and reply to shortlisted candidates within two weeks.",
      "Advertising inquiry": "Thanks — our partnerships desk will send the media kit and availability shortly.",
      "Newsletter": "You're on the list. The 66221 Weekly lands every Friday morning.",
      "Business listing": "Thanks — we'll review your listing and confirm by email before it goes live.",
      "Event submission": "Thanks — your event is in the review queue. We'll email you when it's published.",
      "Neighbour poll": "Vote counted. Results are shared in the 66221 Weekly.",
      "Contact": "Message received. We usually reply within two business days."
    };
    if (map[f]) ty.textContent = map[f];
  }

  /* ---------- Calculators ---------- */
  var money = function (n) { return isFinite(n) ? "$" + Math.round(n).toLocaleString("en-US") : "—"; };
  var num = function (id) { var e = document.getElementById(id); return e ? parseFloat(e.value) || 0 : 0; };
  var out = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = v; };

  function mortgage() {
    if (!document.getElementById("m-price")) return;
    var price = num("m-price"), downPct = num("m-down"), rate = num("m-rate") / 100 / 12, yrs = num("m-term"),
        mills = num("m-mills"), ins = num("m-ins"), hoa = num("m-hoa");
    var loan = price * (1 - downPct / 100), n = yrs * 12;
    var pi = rate ? loan * rate / (1 - Math.pow(1 + rate, -n)) : loan / n;
    var tax = price * 0.115 * mills / 1000 / 12;
    var pmi = downPct < 20 ? loan * 0.006 / 12 : 0;
    var insM = ins / 12, total = pi + tax + insM + pmi + hoa;
    out("m-total", money(total) + "/mo");
    out("m-pi", money(pi)); out("m-tax", money(tax)); out("m-insout", money(insM)); out("m-pmi", money(pmi)); out("m-hoaout", money(hoa));
    out("m-loan", money(loan)); out("m-downval", downPct + "%");
    var bar = document.getElementById("m-bar");
    if (bar && total > 0) {
      var parts = [[pi, "var(--ink)"], [tax, "var(--wheat)"], [insM, "var(--prairie)"], [pmi, "var(--alert)"], [hoa, "var(--sky)"]];
      bar.innerHTML = parts.map(function (p) { return '<i style="width:' + (p[0] / total * 100) + "%;background:" + p[1] + '"></i>'; }).join("");
    }
    var inc = num("m-income");
    if (inc > 0) {
      var dti = total / (inc / 12) * 100, verdict = dti <= 28 ? "Comfortable" : dti <= 36 ? "Stretch" : "Difficult";
      out("m-dti", dti.toFixed(1) + "% of gross income — " + verdict);
    } else out("m-dti", "Add your household income to see affordability");
  }

  function propTax() {
    if (!document.getElementById("t-value")) return;
    var v = num("t-value"), mills = num("t-mills");
    var assessed = v * 0.115, yr = assessed * mills / 1000;
    out("t-assessed", money(assessed)); out("t-year", money(yr)); out("t-half", money(yr / 2)); out("t-month", money(yr / 12));
  }

  function roof() {
    if (!document.getElementById("r-sqft")) return;
    var sq = num("r-sqft"), pitch = parseFloat(document.getElementById("r-pitch").value), mat = document.getElementById("r-mat").value;
    var rates = { arch: [4.5, 7.5], impact: [5.5, 9], metal: [10, 16], tear: [0.75, 1.5] };
    var area = sq * pitch, r = rates[mat] || rates.arch;
    var lo = area * (r[0] + rates.tear[0]), hi = area * (r[1] + rates.tear[1]);
    out("r-area", Math.round(area).toLocaleString() + " sq ft of roof (≈" + Math.round(area / 100) + " squares)");
    out("r-range", money(lo) + " – " + money(hi));
    var ded = num("r-ded"), dedAmt = ded > 100 ? ded : ded / 100 * num("r-home");
    out("r-oop", ded ? "Your deductible: " + money(dedAmt) + " (typical out-of-pocket on an approved claim)" : "");
  }

  function netSheet() {
    if (!document.getElementById("n-price")) return;
    var p = num("n-price"), owed = num("n-owed"), comm = num("n-comm"), close = num("n-close"), rep = num("n-rep");
    var c = p * comm / 100, cl = p * close / 100, net = p - owed - c - cl - rep;
    out("n-commout", money(c)); out("n-closeout", money(cl)); out("n-net", money(net));
  }

  function rentBuy() {
    if (!document.getElementById("rb-rent")) return;
    var rent = num("rb-rent"), price = num("rb-price"), yrs = num("rb-years"), app = num("rb-app") / 100, rentUp = 0.035;
    var down = price * 0.2, loan = price - down, rate = 0.065 / 12, n = 360;
    var pi = loan * rate / (1 - Math.pow(1 + rate, -n));
    var own = 0, rnt = 0, bal = loan;
    for (var m = 0; m < yrs * 12; m++) {
      var intr = bal * rate; bal -= (pi - intr);
      own += intr + price * 0.115 * 0.125 / 12 + price * 0.0045 / 12 + price * 0.01 / 12;
      rnt += rent * Math.pow(1 + rentUp, Math.floor(m / 12));
    }
    var value = price * Math.pow(1 + app, yrs), sellCost = value * 0.07;
    var ownNet = own + price * 0.03 + sellCost - (value - price) + down * (Math.pow(1.045, yrs) - 1);
    out("rb-own", money(ownNet)); out("rb-rentout", money(rnt));
    out("rb-verdict", ownNet < rnt ? "Buying comes out ahead by " + money(rnt - ownNet) + " over " + yrs + " years." :
      "Renting comes out ahead by " + money(ownNet - rnt) + " over " + yrs + " years.");
  }

  function all() { mortgage(); propTax(); roof(); netSheet(); rentBuy(); }
  $$(".tool input,.tool select").forEach(function (e) { e.addEventListener("input", all); });
  all();
})();
