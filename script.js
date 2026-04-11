/* =========================================================
   script.js – Interactions & Animations
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar scroll + hide-on-scroll-down ---------- */
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;

      // Add/remove scrolled class
      navbar.classList.toggle('scrolled', currentY > 40);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentY > 100) {
        if (currentY > lastScrollY) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
      } else {
        navbar.classList.remove('hidden');
      }

      lastScrollY = currentY;
    }, { passive: true });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Hamburger / mobile nav ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll-reveal (fade-in) animation ---------- */
  const fadeEls = document.querySelectorAll(
    '.section-title, .section-sub, .info-card, .project-card, ' +
    '.timeline-item, .skill-card, .about-text, .contact-card, .hero-text, .hero-image-wrap'
  );

  const fadeIndexMap = new Map();
  fadeEls.forEach((el, index) => {
    el.classList.add('fade-in');
    fadeIndexMap.set(el, index);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const order = fadeIndexMap.get(entry.target) || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (order % 6) * 70);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ---------- Smooth scroll for anchor links (fallback) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        // Re-show navbar when navigating
        if (navbar) navbar.classList.remove('hidden');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
