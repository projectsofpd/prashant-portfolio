/* ══════════════════════════════
   PRASHANT DWIVEDI — PORTFOLIO
   script.js
══════════════════════════════ */

// ── Footer year ──
document.getElementById('year').textContent = '© ' + new Date().getFullYear();

// ── Hide photo placeholder if no image file found ──
const profileImg = document.getElementById('profile-img');
const photoWrap  = document.getElementById('photo-wrap');
if (photoWrap && profileImg) {
  const src = profileImg.getAttribute('src') || '';
  if (!src || src === window.location.href) {
    photoWrap.style.display = 'none';
  }
}

// ── Reduced motion preference ──
const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════════
   SCROLL REVEAL
   Fades in .exp-item and .prog-card as they enter the viewport
══════════════════════════════ */
const revealEls = document.querySelectorAll('.exp-item, .prog-card');

if (noMotion) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ══════════════════════════════
   COUNT-UP ANIMATION
   Works on any element with [data-count].
   Optional: [data-prefix] and [data-suffix]
══════════════════════════════ */

/**
 * Animates a counter from 0 to its data-count value.
 * @param {HTMLElement} el
 */
function animateCount(el) {
  const target   = parseInt(el.getAttribute('data-count'), 10);
  const prefix   = el.getAttribute('data-prefix') || '';
  const suffix   = el.getAttribute('data-suffix') || '';
  const duration = 1300; // ms

  if (noMotion) {
    el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
    return;
  }

  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = Math.floor(eased * target);

    el.textContent = prefix + current.toLocaleString('en-IN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = prefix + target.toLocaleString('en-IN') + suffix;
    }
  }

  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

counters.forEach(counter => countObserver.observe(counter));

/* ══════════════════════════════
   ACTIVE NAV HIGHLIGHT
   Updates nav link colour for the section currently in view
══════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], header[id], footer[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));
