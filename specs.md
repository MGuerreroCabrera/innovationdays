# Innovation Days 2026 — Especificación técnica

Landing page del evento Innovation Days, organizado por la Fundació Balear d'Innovació i Tecnologia (Fundació BIT) en el ParcBit (Mallorca), los días 3 y 4 de diciembre de 2026.

Documento de trabajo interno. El idioma del documento es español; el idioma del producto es catalán con traducción al castellano.

---

## 1. Contexto y objetivos

**Evento.** Innovation Days 2026, dos jornadas en el ParcBit (Palma). La jornada del jueves 3 se titula *Innovar a les Illes Balears: de les idees a les oportunitats de negoci*; la del viernes 4, *De la idea a la inversió: connectant talent, innovació i capital*, e incorpora la Conferència y Foro de inversión PALMA TECH'26.

**Organizan.** Govern de les Illes Balears (a través de ADR Balears), Fundació BIT y Keiretsu Forum.

**Objetivos de la página.**
1. Comunicar qué es el evento y qué lo organiza, con un enlace a la fuente oficial (`fundaciobit.org/que-es-la-fundacio-bit/`).
2. Convertir visitas en inscripciones: dos CTAs en el hero que abren formularios externos en pestaña nueva.
3. Permitir consultar el programa completo de los dos días sin recargar.
4. Servir el contenido en la lengua del visitante (ca / es).

**Fuentes de contenido.**
- `docs/programa-definitivo.docx` → **fuente oficial del programa** (23 entradas: 13 el jueves + 10 el viernes, 9 ponentes nominales). Sustituye a `docs/programa.docx`, que queda como histórico.
- `fundaciobit.org` → misión, objetivos y servicios de la Fundació BIT; definición del ParcBIT; contexto del ecosistema.
- Nota: el `.docx` definitivo sitúa el Foro PALMA TECH'26 a las 11:00 (los medios citaban 10:30–14:30). **Se sigue el `.docx`**.

---

## 2. Inventario de assets

| Archivo | Dimensiones reales | Uso | Notas |
|---|---|---|---|
| `images/hero.jpg` | 2522 × 757 (3,33:1) | Fondo del hero | Banner panorámico. El wordmark `[INN'26] INNOVATION DAYS` va impreso dentro, a la izquierda. |
| `images/hero.svg` | viewBox 1210×363, **18 MB** | — | **No se usa.** Illustrator con 16 rasters embebidos en base64. Inviable para web. |
| `images/logo-fbit.png` | 2481 × 970, RGBA | Cabecera | Redimensionado por CSS (`height: clamp(36px, 4.6vw, 52px)`), nunca por HTML. |
| `images/logo-footer.jpg` | 2522 × 625, fondo blanco | Footer | Contiene los tres logos: Govern, Fundació BIT, ADR Balears. Fondo blanco → el footer es blanco. |
| `images/favicon.png` | 400 × 320, RGBA | Favicon | Símbolo molecular de la Fundació BIT. No cuadrado. |
| `fonts/spacegrotesk.woff2` | 48 752 B | Tipografía | **Variable**, eje `wght` 300–700 (def. 300). Cubre 735 codepoints: incluye `àèéíòóúïçüñ¿¡·–—''""«»…€`. Sin glifos faltantes en ca/es. |
| `fonts/SpaceGrotesk-VariableFont_wght.ttf` | 134 112 B | — | Fuente variable original. Se conserva como respaldo: si el `.woff2` dejara de ser variable, basta cambiar la línea `src`. |

**`images/hero.png` no existe.** El brief original lo mencionaba; el asset real es `hero.jpg`. Está documentado aquí para que nadie lo busque.

---

## 3. Tokens de diseño

```css
--c-ink:    #000000;              /* todos los textos */
--c-blue:   #0246CA;              /* CTA primario, enlaces, acentos */
--c-sky:    #73C7FE;              /* hover, degradados, sombras */
--c-aqua:   #00EAE1;              /* estados activos, timeline, bordes */
--c-surface:#F5F8FD;              /* fondo alterno (programa) */
--c-border: rgba(2,70,202,.14);
--c-muted:  rgba(0,0,0,.64);      /* texto secundario */
```

Reglas de uso:
- El texto es siempre negro (`--c-ink`); el azul se usa para acción y emphasis, nunca para texto de párrafo.
- `--c-aqua` es un acento: bordes, marcadores, gradientes. **No** se usa como fondo de texto pequeño (contraste insuficiente con blanco).
- `--c-blue` sobre blanco ≈ 7,4:1 → apto para texto de enlace.
- Radios: `--radius-btn: 5px` (el valor pedido para los CTAs), `--radius-card: 14px`, `--radius-pill: 999px`.
- Tipografía fluida con `clamp()`: `--fs-display`, `--fs-h2` (1,75–2,875rem), `--fs-h3`, `--fs-lead`, `--fs-body` (1,0625rem), `--fs-sm`, `--fs-xs`.
- Métrica: contenedor `1200px`, gutter `clamp(1.25rem, 4vw, 3rem)`.
- Movimiento: `--ease: cubic-bezier(.22,.61,.36,1)`, `--dur: 280ms`.

---

## 4. Bloques

### 4.1 Cabecera (`<header class="site-header">`)

- Sticky, `top: 0`, `z-index: 50`, fondo blanco translúcido (`rgba(255,255,255,.95)`) con `backdrop-filter: blur(14px)`. Con `@supports not (backdrop-filter)` cae a blanco opaco para que el contenido no se transparente.
- Al hacer scroll (`> 12px`) se añade `.is-scrolled` → borde inferior + sombra.
- Izquierda: logo (`images/logo-fbit.png`) con `alt` descriptivo y enlace a `#inicio`.
- Derecha: navegación principal (`¿Qué son?` → `#que-es`, `Programa` → `#programa`), selector de idioma y botón hamburguesa.
- **A partir de 900px** la navegación se muestra y el hamburguesa se oculta. Por debajo de 900px la navegación vive en el drawer.
- El scrollspy marca la sección activa con `.is-current` (subrayado degradado) y `aria-current="true"`.

### 4.2 Hero (`<section class="hero">`)

- Fondo: `images/hero.jpg` en `.hero__media` (decorativo, `aria-hidden`).
- El `h1` ("Innovation Days 2026") es visualmente oculto: el wordmark real es el de la imagen.
- **Los CTAs van abajo a la derecha**, sobre la zona oscura de la imagen, para no colisionar con el wordmark impreso en la banda izquierda. `.hero__inner` es un flex con `justify-content: flex-end`.
- CTAs: `Inscriu-te com a assistent` / `Inscriu-te al Fòrum d’inversió` (ca) y `Inscríbete como asistente` / `Inscríbete al Foro de inversión` (es), `border-radius: 5px`, `target="_blank"` + `rel="noopener noreferrer"`.
- `.hero__scrim` aplica dos degradados (superior e inferior) para garantizar el contraste del texto blanco.
- Responsive:
  - `< 768px`: `min-height: clamp(460px, 68vh, 620px)`, `background-position: 82% center` (se ve el blob 3D), CTAs apilados a ancho completo.
  - `768–1199px`: `min-height: clamp(400px, 30.02vw, 720px)`, `background-position: 25% center` (prioriza el wordmark).
  - `≥ 1200px`: `background-position: center` → **cero recorte**; el ancho natural coincide con la altura impuesta por `30.02vw`.
- Parallax: `.hero__media` recibe `translate3d(0, y*0.16, 0) scale(1.08)` con `rAF` y listener pasivo. Desactivado con `prefers-reduced-motion`.

### 4.3 Qué son + Descripción (`<section class="about">`)

Dos sub-bloques en la misma sección, separados por un filete:

1. **Qué son** — eyebrow, titular, tres párrafos (qué es el evento / la pregunta que responde la edición / la organización y la Fundació BIT) y un enlace a `fundaciobit.org`. Columna lateral con la tarjeta **"Organitzen l'edició 2026"**: Govern (a través de la Fundació BIT con la colaboración de ADR Balears), Fundació BIT y Keiretsu Forum.
2. **Descripción del evento** — parte del texto semilla ("Innovació, talent i inversió…") y lo amplía a tres párrafos: jornada del jueves (instrumentos públicos, RIS3, Turboconvo, CDTI, UAPE, hubs, casos de éxito), jornada del viernes (inversión, PALMA TECH'26, pitches, mesa redonda) y cierre (networking).

Debajo, cuatro **cifras clave**: `2` jornades · `17` sessions · `9` ponents · `1` fòrum d'inversió. Los valores están **en el HTML** (`<span data-counter="17">17</span>`) y JS solo los anima: sin JS el dato es correcto.

### 4.4 Programa (`<section class="program">`)

- `role="tablist"` con dos pestañas: *Dijous 3 / 3 de desembre* y *Divendres 4 / 4 de desembre*. Indicador inferior con degradado azul→aqua que se reposiciona con `transform`.
- Paneles `role="tabpanel"` con `tabindex="0"`. El panel inactivo lleva el atributo `hidden`.
- Cada sesión es un `<li class="session">` del `<ol class="timeline">` con: hora (`<time datetime="2026-12-03T09:15">`), etiqueta de tipo, titular, descripción y ponente + cargo.
- Tipos: `logistics`, `principal`, `instrument`, `ecosystem`, `talk`, `break`, `forum`, `pitch`, `roundtable`, `openmic`, `closing` (etiqueta propia en cada idioma).
- Línea de tiempo: traza vertical con degradado cuyo relleno (`--progress`) se calcula según la posición del scroll.
- Deep link: `#programa-d1` / `#programa-d2` activan la pestaña correspondiente (y `history.replaceState` la mantiene al cambiar de pestaña).

### 4.5 Bloque de inscripción (`<section class="cta" id="inscriu-te">`)

Cierre de la página: banda de color con la llamada a la acción, situada entre el programa y el footer.

- Fondo `--c-blue` con dos degradados radiales en las esquinas (`--c-sky` 35% arriba a la izquierda, `--c-aqua` 28% abajo a la derecha). El centro conserva el azul puro para no degradar el contraste del texto.
- Contenido centrado: eyebrow "Innovation Days 2026" (fijo, sin traducir), titular y entradilla.
- **Los dos botones del hero, centrados y con los mismos enlaces**, reutilizando las claves `hero.ctaAssistant` y `hero.ctaForum`. Sobre fondo azul, `.btn--primary` se invierte a blanco con texto azul; `.btn--secondary` mantiene el aqua con texto negro.
- Texto: `No oblidis inscriu-te` / `No olvides inscribirte` (clave `cta.title`) y una entradilla que explica las dos vías de participación (clave `cta.lead`).
- Contrastes verificados: blanco sobre azul 7,69:1 (AAA), negro sobre aqua 13,86:1 (AAA).
- Entra en el grupo de animaciones de entrada con `.cta__inner`.

### 4.6 Footer (`<footer class="site-footer">`)

Solo `images/logo-footer.jpg`, centrado, con `loading="lazy"`. Fondo blanco (imagen con fondo blanco). Sin texto legal.

---

## 5. Modelo del programa

**23 entradas en el timeline, de las cuales 17 son sesiones.** Campos por entrada: `hora` (ISO + visible), `tipo`, `título`, `descripción` (opcional; D2-04 tiene dos), `ponente` + `cargo` (opcional), segundo ponente (D2-02). Las claves `program.d1sNN` / `program.d2sNN` siguen el orden cronológico de cada día.

**No cuentan como sesión** (6 entradas): las inscripciones y acreditaciones (D1 09:00, D2 08:45) y los momentos de pausa café / networking (D1 10:40, D1 14:00, D2 10:30, D2 14:30). Se marcan en el HTML con la clase `session--nonsession` (o `session--break` en los de pausa y networking) y se distinguen visualmente con un marcador más pequeño y hueco y el titular en tono secundario.

**Sí cuentan como sesión** (17): las 10 del jueves (09:15, 09:30, 10:00, 10:20, 11:00, 12:00, 12:40, 13:00, 13:30, 13:45) y las 7 del viernes (09:15, 09:30, 11:00, 11:15, 13:15, 13:50, 14:20). La *Entrega de reconeixements* (D1 13:30) cuenta como sesión: no es ni una pausa, ni un networking, ni una inscripción.

**Día 1 — jueves 3 de diciembre** (13 entradas, 10 sesiones, 09:00–14:00)
| Hora | Contenido | Ponente |
|---|---|---|
| 09:00 | Inscripcions | — |
| 09:15 | Obertura institucional | Antoni Costa |
| 09:30 | RIS3 2027–2034 | Sebastian González |
| 10:00 | Turboconvo | Josué Díaz |
| 10:20 | CDTI | Pilar González |
| 10:40 | Pausa per al cafè i treball en xarxa | — |
| 11:00 | La innovació en primera persona | Modera: Xavier Nadal |
| 12:00 | La teva pròxima oportunitat per innovar | Immaculada Salamanca |
| 12:40 | UAPE | DG Proyectos Estratégicos |
| 13:00 | Focus d'innovació (ParcBit i centres Bit) | Dani Juan |
| 13:30 | Entrega de reconeixements | — |
| 13:45 | Conclusions i cloenda | — |
| 14:00 | Treball en xarxa i finger food | — |

**Día 2 — viernes 4 de diciembre** (10 entradas, 7 sesiones, 08:45–14:30)
| Hora | Contenido | Ponente |
|---|---|---|
| 08:45 | Acreditacions PALMA TECH'26 | — |
| 09:15 | De la idea al mercat | Fundació Bit · ADR Balears |
| 09:30 | Una mirada diferent a la IA | Raquel Carrera |
| 10:30 | Pausa cafè + acreditacions finals pel fòrum | — |
| 11:00 | Fòrum PALMA TECH'26 | — |
| 11:15 | Empreses emergents en acció (pitches) | — |
| 13:15 | Què cerca un inversor? | Taula rodona |
| 13:50 | Micròfon obert als inversors | — |
| 14:20 | Lliurament del premi i cloenda de la jornada | Alejandro Sáenz de San Pedro |
| 14:30 | Treball en xarxa i finger food | — |

Nombres propios que **no** se traducen: Antoni Costa, Sebastian González, Josué Díaz, Pilar González, Xavier Nadal, Immaculada Salamanca, Dani Juan, Raquel Carrera, Alejandro Sáenz de San Pedro, ADR Balears, Fundació Bit, Keiretsu Forum, CDTI, RIS3, UAPE, PALMA TECH'26, ParcBit, CentresBit, PATIO, Turboconvo, ADEMA, Atalaia.

---

## 6. Arquitectura i18n

### 6.1 Ficheros

| Fichero | Responsabilidad |
|---|---|
| `javascript/dictionaries.js` | Datos puros: `window.InnovationDaysI18n = { ca: {...}, es: {...} }`. Sin lógica. |
| `javascript/i18n.js` | Motor: detección, aplicación, persistencia, verificación de claves. |
| `javascript/main.js` | Interacciones de UI. No conoce el diccionario, solo escucha el evento `i18n:change`. |

Los tres se cargan con `defer` (se ejecutan en orden). **No se usan ES modules a propósito**: los módulos fallan bajo `file://` y la página debe poder abrirse sin servidor.

### 6.2 Contrato de marcado

| Atributo | Efecto |
|---|---|
| `data-i18n="clave"` | `textContent` |
| `data-i18n-html="clave"` | `innerHTML` (copy con `<strong>` en línea) |
| `data-i18n-attrs="attr:clave;…"` | Cualquier atributo (`aria-label`, `title`, …) |

Catálogo actual: **127 claves en el HTML + 3 de uso programático** (`meta.title`, `meta.description`, `a11y.closeMenu`) = 130 por idioma. `I18n.reportMissingKeys()` compara ambos diccionarios y avisa por consola si se desajustan.

### 6.3 Resolución del idioma

1. `?lang=xx` en la URL → 2. `localStorage` → 3. `navigator.languages` → 4. `ca` por defecto.

El HTML se sirve siempre en catalán; el castellano se aplica al cargar el JS.

### 6.4 Selector de idioma

Elementos `<a>` reales (no `<button>`): funcionan sin JS, son compartibles y los buscadores los indexan. Con JS se intercepta el click → cambio instantáneo sin recarga → `history.replaceState` actualiza la URL → `localStorage` persiste la preferencia. `aria-current="true"` marca el activo. Hay selector en la cabecera (todos los breakpoints) y en el drawer (móvil).

### 6.5 Trade-offs asumidos

| Issue | Decisión |
|---|---|
| **FOUC**: el HTML es ca, el es se aplica al cargar el JS | `defer` ejecuta antes del primer paint en la práctica. Alternativa: un `<script>` inline de una línea en `<head>`, que rompería la regla de "el JS vive en `javascript/`". Decidido no hacerlo. |
| **SEO multilingüe**: solo el ca está en el HTML | Googlebot ejecuta JS e indexa `?lang=es`. La solución definitiva (rutas por idioma en servidor) está fuera de alcance; anotada como vía de mejora. |
| **Volumen del diccionario** | ~300 strings traducidos a mano. Requiere revisión humana antes de publicar. |

---

## 7. Interacciones JS

| # | Interacción | Técnica |
|---|---|---|
| 1 | Cabecera condensada al hacer scroll | listener pasivo + `requestAnimationFrame` |
| 2 | Drawer móvil | `aria-expanded`, focus trap, `Esc`, scroll-lock del body, cierre al redimensionar a ≥900px |
| 3 | Parallax del hero | `translate3d` + `scale(1.08)` en scroll |
| 4 | Reveal on scroll escalonado | `IntersectionObserver` + retardo `--reveal-delay` |
| 5 | Contadores de las 4 cifras | `IntersectionObserver` + `requestAnimationFrame` con easing cúbico |
| 6 | Pestañas del programa | `role="tablist"`, indicador deslizante, ←/→/Home/End, `aria-selected`, deep link, `sessionStorage` no requerido |
| 7 | Línea de progreso del timeline | cálculo de `--progress` sobre el scroll |
| 8 | Scrollspy del nav | `IntersectionObserver` con banda central → `aria-current` |
| 9 | Botón "volver arriba" | aparece pasado el hero |
| 10 | Cambio de idioma | `I18n.setLang()` + evento `i18n:change` (recalcula el indicador de pestañas) |

### 7.1 Fail-safe (decisión de diseño clave)

El contenido **nunca** queda invisible de forma permanente:

- Las animaciones de entrada ocultan un elemento **solo** si JS lo ha marcado con `data-reveal-pending`, y únicamente cuando está fuera de pantalla. Si el observer no dispara, lo que está en pantalla ya es visible.
- Los valores de los contadores están en el HTML. Si JS falla, se lee "16", no "0".
- La única dependencia real de JS es la navegación entre pestañas.

### 7.2 Movimiento reducido

`prefers-reduced-motion: reduce` desactiva parallax, contadores, animaciones de entrada y transiciones; el scroll pasa a ser instantáneo.

---

## 8. Favicon y metadatos sociales

```html
<link rel="icon" type="image/png" sizes="400x320" href="images/favicon.png">
<link rel="apple-touch-icon" href="images/favicon.png">
```

Más `theme-color` (#0246CA), `og:type/title/description/image` (← `images/hero.jpg`) y `twitter:card=summary_large_image`. `<link rel="alternate" hreflang="ca|es">` para las dos variantes.

> Si se quiere un favicon cuadrado real (32×32, 180×180, `.ico`), hay que generarlo a partir de `images/favicon.png` en un paso aparte.

---

## 9. Checklist de calidad

**Accesibilidad**
- [x] Landmarks semánticos (`header`/`nav`/`main`/`section`/`aside`/`footer`), un único `h1`.
- [x] Skip link a `#main`.
- [x] Tabs ARIA completas (`role`, `aria-selected`, `aria-controls`, `aria-labelledby`, `tabindex` gestionado).
- [x] Drawer con `role="dialog"`, `aria-modal`, focus trap y `Esc`.
- [x] `:focus-visible` visible (3px azul con offset).
- [x] `target="_blank"` siempre con `rel="noopener noreferrer"`.
- [x] Imágenes con `alt` descriptivo; las decorativas con `aria-hidden`.
- [x] `<time datetime>` en cada sesión.

**Rendimiento**
- [x] Sin dependencias, sin build, sin frameworks.
- [x] Fuente autoalojada con `font-display: swap` y `preload`.
- [x] `width`/`height` explícitos en todas las imágenes (sin CLS).
- [x] `loading="lazy"` en el footer.
- [x] Listeners pasivos y `rAF` en los handlers de scroll.

**Robustez**
- [x] Sin JS: la página se lee entera y los enlaces del selector de idioma funcionan (recargan con `?lang=`).
- [x] Sin JS: los valores de las cifras son correctos.
- [x] Contenido nunca invisible de forma permanente (§7.1).

**Verificado en navegador**
- Chrome (headless) y Firefox (headless): render, consola sin errores, sin overflow horizontal a 390 / 768 / 1024 / 1440.
- Cambio de idioma CA↔ES: 33 aserciones automáticas (texto, `<html lang>`, `<title>`, meta description, programa, ponentes, cifras, URL, `localStorage`, estado de pestañas preservado, teclado, drawer).
- Deep link `#programa-d2` → activa la pestaña del viernes.
- Programa: 13 entradas el jueves (10 sesiones) y 10 el viernes (7 sesiones); horas y `<time datetime>` coherentes con el `.docx` definitivo.

---

## 10. Puntos de extensión

| Punto | Estado | Nota |
|---|---|---|
| URL de inscripción como **asistente** | ✅ Hecho | `https://forms.cloud.microsoft/e/FkwdHGdVYX`, con `target="_blank"` + `rel="noopener noreferrer"`. |
| URL del **Foro de inversión** | ✅ Hecho | `https://keiretsuforum.es/foros-de-inversion/foro-de-inversion-palma-tech-04-12-2026/`. Sustituyó al anterior CTA de inscripción de startups. |
| Bloque de inscripción (CTA) | ✅ Hecho | Banner azul de cierre con los dos CTAs centrados. Reutiliza las claves y URLs del hero. |
| Ficha de ponentes | Fuera de alcance | Se retiró el bloque "Ponentes". Si vuelve, puede construirse con las claves `program.d1sXX.speaker` / `.role`, ya traducidas. |
| Enlace de navegación al CTA | Fuera de alcance | El bloque tiene `id="inscriu-te"` pero no hay enlace en el menú: la navegación se mantiene en "¿Qué son?" y "Programa". |
| Versión en inglés | Fuera de alcance | Requiere un tercer diccionario y `supported` en `i18n.js`. |
| Routing por idioma (`/ca/`, `/es/`) | Fuera de alcance | Requiere hosting con rewrite o un generador estático. |
| Optimización de `hero.svg` | Fuera de alcance | 18 MB. Si se necesita vectorial, hay que exportar el SVG limpio desde Illustrator sin rasters embebidos. |
| Analítica | Fuera de alcance | Punto de inserción tras `I18n.setLang()` y en los clics de los CTAs. |

---

## 11. Decisiones y notas de implementación

1. **`hero.png` no existe**: el asset es `hero.jpg`. Si en algún momento llega un `hero.png` vertical, hay que revisar el bloque 4.2 (el `background-position` y el `min-height` están calculados para un banner 3,33:1).
2. **Wordmark vs. copy**: la imagen ya lleva el título del evento. Por eso el copy del hero se ancla abajo a la derecha, sobre la zona oscura, y el `h1` real queda visualmente oculto pero presente para lectores de pantalla y buscadores.
3. **`transition` solo en `transform`** para el indicador de pestañas: animar `width` congelaba el ancho usado en algunos motores de headless y hacía la posición no determinista. El ancho se fija al instante; lo que se desliza es la posición.
4. **Cifras clave verificadas contra el `.docx` definitivo**: 23 entradas en el programa (13 + 10) → **17 sesiones** (10 + 7). Las 6 restantes son inscripciones, acreditaciones, pausas café y networking, que no se cuentan como sesión. **9 ponentes nominales únicos** (Immaculada Salamanca aparece en los dos días). El `.docx` definitivo deja de nombrar a Áureo Díaz-Carrasco (D1 12:00) y a Sebastian González en el Foro (D2 11:00), y atribuye la sesión de las 09:15 del viernes a Fundació Bit y ADR Balears.
5. **`hero.note` eliminado**: la frase "Accés gratuït / Acceso gratuito" no está verificada en ninguna fuente, así que no se publica.
6. **Texto de la charla de IA**: se mantiene en castellano en ambos idiomas, porque es el título literal de la conferencia según el `.docx`.
7. **El CTA reutiliza las claves del hero** (`hero.ctaAssistant`, `hero.ctaForum`) en lugar de crear claves nuevas. Consecuencia: cambiar el texto o la URL de un botón los cambia en los dos sitios, y no puede haber dos traducciones divergentes del mismo CTA.
8. **El CTA invierte el botón principal a blanco** (`.cta .btn--primary`) porque un botón azul sobre fondo azul sería invisible. El secundario mantiene el aqua, que sobre el azul también funciona (13,86:1 con texto negro).
9. **Alt del footer tipografiado en pequeño**: con `loading="lazy"` el texto alternativo se pinta mientras carga la imagen; con `font-size: var(--fs-xs)` no parece contenido roto.
