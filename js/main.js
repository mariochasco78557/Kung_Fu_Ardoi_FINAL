/* ============================================================
   CLUB DEPORTIVO KUNG FU ARDOI — JAVASCRIPT PREMIUM
   ============================================================ */

'use strict';

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('page-loader');
    if (loader) loader.classList.add('hidden');
  }, 1800);
});

/* ── CURSOR PERSONALIZADO ── */
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

if (cursor && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 4 + 'px';
    cursor.style.top  = mouseY - 4 + 'px';
  });

  function animateCursor() {
    ringX += (mouseX - ringX - 16) * 0.12;
    ringY += (mouseY - ringY - 16) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .pillar-card, .galeria-item, .disciplina-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width  = '56px';
      cursorRing.style.height = '56px';
      cursorRing.style.borderColor = 'rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width  = '32px';
      cursorRing.style.height = '32px';
      cursorRing.style.borderColor = 'rgba(201,168,76,0.5)';
    });
  });
}

/* ── NAVBAR ── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
}

if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

// Cerrar menú móvil al hacer clic en enlace
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
    mobileNav.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

/* ── CONTADORES ANIMADOS ── */
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = parseInt(entry.target.dataset.target, 10);
      animateCounter(entry.target, target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  counterObserver.observe(el);
});

/* ── GALERÍA FILTROS ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const galeriaItems = document.querySelectorAll('.galeria-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    galeriaItems.forEach(item => {
      if (filter === 'todo' || item.dataset.cat === filter) {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
        item.style.display = '';
      } else {
        item.style.opacity = '0.3';
        item.style.transform = 'scale(0.97)';
      }
    });
  });
});

/* ── FORMULARIO DE CONTACTO ── */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.innerHTML = '✓ &nbsp; MENSAJE ENVIADO';
    btn.style.background = '#2a5a2a';
    btn.style.color = '#7fbb7f';
    btn.disabled = true;

    // Simular envío (aquí se conectaría con backend / formspree)
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      contactForm.reset();
    }, 4000);
  });
}

/* ── PARALLAX SUAVE EN HERO ── */
const heroContent = document.querySelector('.hero-content');
const heroKanji = document.querySelector('.hero-kanji');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
    heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
  }
  if (heroKanji && scrollY < window.innerHeight) {
    heroKanji.style.transform = `translateY(calc(-50% + ${scrollY * 0.15}px))`;
  }
});

/* ── SMOOTH SCROLL PARA ANCLAS ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── AKTIVER NAV LINK SEGÚN SECCIÓN ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active-nav'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active-nav');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── EFECTO TILT EN CARDS ── */
document.querySelectorAll('.pillar-card, .disciplina-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = (y - cy) / cy * -4;
    const rotY = (x - cx) / cx *  4;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── MARQUEE DUPLICACIÓN ── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.innerHTML += marqueeTrack.innerHTML;
}

/* ── LIGHTBOX GALERÍA (simple) ── */
const galItems = document.querySelectorAll('.galeria-item');
galItems.forEach(item => {
  item.addEventListener('click', () => {
    const label = item.querySelector('.galeria-item-label');
    if (!label) return;
    // En una implementación real aquí abriría el lightbox
    // Por ahora solo muestra efecto visual
    item.style.outline = '2px solid var(--gold)';
    setTimeout(() => { item.style.outline = ''; }, 600);
  });
});

/* ── INICIALIZACIÓN ── */
document.addEventListener('DOMContentLoaded', () => {
  // Añadir clase 'active-nav' al estilo activo
  const styleNav = document.createElement('style');
  styleNav.textContent = `.active-nav { color: var(--gold) !important; }
  .active-nav::after { width: 100% !important; }`;
  document.head.appendChild(styleNav);

  console.log('%c⚡ KUNG FU ARDOI — Disciplina. Respeto. Superación.',
    'color: #c9a84c; font-size: 14px; font-weight: bold; font-family: serif;');
});
