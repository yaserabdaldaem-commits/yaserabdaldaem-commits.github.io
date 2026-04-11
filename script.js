const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const sections = document.querySelectorAll("main section[id]");

function updateActiveLink() {
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const active = scrollPos >= top && scrollPos < bottom;
    const targetLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (targetLink) {
      targetLink.classList.toggle("active", active);
    }
  });
}

function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle("scrolled", window.scrollY > 20);
}

const revealTargets = document.querySelectorAll(
  ".section-title, .section-subtitle, .about-box, .project-card, .edu-card, .skills-grid li, .contact-box, .hero-content, .hero-media"
);

revealTargets.forEach((node) => {
  node.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((node) => observer.observe(node));

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveLink();
}, { passive: true });

updateHeaderState();
updateActiveLink();
