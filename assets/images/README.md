# 📸 Guía de Imágenes — CD Kung Fu Ardoi

Coloca aquí las imágenes del club para completar el sitio web.

## Imágenes recomendadas

### Foto del Shifu (PRIORITARIA)
- **Nombre de archivo:** `shifu.jpg`
- **Tamaño recomendado:** 800×1067px (ratio 3:4, vertical)
- **Descripción:** Foto profesional de Juan Cruz Izura
- **Uso en HTML:** Reemplazar el bloque del retrato en la sección `#shifu` por:
  ```html
  <img src="assets/images/shifu.jpg" alt="Juan Cruz Izura — Shifu, 5º DAN Wushu" 
       style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;" />
  ```

### Logo del Club
- **Nombre de archivo:** `logo.png` (fondo transparente) o `logo.svg`
- **Tamaño recomendado:** 200×200px mínimo
- **Uso:** Sustituir el icono kanji en la navbar

### Galería — Fotos de Competición
- `competicion-01.jpg` a `competicion-06.jpg`
- Tamaño: 800×600px o superior
- Para el VII Torneo Wushu Ardoi, podios, medallas...

### Galería — Entrenamiento
- `entrenamiento-01.jpg` a `entrenamiento-04.jpg`
- Tamaño: 800×600px
- Fotos del tatami, clases, técnicas...

### Galería — Equipo
- `equipo-01.jpg`
- Foto grupal del club

### Galería — Eventos
- `evento-01.jpg`, `evento-02.jpg`
- Exhibiciones, jornadas de puertas abiertas...

---

## Cómo añadir imágenes a la galería

Sustituir en `index.html` cada bloque `.galeria-placeholder` por:

```html
<!-- ANTES (placeholder) -->
<div class="galeria-placeholder">
  <i class="fas fa-trophy"></i>
  <span>Competición</span>
</div>

<!-- DESPUÉS (imagen real) -->
<img src="assets/images/competicion-01.jpg" 
     alt="VII Torneo Wushu Ardoi"
     style="width:100%;height:100%;object-fit:cover;" 
     loading="lazy" />
```

---

## Formatos aceptados
- **JPG/JPEG** — Para fotografías (compresión buena)
- **PNG** — Para logos y elementos con transparencia
- **WebP** — Óptimo para web (menor peso, mejor calidad)
- **SVG** — Para iconos vectoriales

## Tamaños recomendados
| Sección | Dimensiones | Notas |
|---|---|---|
| Shifu retrato | 800×1067 | Ratio 3:4 vertical |
| Galería grande | 800×600 | Ratio 4:3 |
| Galería pequeña | 600×500 | Ratio 6:5 |
| Logo | 200×200 | Fondo transparente |

## Herramientas gratuitas de optimización
- [Squoosh](https://squoosh.app) — Comprimir imágenes sin pérdida visible
- [TinyPNG](https://tinypng.com) — Para PNG y JPG
- [Canva](https://canva.com) — Para crear composiciones adicionales

---

*Kung Fu Ardoi · Zizur Mayor, Navarra*
