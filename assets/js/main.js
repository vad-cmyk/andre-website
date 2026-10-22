/* Vercel Analytics stub — queues events until /_vercel/insights/script.js loads. */
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- track "Email us" clicks as a conversion event ---------- */
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      window.va("event", { name: "email_click", data: { page: location.pathname } });
    });
  });

  /* ---------- non-blocking font stylesheet swap (CSP-safe, no inline handlers) ---------- */
  document.querySelectorAll("link[data-font-swap]").forEach((link) => {
    const activate = () => { link.media = "all"; };
    if (link.sheet) activate();
    else link.addEventListener("load", activate, { once: true });
  });

  /* ---------- mobile nav ---------- */
  const navToggle = document.querySelector("[data-nav-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- sticky nav shadow on scroll ---------- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 12
        ? "0 12px 30px -18px rgba(0,0,0,0.5)"
        : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- generic scroll reveals + stroke underlines ---------- */
  const revealTargets = document.querySelectorAll(".reveal, .stroke-underline");
  if (reducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- count-up stats ---------- */
  const counters = document.querySelectorAll("[data-count-to]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.countTo);
    const suffix = el.dataset.countSuffix || "";
    if (reducedMotion) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      const cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              cio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => cio.observe(el));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- brushstroke reveal ---------- */
  const brushEls = document.querySelectorAll(".brush-reveal");
  const runBrush = (el) => {
    if (reducedMotion) {
      el.style.setProperty("--reveal", "112%");
      return;
    }
    const duration = 1700;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.style.setProperty("--reveal", `${(eased * 112).toFixed(1)}%`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (brushEls.length) {
    if ("IntersectionObserver" in window) {
      const bio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              runBrush(entry.target);
              bio.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      brushEls.forEach((el) => bio.observe(el));
    } else {
      brushEls.forEach(runBrush);
    }
  }

  /* ---------- gallery filter (only present on gallery.html) ---------- */
  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll("[data-category]");
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        galleryItems.forEach((item) => {
          const match = filter === "all" || item.dataset.category === filter;
          item.style.display = match ? "" : "none";
        });
      });
    });
  }

  /* ---------- current year in footer ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
