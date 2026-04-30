/* ═══════════════════════════════════════════════════════════
   QA Portfolio — script.js
   Features: i18n · Dark Mode · Intersection Observer · Cursor
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. Translations ────────────────────────────────────────── */
const TRANSLATIONS = {
  es: {
    'meta.title':           'Portfolio — QA Analyst',
    'nav.about':            'Sobre mí',
    'nav.projects':         'Proyectos',
    'nav.contact':          'Contacto',
    'hero.eyebrow':         'QA Software Analyst',
    'hero.available':       'Disponible',
    'hero.bio':             'Software tester QA, pero QA como Quality Assistant, no Quality Assurance, ya que los testers no aseguran la calidad, eso lo hacen los devs, que son quienes crean y modifican el código de la app; los testers evalúan el estado de ésta.',
    'hero.cta':             'Ver proyectos',
    'projects.title':       'Proyectos',
    'projects.viewProject': 'Ver proyecto',
    'projects.p1.title':    'Suite de Tests E2E — E-commerce',
    'projects.p1.desc':     'Implementación de una suite completa de pruebas end-to-end para un flujo de compra con cobertura del 92%, integrada en el pipeline CI/CD.',
    'projects.p2.title':    'Automatización de APIs REST',
    'projects.p2.desc':     'Colección de 150+ tests de API con validaciones de esquema, performance y regresión, ejecutándose en cada despliegue.',
    'projects.p3.title':    'Framework QA con Python',
    'projects.p3.desc':     'Diseño de un framework de automatización modular con POM, data-driven testing y reportes HTML detallados.',
    'projects.p4.title':    'Testing de Carga con k6',
    'projects.p4.desc':     'Análisis de rendimiento bajo carga para una plataforma SaaS, identificando cuellos de botella y mejorando el tiempo de respuesta en un 40%.',
    'projects.p5.title':    'BDD Testing con Playwright',
    'projects.p5.desc':     'Implementación de estrategia BDD con Cucumber y Playwright para alinear pruebas con requerimientos de negocio. Reducción del 30% en tiempo de regresión.',
    'contact.title':        'Contacto:',
    'footer.copy':          'Diseñado y desarrollado por',
    'footer.built':         'Construido con HTML, CSS & JS puro.',
  },
  en: {
    'meta.title':           'QA Portfolio — Software Analyst',
    'nav.about':            'About me',
    'nav.projects':         'Projects',
    'nav.contact':          'Contact',
    'hero.eyebrow':         'QA Software Analyst',
    'hero.available':       'Available',
    'hero.bio':             'pendiente traducir',
    'hero.cta':             'View projects',
    'projects.title':       'Projects',
    'projects.viewProject': 'View project',
    'projects.p1.title':    'E2E Test Suite — E-commerce',
    'projects.p1.desc':     'Full end-to-end test suite for a purchase flow with 92% coverage, integrated into the CI/CD pipeline.',
    'projects.p2.title':    'REST API Automation',
    'projects.p2.desc':     '150+ API tests with schema, performance and regression validations running on every deployment.',
    'projects.p3.title':    'QA Framework with Python',
    'projects.p3.desc':     'Modular automation framework with POM, data-driven testing and detailed HTML reports.',
    'projects.p4.title':    'Load Testing with k6',
    'projects.p4.desc':     'Performance analysis under load for a SaaS platform — identified bottlenecks and improved response time by 40%.',
    'projects.p5.title':    'BDD Testing with Playwright',
    'projects.p5.desc':     'BDD strategy with Cucumber & Playwright to align tests with business requirements. 30% reduction in regression time.',
    'contact.title':        'Contact:',
    'footer.copy':          'Designed and developed by',
    'footer.built':         'Built with plain HTML, CSS & JS.',
  },
};

/* ── 2. State ───────────────────────────────────────────────── */
let currentLang  = localStorage.getItem('qa-lang')  || 'es';
let currentTheme = localStorage.getItem('qa-theme') || 'light';

/* ── 3. i18n ────────────────────────────────────────────────── */
function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Update <html lang>
  document.documentElement.setAttribute('lang', lang);

  // Update page title
  if (dict['meta.title']) document.title = dict['meta.title'];

  // Update lang toggle label
  const langLabel = document.getElementById('langLabel');
  if (langLabel) langLabel.textContent = lang === 'es' ? 'EN' : 'ES';

  // Update aria-label on lang button
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
  }
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  localStorage.setItem('qa-lang', currentLang);
  applyTranslations(currentLang);
}

/* ── 4. Dark Mode ───────────────────────────────────────────── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const isDark = theme === 'dark';
  btn.setAttribute('aria-pressed', String(isDark));
  btn.setAttribute(
    'aria-label',
    isDark ? (currentLang === 'es' ? 'Activar modo claro' : 'Enable light mode')
           : (currentLang === 'es' ? 'Activar modo oscuro' : 'Enable dark mode')
  );
}

function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('qa-theme', currentTheme);
  applyTheme(currentTheme);
}

/* ── 5. Sticky Header ───────────────────────────────────────── */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ── 6. Mobile Menu ─────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  let isOpen = false;

  const open = () => {
    isOpen = true;
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', currentLang === 'es' ? 'Cerrar menú' : 'Close menu');
    menu.removeAttribute('hidden');
  };

  const close = () => {
    isOpen = false;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', currentLang === 'es' ? 'Abrir menú' : 'Open menu');
    menu.setAttribute('hidden', '');
  };

  toggle.addEventListener('click', () => (isOpen ? close() : open()));

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (isOpen && !toggle.contains(e.target) && !menu.contains(e.target)) close();
  });
}

/* ── 7. Intersection Observer (fade-in) ─────────────────────── */
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: just show everything
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ── 8. Custom Cursor ───────────────────────────────────────── */
function initCustomCursor() {
  // Skip on touch-only devices
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mouseX = -100, mouseY = -100;
  let curX   = -100, curY   = -100;
  let raf;

  // Raw dot follows mouse exactly
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  // Ring lags slightly for smoothness
  const animateCursor = () => {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    raf = requestAnimationFrame(animateCursor);
  };
  raf = requestAnimationFrame(animateCursor);

  // Hover state on interactive elements
  const INTERACTIVE = 'a, button, [role="button"], iframe, input, textarea, select, .project-card';

  document.querySelectorAll(INTERACTIVE).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });

  // Hide cursor when it leaves window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity    = '0';
    cursorDot.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity    = '1';
    cursorDot.style.opacity = '1';
  });
}

/* ── 9. Footer Year ─────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── 10. Smooth scroll for anchor links ─────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight || 68;
      const targetTop    = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
}

/* ── 11. Init ───────────────────────────────────────────────── */
function init() {
  // Apply persisted preferences immediately
  applyTheme(currentTheme);
  applyTranslations(currentLang);

  // Wire up controls
  const langToggle  = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');

  if (langToggle)  langToggle.addEventListener('click',  toggleLang);
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Init modules
  initStickyHeader();
  initMobileMenu();
  initScrollAnimations();
  initCustomCursor();
  initSmoothScroll();
  setFooterYear();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
