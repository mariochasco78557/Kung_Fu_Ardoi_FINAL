/* ================================================================
   CMS LOADER — KUNG FU ARDOI
   Carga dinámicamente el contenido editado via Decap CMS.
   No modifica main.js. Es completamente independiente.
   ================================================================ */

'use strict';

// Iconos de fallback para categorías (cuando no hay foto)
const ICONOS_CAT = {
  competicion:   { icon: 'fa-trophy',     label: 'Competición' },
  entrenamiento: { icon: 'fa-fist-raised', label: 'Entrenamiento' },
  equipo:         { icon: 'fa-users',       label: 'Equipo' },
  escudos:        { icon: 'fa-shield-alt',  label: 'Escudos' },
  eventos:       { icon: 'fa-star',        label: 'Eventos' },
  default:       { icon: 'fa-image',       label: 'Galería' }
};

/* ── Fetch seguro con fallback ── */
async function fetchJSON(path) {
  try {
    const res = await fetch(path + '?v=' + Date.now());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`[CMS] No se pudo cargar ${path}:`, e.message);
    return null;
  }
}

/* ================================================================
   GALERÍA — Renderizado dinámico
   ================================================================ */
let galeriaLightboxItems = [];
let galeriaLightboxIndex = 0;

function buildGaleriaItem(item, index) {
  const cat = item.categoria || 'competicion';
  const fallback = ICONOS_CAT[cat] || ICONOS_CAT.default;
  const hasImage = item.imagen && item.imagen.trim() !== '';
  const isDestacada = item.destacada === true;

  // Determinar clases de grid según posición y destacada
  const gridClass = isDestacada ? 'galeria-item galeria-item--featured'
                                : 'galeria-item';

  const innerContent = hasImage
    ? `<img src="${item.imagen}"
            alt="${item.titulo || ''}"
            loading="lazy"
            decoding="async"
            style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" />`
    : `<div class="galeria-placeholder">
         <i class="fas ${fallback.icon}" aria-hidden="true"></i>
         <span>${fallback.label}</span>
       </div>`;

  return `
    <div class="${gridClass}" data-cat="${cat}"
         tabindex="0" role="button"
         aria-label="${item.titulo || 'Foto del club'}">
      <div class="galeria-item-inner">
        ${innerContent}
      </div>
      <div class="galeria-item-overlay">
        <span class="galeria-item-label">${item.titulo || ''}</span>
      </div>
    </div>`;
}

function buildGaleriaSection(section) {
  const items = Array.isArray(section.items) ? section.items : [];
  const cat = section.categoria || 'eventos';
  const countText = `${items.length} ${items.length === 1 ? 'foto' : 'fotos'}`;

  return `
    <section class="galeria-section" data-section="${section.slug || cat}">
      <div class="galeria-section-header">
        <span class="galeria-section-kicker">${countText}</span>
        <h3>${section.titulo || 'Galería'}</h3>
      </div>
      <div class="galeria-section-grid">
        ${items.map((item, index) => buildGaleriaItem({
          ...item,
          categoria: cat,
          titulo: item.titulo || section.titulo
        }, index)).join('')}
      </div>
    </section>`;
}

function getGaleriaVisibleItems() {
  return Array.from(document.querySelectorAll('#galeria-grid .galeria-item img'))
    .filter(img => {
      const section = img.closest('.galeria-section');
      return !section || !section.hidden;
    })
    .map(img => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || 'Foto del club',
      title: img.closest('.galeria-item')?.querySelector('.galeria-item-label')?.textContent?.trim() || ''
    }));
}

function ensureGaleriaLightbox() {
  let lightbox = document.getElementById('galeria-lightbox');
  if (lightbox) return lightbox;

  lightbox = document.createElement('div');
  lightbox.id = 'galeria-lightbox';
  lightbox.className = 'galeria-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Foto ampliada de la galería');
  lightbox.innerHTML = `
    <button class="galeria-lightbox-close" type="button" aria-label="Cerrar galería">
      <i class="fas fa-times" aria-hidden="true"></i>
    </button>
    <button class="galeria-lightbox-nav galeria-lightbox-prev" type="button" aria-label="Foto anterior">
      <i class="fas fa-chevron-left" aria-hidden="true"></i>
    </button>
    <figure class="galeria-lightbox-figure">
      <img class="galeria-lightbox-img" alt="" />
      <figcaption class="galeria-lightbox-caption"></figcaption>
    </figure>
    <button class="galeria-lightbox-nav galeria-lightbox-next" type="button" aria-label="Foto siguiente">
      <i class="fas fa-chevron-right" aria-hidden="true"></i>
    </button>
    <div class="galeria-lightbox-count" aria-live="polite"></div>`;

  document.body.appendChild(lightbox);
  lightbox.querySelector('.galeria-lightbox-close').addEventListener('click', closeGaleriaLightbox);
  lightbox.querySelector('.galeria-lightbox-prev').addEventListener('click', () => moveGaleriaLightbox(-1));
  lightbox.querySelector('.galeria-lightbox-next').addEventListener('click', () => moveGaleriaLightbox(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeGaleriaLightbox();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) moveGaleriaLightbox(delta > 0 ? -1 : 1);
  }, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeGaleriaLightbox();
    if (e.key === 'ArrowLeft') moveGaleriaLightbox(-1);
    if (e.key === 'ArrowRight') moveGaleriaLightbox(1);
  });

  return lightbox;
}

function renderGaleriaLightbox() {
  const lightbox = ensureGaleriaLightbox();
  const current = galeriaLightboxItems[galeriaLightboxIndex];
  if (!current) return;

  const img = lightbox.querySelector('.galeria-lightbox-img');
  img.src = current.src;
  img.alt = current.alt;
  lightbox.querySelector('.galeria-lightbox-caption').textContent = current.title || current.alt;
  lightbox.querySelector('.galeria-lightbox-count').textContent =
    `${galeriaLightboxIndex + 1} / ${galeriaLightboxItems.length}`;
}

function openGaleriaLightbox(index) {
  galeriaLightboxItems = getGaleriaVisibleItems();
  if (galeriaLightboxItems.length === 0) return;
  galeriaLightboxIndex = Math.max(0, Math.min(index, galeriaLightboxItems.length - 1));
  renderGaleriaLightbox();
  const lightbox = ensureGaleriaLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightbox.querySelector('.galeria-lightbox-close').focus();
}

function closeGaleriaLightbox() {
  const lightbox = document.getElementById('galeria-lightbox');
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function moveGaleriaLightbox(direction) {
  if (galeriaLightboxItems.length === 0) return;
  galeriaLightboxIndex =
    (galeriaLightboxIndex + direction + galeriaLightboxItems.length) % galeriaLightboxItems.length;
  renderGaleriaLightbox();
}

function initGaleriaLightbox(grid) {
  ensureGaleriaLightbox();
  grid.querySelectorAll('.galeria-item').forEach(el => {
    const img = el.querySelector('img');
    if (!img) return;
    const openCurrent = () => {
      const visibleItems = getGaleriaVisibleItems();
      const index = visibleItems.findIndex(item => item.src === img.getAttribute('src'));
      openGaleriaLightbox(index >= 0 ? index : 0);
    };
    el.addEventListener('click', openCurrent);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCurrent();
      }
    });
  });
}

function buildGaleriaFilters(sections) {
  const filter = document.querySelector('.galeria-filter');
  if (!filter || !Array.isArray(sections) || sections.length === 0) return;

  filter.innerHTML = [
    '<button class="filter-btn active" data-section-filter="todo">Todo</button>',
    ...sections.map(section =>
      `<button class="filter-btn" data-section-filter="${section.slug}">${section.titulo}</button>`
    )
  ].join('');

  filter.querySelectorAll('[data-section-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.sectionFilter;
      filter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.galeria-section').forEach(section => {
        const visible = selected === 'todo' || section.dataset.section === selected;
        section.hidden = !visible;
      });
    });
  });
}

async function loadGaleria() {
  const grid = document.getElementById('galeria-grid');
  if (!grid) return;

  const data = await fetchJSON('content/galeria.json');
  if (!data) {
    // Conservar los placeholders estáticos si el JSON no carga
    return;
  }

  if (Array.isArray(data.sections) && data.sections.length > 0) {
    const sections = data.sections.filter(section => Array.isArray(section.items) && section.items.length > 0);
    if (sections.length === 0) return;

    grid.classList.add('galeria-grid--sections');
    grid.innerHTML = sections.map(buildGaleriaSection).join('');
    buildGaleriaFilters(sections);
  } else if (Array.isArray(data.items) && data.items.length > 0) {
    grid.classList.remove('galeria-grid--sections');
    grid.innerHTML = data.items.map(buildGaleriaItem).join('');
  } else {
    return;
  }

  // Re-aplicar listeners de filtro a los nuevos items
  const activeFilter = document.querySelector('.filter-btn.active');
  if (activeFilter && activeFilter.dataset.filter) {
    const currentFilter = activeFilter.dataset.filter;
    applyGaleriaFilter(currentFilter);
  }

  // Re-registrar en el IntersectionObserver de main.js
  grid.querySelectorAll('.galeria-item').forEach(el => {
    el.addEventListener('click', () => {
      el.style.outline = '2px solid var(--gold)';
      setTimeout(() => { el.style.outline = ''; }, 600);
    });
  });
  initGaleriaLightbox(grid);
}

function applyGaleriaFilter(filter) {
  document.querySelectorAll('#galeria-grid .galeria-item').forEach(item => {
    const match = filter === 'todo' || item.dataset.cat === filter;
    item.style.opacity    = match ? '1' : '0.3';
    item.style.transform  = match ? 'scale(1)' : 'scale(0.97)';
  });
}

/* ================================================================
   CAMPEONATOS — Actualizar contadores desde JSON
   ================================================================ */
async function loadCampeonatos() {
  const data = await fetchJSON('content/campeonatos.json');
  if (!data || !data.torneo_principal) return;

  const t = data.torneo_principal;

  // Actualizar data-target de los contadores (main.js los animará)
  const map = {
    'gold-count':   t.oro,
    'silver-count': t.plata,
    'bronze-count': t.bronce
  };

  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el && val !== undefined) {
      el.dataset.target = String(val);
      el.textContent = '0'; // resetear para re-animar
    }
  });

  // Actualizar título del torneo
  const tituloEl = document.getElementById('campeonato-titulo');
  if (tituloEl && t.nombre) tituloEl.textContent = t.nombre;

  // Actualizar badge con logro extra
  const logroEl = document.getElementById('campeonato-logro');
  if (logroEl && t.logro_extra) logroEl.textContent = t.logro_extra;

  // Actualizar descripción
  const descEl = document.getElementById('campeonato-desc');
  if (descEl && t.descripcion) descEl.textContent = t.descripcion;
}

/* ================================================================
   EVENTOS — Inyectar en sección de actividades
   ================================================================ */
function buildEventoItem(ev) {
  const iconMap = {
    torneo:          'fa-trophy',
    curso:           'fa-book-open',
    exhibicion:      'fa-star',
    'puertas-abiertas': 'fa-door-open',
    otro:            'fa-calendar-alt'
  };
  const icon = iconMap[ev.tipo] || 'fa-calendar-alt';

  return `
    <li class="actividad-item">
      <div class="actividad-icon" aria-hidden="true">
        <i class="fas ${icon}"></i>
      </div>
      <div>
        <span class="actividad-text" style="color:var(--white);display:block;font-size:0.88rem;">${ev.titulo}</span>
        ${ev.fecha ? `<span style="font-size:0.75rem;color:var(--gold);font-family:var(--font-accent);letter-spacing:0.1em;">${ev.fecha}</span>` : ''}
      </div>
    </li>`;
}

async function loadEventos() {
  const container = document.getElementById('eventos-list');
  if (!container) return;

  const data = await fetchJSON('content/eventos.json');
  if (!data || !Array.isArray(data.items)) return;

  const activos = data.items.filter(ev => ev.activo !== false);
  if (activos.length === 0) return;

  container.innerHTML = activos.map(buildEventoItem).join('');
}

/* ================================================================
   CONFIG — Actualizar textos editables del sitio
   ================================================================ */
async function loadConfig() {
  const data = await fetchJSON('content/config.json');
  if (!data) return;

  // Hero lema
  if (data.hero) {
    const lema = document.getElementById('hero-lema');
    if (lema && data.hero.lema1) lema.textContent = data.hero.lema1;

    const sub = document.getElementById('hero-subtitulo');
    if (sub && data.hero.subtitulo) sub.innerHTML = data.hero.subtitulo.replace('. ', '.<br/>');
  }

  // Contacto
  if (data.contacto) {
    const { email, telefono, instagram } = data.contacto;
    const emailEls = document.querySelectorAll('[data-cms-email]');
    emailEls.forEach(el => { if (email) el.textContent = email; });

    const telEls = document.querySelectorAll('[data-cms-tel]');
    telEls.forEach(el => { if (telefono) el.textContent = telefono; });

    const igEls = document.querySelectorAll('[data-cms-instagram]');
    igEls.forEach(el => { if (instagram) el.textContent = '@' + instagram.replace('@', ''); });
  }
}

/* ================================================================
   INIT — Ejecutar todo al cargar la página
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    loadGaleria(),
    loadCampeonatos(),
    loadEventos(),
    loadConfig()
  ]).then(() => {
    // Re-inicializar los contadores animados de main.js en los nuevos elementos
    const counters = document.querySelectorAll('[data-counter]');
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.target, 10);
          if (!isNaN(target)) animateCounterCMS(entry.target, target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => {
      // Resetear para que vuelvan a animarse con los nuevos valores
      delete el.dataset.counted;
      counterObs.observe(el);
    });
  });
});

function animateCounterCMS(el, target, duration = 2000) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
