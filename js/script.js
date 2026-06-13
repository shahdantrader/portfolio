/**
 * script.js — Khairul Shahdan Portfolio
 *
 * Contents:
 *  1. DATA        — Projects, skills, experience (edit here to update your content)
 *  2. RENDER      — Dynamically builds project cards, skills, and timeline
 *  3. NAV         — Sticky nav, active link highlighting, mobile menu
 *  4. SCROLL FX   — Intersection Observer reveal animations
 *  5. FORM        — Client-side validation + Formspree async submission
 *  6. UTILITIES   — Back to top, footer year, Lucide icon init
 */

/* ============================================================
   1. DATA — Edit this section to personalise your portfolio
   ============================================================ */

/** ── PROJECTS ─────────────────────────────────────────────
 *  Add, remove, or reorder objects in this array.
 *  Fields:
 *    title     (string)  — displayed as card heading
 *    desc      (string)  — short description (1–2 sentences)
 *    tags      (array)   — technology tags shown at card bottom
 *    github    (string)  — GitHub repo URL (or null to hide icon)
 *    live      (string)  — live demo URL (or null to hide icon)
 *    featured  (bool)    — reserved for future filtering feature
 */
const PROJECTS = [
  {
    title: "Government Financial System — Core Platform",
    desc:
      "Technical lead for a nationwide mission-critical government financial system. Oversaw Change Requests, release approvals, and structured deployments across Dev, Staging, DR, and Production environments.",
    tags: ["Java", "PL/SQL", "Oracle 12c", "Spring MVC", "WebLogic 12c"],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: "Oracle DB Architecture & Automation",
    desc:
      "Designed and optimised PL/SQL stored procedures and complex SQL queries handling multi-million record datasets with zero data loss. Automated RMAN log maintenance and DB refresh cycles via standardised scripting.",
    tags: ["Oracle 12c", "PL/SQL", "RMAN", "Shell Scripting"],
    github: null,
    live: null,
    featured: true,
  },
  {
    title: "Cross-Platform Mobile Applications",
    desc:
      "Led front-end development team building cross-platform iOS and Android applications using ReactJS. Managed full project lifecycle with Scrum methodology, CI/CD pipeline via Jira, and API integration with Slim backend.",
    tags: ["ReactJS", "JavaScript", "Expo", "Jira", "Figma"],
    github: "https://github.com/shahdantrade",
    live: null,
    featured: true,
  },
  {
    title: "Security Posture & Compliance Programme",
    desc:
      "Implemented secure access architecture for Production and DRC environments. Led comprehensive security assessments including IPT, EPT, WASA, HVA-VA, HVA-CA, and DSA with full remediation execution.",
    tags: ["Security", "SSL/TLS", "WebLogic", "Compliance"],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: "SVN Release Governance Framework",
    desc:
      "Established SVN branching standards, commit controls, and release labelling to minimise deployment risk and improve release integrity across a large enterprise development team.",
    tags: ["SVN", "DevOps", "Release Mgmt", "Governance"],
    github: null,
    live: null,
    featured: false,
  },
  {
    title: "Cartoola Web & Mobile Platform",
    desc:
      "Developed the cartoola.my / cartoola.com.sg web platform from ground up. Implemented redesigns, built hybrid web-apps with Joomla integration, and delivered Android and iOS applications.",
    tags: ["PHP", "Joomla", "JavaScript", "Android", "iOS"],
    github: "https://github.com/shahdantrade",
    live: null,
    featured: false,
  },
];

/** ── SKILLS ───────────────────────────────────────────────
 *  Group your skills into named categories.
 */
const SKILLS = [
  {
    category: "Languages & Backend",
    tags: ["Java", "PL/SQL", "JavaScript", "PHP", "SQL", "Bash / Shell"],
  },
  {
    category: "Frontend & Mobile",
    tags: ["ReactJS", "Spring MVC", "HTML5", "CSS3", "Tailwind CSS", "AngularJS", "Swift 5"],
  },
  {
    category: "Databases",
    tags: ["Oracle 12c", "MySQL", "MSSQL", "RMAN"],
  },
  {
    category: "Infrastructure & DevOps",
    tags: ["WebLogic 12c", "SVN", "Ansible", "SSL/TLS", "CI/CD", "Jira", "Expo"],
  },
  {
    category: "Tools & Design",
    tags: ["Figma", "Adobe XD", "Postman", "Power BI", "Xcode", "VSCode"],
  },
  {
    category: "Methodologies & Certs",
    tags: ["Scrum", "Kanban", "Business Analysis", "Cybersecurity", "SDLC", "System Analysis"],
  },
];

/** ── EXPERIENCE ───────────────────────────────────────────
 *  Timeline entries, most recent first.
 */
const EXPERIENCE = [
  {
    period: "Sep 2023 — Present",
    company: "Strateq Group Of Companies · Kuala Lumpur",
    role: "Technical Team Lead cum System Analyst",
    desc:
      "Leading end-to-end technical governance for a mission-critical government financial system. Managing SLA-driven service operations across ~16,000 support tickets, overseeing Change Requests, release approvals, and deployments across Dev, Staging, DR, and Production. Primary technical liaison between business, infrastructure, security, and development teams.",
  },
  {
    period: "Feb 2023 — Jun 2023",
    company: "MTS-I SDN. BHD. · Kuala Lumpur",
    role: "Application Developer",
    desc:
      "Led front-end development team across the full project lifecycle using Scrum and Jira. Designed UI/UX in Figma and Adobe XD, developed and deployed cross-platform iOS and Android apps with ReactJS, and managed API integration with a Slim backend.",
  },
  {
    period: "Dec 2021 — Feb 2023",
    company: "EDCOIN DEFI",
    role: "Senior Web3 Mobile Developer",
    desc:
      "Delivered Web3 and mobile development work in the decentralised finance space, contributing to blockchain-integrated application features and mobile experiences.",
  },
  {
    period: "Sep 2018 — Nov 2021",
    company: "Rania Resources · Cyberjaya",
    role: "Application Engineer",
    desc:
      "3+ years of full-stack application engineering delivering web and mobile solutions. Responsible for feature development, system integration, and maintenance across client-facing applications.",
  },
  {
    period: "Jun 2017 — Jun 2018",
    company: "Vbid Marketing · Kuala Lumpur",
    role: "Web / Mobile Developer",
    desc:
      "Developed the cartoola.my and cartoola.com.sg platforms. Implemented design revamps, built hybrid web-apps with Joomla, and delivered Android and iOS hybrid applications.",
  },
  {
    period: "Nov 2016 — Jan 2017",
    company: "IRIDEA · Selangor",
    role: "Software Engineer",
    desc:
      "Developed iOS and Android applications. Contributed to both front-end and back-end development and web development within a fast-paced software studio environment.",
  },
];

/* ============================================================
   2. RENDER — Build DOM from data arrays
   ============================================================ */

/**
 * Renders project cards into #projectsGrid.
 * Each card uses CSS classes defined in style.css.
 */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  PROJECTS.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    // Stagger the reveal animation delay
    card.style.transitionDelay = `${index * 60}ms`;
    card.setAttribute("aria-label", project.title);

    // Build tag HTML
    const tagsHtml = project.tags
      .map((tag) => `<span class="project-tag">${tag}</span>`)
      .join("");

    // Build link icons (only render if URL is provided)
    const githubLink = project.github
      ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer"
           class="project-card__link" aria-label="View source on GitHub" title="GitHub">
           <i data-lucide="github"></i>
         </a>`
      : "";

    const liveLink = project.live
      ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer"
           class="project-card__link" aria-label="View live demo" title="Live demo">
           <i data-lucide="external-link"></i>
         </a>`
      : "";

    card.innerHTML = `
      <div class="project-card__header">
        <div class="project-card__icon">
          <i data-lucide="folder"></i>
        </div>
        <div class="project-card__links">
          ${githubLink}
          ${liveLink}
        </div>
      </div>
      <h3 class="project-card__title">${project.title}</h3>
      <p class="project-card__desc">${project.desc}</p>
      <div class="project-card__tags">${tagsHtml}</div>
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);

  // Re-initialise Lucide icons for newly inserted elements
  if (window.lucide) lucide.createIcons();
}

/**
 * Renders skill categories + tags into #skillsContainer.
 */
function renderSkills() {
  const container = document.getElementById("skillsContainer");
  if (!container) return;

  const fragment = document.createDocumentFragment();

  SKILLS.forEach((group) => {
    const div = document.createElement("div");
    div.className = "skills__category";

    const tagsHtml = group.tags
      .map((tag) => `<span class="skill-tag">${tag}</span>`)
      .join("");

    div.innerHTML = `
      <p class="skills__category-label">${group.category}</p>
      <div class="skills__tags">${tagsHtml}</div>
    `;

    fragment.appendChild(div);
  });

  container.appendChild(fragment);
}

/**
 * Renders experience items into #timelineContainer.
 */
function renderTimeline() {
  const timeline = document.getElementById("timelineContainer");
  if (!timeline) return;

  const fragment = document.createDocumentFragment();

  EXPERIENCE.forEach((job) => {
    const item = document.createElement("div");
    item.className = "timeline__item reveal";

    item.innerHTML = `
      <div class="timeline__meta">
        <p class="timeline__period">${job.period}</p>
        <p class="timeline__company">${job.company}</p>
      </div>
      <div class="timeline__body">
        <h4 class="timeline__role">${job.role}</h4>
        <p class="timeline__desc">${job.desc}</p>
      </div>
    `;

    fragment.appendChild(item);
  });

  timeline.appendChild(fragment);
}

/* ============================================================
   3. NAVIGATION
   ============================================================ */

function initNav() {
  const nav        = document.getElementById("nav");
  const burger     = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("navMobile");
  const mobileLinks = document.querySelectorAll(".nav__mobile-link");
  const navLinks    = document.querySelectorAll(".nav__link");

  if (!nav) return;

  // ── Sticky / scrolled state ──────────────────────────────
  const SCROLL_THRESHOLD = 60;

  function handleNavScroll() {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    nav.classList.toggle("is-scrolled", scrolled);
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  // ── Mobile burger toggle ─────────────────────────────────
  function openMenu() {
    burger.classList.add("is-open");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // lock body scroll
  }

  function closeMenu() {
    burger.classList.remove("is-open");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", () => {
    const isOpen = burger.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close mobile menu when a link is clicked
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ── Active link highlighting on scroll ───────────────────
  const sections = document.querySelectorAll("section[id]");

  function highlightActiveLink() {
    let current = "";
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", highlightActiveLink, { passive: true });
  highlightActiveLink();
}

/* ============================================================
   4. SCROLL REVEAL — IntersectionObserver
   ============================================================ */

function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -80px 0px", // trigger slightly before viewport bottom
      threshold: 0.1,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/**
 * Re-run after dynamic content is inserted,
 * since .reveal elements added by renderX() need to be observed.
 */
function refreshScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal:not(.is-visible)");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.08,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ============================================================
   5. CONTACT FORM — Validation + Formspree async submission
   ============================================================ */

function initContactForm() {
  const form        = document.getElementById("contactForm");
  const submitBtn   = document.getElementById("submitBtn");
  const successBanner = document.getElementById("formSuccess");
  const errorBanner   = document.getElementById("formError");

  if (!form) return;

  // ── Field helpers ────────────────────────────────────────

  const fields = {
    name:    { el: document.getElementById("name"),    errEl: document.getElementById("nameError") },
    email:   { el: document.getElementById("email"),   errEl: document.getElementById("emailError") },
    message: { el: document.getElementById("message"), errEl: document.getElementById("messageError") },
  };

  function setError(fieldKey, message) {
    const { el, errEl } = fields[fieldKey];
    el.classList.add("has-error");
    errEl.textContent = message;
  }

  function clearError(fieldKey) {
    const { el, errEl } = fields[fieldKey];
    el.classList.remove("has-error");
    errEl.textContent = "";
  }

  // Validate a field inline as the user types
  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener("input", () => {
      if (fields[key].el.value.trim()) clearError(key);
    });
  });

  // ── Validation ───────────────────────────────────────────

  function validateForm() {
    let valid = true;

    // Name: required, min 2 chars
    const name = fields.name.el.value.trim();
    if (!name) {
      setError("name", "Please enter your name.");
      valid = false;
    } else if (name.length < 2) {
      setError("name", "Name must be at least 2 characters.");
      valid = false;
    } else {
      clearError("name");
    }

    // Email: required, basic format check
    const email = fields.email.el.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError("email", "Please enter your email address.");
      valid = false;
    } else if (!emailRegex.test(email)) {
      setError("email", "Please enter a valid email address.");
      valid = false;
    } else {
      clearError("email");
    }

    // Message: required, min 10 chars
    const message = fields.message.el.value.trim();
    if (!message) {
      setError("message", "Please write a message.");
      valid = false;
    } else if (message.length < 10) {
      setError("message", "Message must be at least 10 characters.");
      valid = false;
    } else {
      clearError("message");
    }

    return valid;
  }

  // ── Submission ───────────────────────────────────────────

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Always hide BOTH banners first — they are mutually exclusive
    successBanner.hidden = true;
    errorBanner.hidden   = true;

    // Stop here if validation fails — no network call, no banners shown
    if (!validateForm()) return;

    // Enter loading state
    submitBtn.classList.add("is-loading");
    submitBtn.disabled = true;

    let succeeded = false;

    try {
      // Guard: if Formspree ID hasn't been replaced yet, demo a success
      // so the UI can be tested without a real endpoint.
      if (form.action.includes("YOUR_FORM_ID")) {
        console.warn(
          "Portfolio: replace YOUR_FORM_ID in index.html with your Formspree endpoint."
        );
        await new Promise((r) => setTimeout(r, 1200)); // simulate network delay
        succeeded = true;
      } else {
        const response = await fetch(form.action, {
          method:  "POST",
          body:    new FormData(form),
          headers: { Accept: "application/json" },
        });
        succeeded = response.ok;
      }
    } catch {
      // Network-level failure (offline, bad URL, etc.)
      succeeded = false;
    }

    // Exit loading state — always runs, regardless of outcome
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;

    // Show exactly one banner based on outcome
    if (succeeded) {
      form.reset();
      Object.keys(fields).forEach(clearError); // clear inline field errors
      successBanner.hidden = false;
      successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      errorBanner.hidden = false;
      errorBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

/* ============================================================
   6. UTILITIES
   ============================================================ */

// ── Back to Top button ───────────────────────────────────────

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  function toggleVisibility() {
    const visible = window.scrollY > 400;
    btn.classList.toggle("is-visible", visible);
  }

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Footer year ──────────────────────────────────────────────

function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ── Lucide icon init ─────────────────────────────────────────
// Called after all DOM content (including dynamic renders) is ready.

function initIcons() {
  if (window.lucide) lucide.createIcons();
}

/* ============================================================
   7. INITIALISATION
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render dynamic content from data arrays
  renderProjects();
  renderSkills();
  renderTimeline();
  renderCertificates();

  // 2. Re-init Lucide icons (new elements were just inserted)
  initIcons();

  // 3. Set up scroll reveal (must run after render so all .reveal exist)
  initScrollReveal();

  // Slight delay for dynamic-content reveals to register correctly
  setTimeout(refreshScrollReveal, 100);

  // 4. Nav behaviour
  initNav();

  // 5. Contact form
  initContactForm();

  // 6. Utilities
  initBackToTop();
  setFooterYear();
});

/* ============================================================
   CERTIFICATES DATA — Edit to add/remove your certifications
   ============================================================ */

/**
 * Each certificate object:
 *   name      (string)  — full certificate title
 *   issuer    (string)  — issuing organisation
 *   year      (string)  — year obtained (or "In Progress")
 *   icon      (string)  — Lucide icon name shown on the badge
 *   url       (string|null) — verification/credential URL, or null
 */
const CERTIFICATES = [
  {
    name: "Power BI Certificate: Mastering Data Skills",
    issuer: "Microsoft / Power BI",
    year: "2024",
    icon: "bar-chart-2",
    url: null,
  },
  {
    name: "ISC2 Cybersecurity Fundamentals",
    issuer: "ISC2",
    year: "2024",
    icon: "shield-check",
    url: null,
  },
  {
    name: "Business Analysis Fundamentals with AI",
    issuer: "Business Analysis Institute",
    year: "2024",
    icon: "brain-circuit",
    url: null,
  },
  {
    name: "Scrum Fundamentals Certified (SFC)",
    issuer: "SCRUMstudy",
    year: "2023",
    icon: "layers",
    url: null,
  },
  {
    name: "Kanban Essentials with AI",
    issuer: "Kanban University",
    year: "2024",
    icon: "kanban",
    url: null,
  },
];

/* ============================================================
   RENDER — Certificates
   ============================================================ */

/**
 * Renders certificate cards into #certificatesGrid.
 */
function renderCertificates() {
  const grid = document.getElementById("certificatesGrid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  CERTIFICATES.forEach((cert, index) => {
    const card = document.createElement("div");
    card.className = "cert-card reveal";
    card.style.transitionDelay = `${index * 70}ms`;

    const linkStart = cert.url
      ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="cert-card__inner" aria-label="Verify ${cert.name}">`
      : `<div class="cert-card__inner">`;
    const linkEnd = cert.url ? `</a>` : `</div>`;
    const externalIcon = cert.url
      ? `<span class="cert-card__verify" title="Verify credential"><i data-lucide="external-link"></i></span>`
      : "";

    card.innerHTML = `
      ${linkStart}
        <div class="cert-card__icon">
          <i data-lucide="${cert.icon}"></i>
        </div>
        <div class="cert-card__body">
          <p class="cert-card__name">${cert.name}</p>
          <p class="cert-card__meta">${cert.issuer} &nbsp;·&nbsp; ${cert.year}</p>
        </div>
        ${externalIcon}
      ${linkEnd}
    `;

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
  if (window.lucide) lucide.createIcons();
}