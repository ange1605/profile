// ============================================================
//  main.js — Shared behaviour across all pages
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Populate brand / initials from data ──────────────────
  if (typeof PROFILE !== 'undefined') {
    document.querySelectorAll('.nav-brand-name').forEach(el => {
      el.textContent = PROFILE.name;
    });
    document.querySelectorAll('.nav-initials').forEach(el => {
      el.textContent = PROFILE.initials;
    });
    document.querySelectorAll('.site-footer-name').forEach(el => {
      el.textContent = PROFILE.name;
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === current ||
      (current === '' && href === 'index.html') ||
      (current === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  // ── Mobile hamburger ─────────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay for sibling reveals
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el, i) => {
      if (!el.dataset.delay) el.dataset.delay = i * 80;
      observer.observe(el);
    });
  }

  // ── Avatar image fallback ─────────────────────────────────
  const avatarImg = document.querySelector('.avatar-img');
  const avatarFallback = document.querySelector('.avatar-fallback');

  if (avatarImg && avatarFallback) {
    avatarImg.addEventListener('error', () => {
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
    });
    // Trigger check if already broken (cached 404)
    if (!avatarImg.complete || avatarImg.naturalWidth === 0) {
      avatarImg.dispatchEvent(new Event('error'));
    }
  }
});