# ✏️ Cómo editar el sitio web — Kung Fu Ardoi

> Guía paso a paso para miembros del club. Sin necesidad de saber programar.

---

## 📋 Índice rápido

- [Acceder al panel de edición](#acceder)
- [Añadir fotos a la galería](#galería)
- [Actualizar resultados de campeonatos](#campeonatos)
- [Añadir eventos y actividades](#eventos)
- [Cambiar textos del sitio](#textos)
- [Publicar noticias](#noticias)
- [Subir el sitio a internet (primera vez)](#publicar)

---

## 🔑 Acceder al panel de edición {#acceder}

Una vez el sitio esté en Netlify:

1. Ve a: `https://TU-SITIO.netlify.app/admin/`
2. Haz clic en **"Log in with Netlify Identity"**
3. Usa tu email y contraseña del club

> ⚠️ Solo las personas invitadas como administradores pueden editar. El sitio público no se ve afectado.

**Invitar a un nuevo editor:**
- En Netlify → Identity → Invite users → escribe el email

---

## 📸 Añadir fotos a la galería {#galería}

1. Abre el panel de administración (`/admin/`)
2. Haz clic en **📸 Galería** → **Fotos de la Galería**
3. Haz clic en **"Añadir elemento"**
4. Rellena:
   - **Título**: nombre de la foto (ej: "VII Torneo Wushu Ardoi")
   - **Categoría**: Competición / Entrenamiento / Eventos
   - **Imagen**: haz clic en "Choose an image" → sube tu foto
   - **¿Foto destacada?**: actívalo si quieres que salga grande en la galería
5. Haz clic en **Publicar ahora**
6. En 1-2 minutos aparece en la web ✅

**Formatos de imagen aceptados:** JPG, PNG, WebP  
**Tamaño recomendado:** máximo 2MB por foto (usa [Squoosh](https://squoosh.app) para comprimir)

---

## 🏆 Actualizar resultados de campeonatos {#campeonatos}

1. Panel admin → **🏆 Campeonatos** → **Medallero y Torneos**
2. Modifica el **Torneo principal destacado**:
   - Cambia el nombre, año, medallas de oro/plata/bronce
   - Los números aparecen animados en la web automáticamente
3. Para añadir al historial, usa la sección **Historial de torneos**
4. Haz clic en **Publicar ahora**

---

## 📅 Añadir eventos y actividades {#eventos}

1. Panel admin → **📅 Eventos** → **Agenda de eventos**
2. Haz clic en **"Añadir elemento"**
3. Rellena:
   - Título, fecha, tipo (torneo, curso, etc.)
   - Descripción breve
   - **Activo**: marcado = aparece en la web
4. Para ocultar un evento pasado: desmarca **Activo** y publica
5. Haz clic en **Publicar ahora**

---

## 📝 Cambiar textos del sitio {#textos}

1. Panel admin → **⚙️ Configuración** → **Ajustes generales del sitio**
2. Modifica:
   - **Lema del hero**: el texto de "Disciplina · Respeto · Superación"
   - **Email, teléfono, Instagram** del club
3. Haz clic en **Publicar ahora**

---

## 📰 Publicar noticias {#noticias}

1. Panel admin → **📰 Noticias** → **Crear nueva noticia**
2. Rellena:
   - Título, fecha, resumen
   - Imagen destacada (opcional)
   - Contenido (editor visual tipo Word)
   - Activa **Publicada**
3. Haz clic en **Publicar ahora**

> ℹ️ Las noticias se guardan como archivos en GitHub pero aún no se muestran automáticamente en la web principal. Habla con el técnico del club para activar esta sección.

---

## 🌐 Publicar el sitio por primera vez {#publicar}

### Opción A: Netlify (recomendado) — GRATIS

1. Crea cuenta en [github.com](https://github.com) (gratis)
2. Sube la carpeta del proyecto a un repositorio GitHub:
   - Nombre sugerido: `kung-fu-ardoi`
   - Visibilidad: **Público** (necesario para Netlify gratuito)
3. Ve a [netlify.com](https://netlify.com) → Log in with GitHub
4. Haz clic en **"Add new site"** → **"Import an existing project"**
5. Selecciona tu repositorio `kung-fu-ardoi`
6. Ajustes:
   - **Branch to deploy:** `main`
   - **Publish directory:** `.` (solo un punto)
7. Haz clic en **"Deploy site"**
8. ¡El sitio estará en vivo en 2 minutos! 🎉

### Activar el CMS (edición visual):
1. En Netlify → tu sitio → **Identity** → **Enable Identity**
2. Haz clic en **Settings and usage** → **Registration** → **Invite only**
3. Ir a **Services** → **Git Gateway** → **Enable Git Gateway**
4. Volver a **Identity** → **Invite users** → añadir email del admin
5. El admin recibirá un email de invitación → crear contraseña
6. ¡Listo! Ya puedes editar en `https://tu-sitio.netlify.app/admin/`

### Opción B: GitHub Pages — GRATIS (más sencillo, sin CMS)

1. Sube la carpeta a GitHub (paso 1-2 del método A)
2. En GitHub → tu repo → **Settings** → **Pages**
3. Source: **Deploy from a branch** → `main` → `/` (root)
4. El sitio aparece en: `https://tu-usuario.github.io/kung-fu-ardoi/`

> ⚠️ Con GitHub Pages el CMS de edición visual NO funciona sin configuración adicional.

---

## ❓ Preguntas frecuentes

**¿Cuánto tarda en actualizarse la web después de guardar?**
- Entre 30 segundos y 2 minutos (Netlify hace un redeploy automático)

**¿Puedo editar desde el móvil?**
- Sí, el panel admin es responsive. Pero para subir fotos es más cómodo desde PC.

**¿Qué pasa si cometo un error?**
- Todo tiene historial en GitHub. Cualquier cambio se puede deshacer.

**¿Puedo añadir vídeos?**
- Sube el vídeo a YouTube o Instagram y pega el enlace en la descripción del evento.

**¿Cuánto ocupa el sitio?**
- El código del sitio ocupa menos de 1MB. Las fotos subidas dependen de ti.
- Netlify gratuito permite hasta 100GB de bandwidth/mes (más que suficiente).

---

*Kung Fu Ardoi · Zizur Mayor, Navarra · kungfuardoi@gmail.com*
