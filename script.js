/* =========================================================
   script.js – Interactions & Animations
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Navbar scroll effect ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) {
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
  const navLinks   = document.getElementById('navLinks');

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

  fadeEls.forEach(el => el.classList.add('fade-in'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => revealObserver.observe(el));

  /* ---------- Smooth scroll for anchor links (fallback) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
