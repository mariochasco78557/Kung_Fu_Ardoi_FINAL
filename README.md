# 🥋 Club Deportivo Kung Fu Ardoi — Sitio Web Oficial

> *Más que un arte marcial. Una forma de vida.*

---

## Estructura del proyecto

```
Pagina web Hung gar/
├── index.html              ← Página principal (TODO el sitio)
├── css/
│   └── styles.css          ← Todos los estilos (dark premium + gold)
├── js/
│   └── main.js             ← Animaciones, scroll, contadores, formulario
├── assets/
│   └── images/
│       ├── README.md       ← Guía para añadir fotos reales
│       └── (tus fotos aquí)
└── README.md               ← Este archivo
```

---

## Secciones del sitio

| # | Sección | ID | Descripción |
|---|---|---|---|
| 1 | **Hero** | `#inicio` | Portada cinematográfica con animaciones |
| 2 | **Por qué Kung Fu** | `#porque` | Filosofía y pilares motivacionales |
| 3 | **Nuestro Club** | `#club` | CD Kung Fu Ardoi — misión y valores |
| 4 | **Nuestro Shifu** | `#shifu` | Juan Cruz Izura — perfil y logros |
| 5 | **Disciplinas** | `#disciplinas` | Wushu, Taolu, Sanda, Preparación Física |
| 6 | **Campeonatos** | `#campeonatos` | VII Torneo Wushu Ardoi — medallas animadas |
| 7 | **Equipo** | `#equipo` | Categorías de alumnado |
| 8 | **Galería** | `#galeria` | Fotos con filtros por categoría |
| 9 | **Filosofía** | `#filosofia` | Los 5 pilares filosóficos del Kung Fu |
| 10 | **Actividades** | `#actividades` | Actividades complementarias y seguridad |
| 11 | **Documentos** | `#documentos` | Archivo de PDFs del club |
| 12 | **Tarifas** | `#tarifas` | Modalidades y precios |
| 13 | **Contacto** | `#contacto` | Formulario + datos de contacto |
| 14 | **Footer** | `#footer` | Navegación, redes, legal |

---

## Diseño

- **Paleta:** Negro profundo `#080808` + Oro `#c9a84c` + Rojo `#9b1b1b`
- **Tipografía:** [Cinzel](https://fonts.google.com/specimen/Cinzel) (títulos) + [Inter](https://fonts.google.com/specimen/Inter) (cuerpo) + [Raleway](https://fonts.google.com/specimen/Raleway) (etiquetas)
- **Estilo:** Dark luxury, cinematic, premium sports branding
- **Animaciones:** Scroll reveal, contadores animados, parallax, tilt en cards

---

## Primeros pasos tras la entrega

### 1. Añadir foto del Shifu ⭐ (prioritario)
Coloca la foto de Juan Cruz Izura en `assets/images/shifu.jpg` y actualiza la sección `#shifu` del HTML.

### 2. Añadir fotos a la galería
Sustituye los placeholders de `#galeria` por fotos reales. Ver guía en `assets/images/README.md`.

### 3. Conectar el formulario de contacto
El formulario necesita un backend o servicio como **Formspree**:
1. Ve a [formspree.io](https://formspree.io) → crea cuenta gratuita
2. Obtén tu `action URL`
3. En `index.html`, busca `<form id="contact-form">` y añade `action="https://formspree.io/f/TU_ID" method="POST"`
4. Elimina el `e.preventDefault()` del formulario en `main.js`

### 4. Subir a hosting
El sitio es HTML estático puro. Puede publicarse en:
- **Netlify** (gratis) — arrastra y suelta la carpeta
- **GitHub Pages** (gratis)
- **Hosting propio** — sube via FTP

### 5. Dominio (opcional)
Sugerencias: `kungfuardoi.com` · `kungfuardoi.es` · `ardoikungfu.com`

---

## Personalización rápida

### Cambiar colores de acento
En `css/styles.css`, busca las variables CSS en `:root`:
```css
--gold:   #c9a84c;   /* Dorado principal */
--gold-lt: #e0c06b;  /* Dorado claro */
--red:    #9b1b1b;   /* Rojo acento */
```

### Añadir nuevas fotos a la galería
En `index.html`, dentro de `#galeria`, sustituir:
```html
<div class="galeria-placeholder">...</div>
```
Por:
```html
<img src="assets/images/foto.jpg" alt="Descripción" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
```

### Activar PDF de documentos
En la sección `#documentos`, cada `.doc-card` puede enlazar a su PDF:
```html
<a href="assets/dossier-kung-fu-ardoi.pdf" target="_blank" class="doc-card" ...>
```

---

## Canva — Recursos generados

Se generaron los siguientes recursos visuales en Canva durante el desarrollo:

- 🎨 **Logo premium** (4 variantes): [Ver en Canva](https://www.canva.com/d/enCL3Ukj2LSxEyG)
- 🎬 **Poster héroe cinematográfico** (4 variantes): [Ver en Canva](https://www.canva.com/d/CBBaW8XqzUv_rYd)
- 📱 **Post Instagram premium** (4 variantes): [Ver en Canva](https://www.canva.com/d/xgxQknUFjTmI61k)

---

## Contacto del club

- 📧 `kungfuardoi@gmail.com`
- 📞 `671 988 818`
- 📍 Zizur Mayor, Navarra
- 📸 [@cd_kungfu_ardoi](https://www.instagram.com/cd_kungfu_ardoi)

---

*Sitio web creado con 武 por Mario Chasco · AI Automation Agency*
