# Reporte de Auditoría SEO — new-church-template (Bioiglesia)

**URL auditada:** https://bioiglesia.com (verificada en `src/app/layout.tsx` → `metadataBase`)
**Código auditado:** `/Users/agustinibarrola/Proyectos/new-church-template` — Next.js 16.1.3 + React 19 + Chakra UI v3
**Fecha:** 2026-09-16
**Tipo de página:** Institucional / organización local religiosa (una Home + Nosotros + Contacto + Ministerios índice + 8 páginas dinámicas `/ministerios/[slug]` + página utilitaria `/links`)
**Objetivo SEO:** Captar intención local/navegacional: palabra clave principal `iglesia evangélica en Barrio Nuevo, Libertad` y variantes (`iglesia Libertad`, `iglesia cristiana Merlo`, `Bioiglesia`). No es YMYL estricto (salud/finanzas/legal), por lo que el listón E-E-A-T es medio, no máximo.
**Auditor:** Skill `seo-expert` v1.0.0 (fuentes: Google Search Central, web.dev, Schema.org, MDN Web Docs)

---

## Resumen ejecutivo

- **Puntuación global:** 67/100
- **Problemas críticos:** 4
- **Problemas medios:** 9
- **Problemas menores:** 6

### Top 3 acciones prioritarias

1. **Añadir un `<h1>` real y único en `/nosotros`, `/contacto` y `/ministerios`** — hoy esas páginas no tienen H1 (los `Heading` de Chakra no declaran `as="h1"`). Sin H1 el buscador pierde la señal principal de "de qué trata la página". Impacto: alto.
2. **Corregir títulos dinámicos cortos y descripción por defecto larga** — `constructMetadata()` genera títulos como `MAAOC` (5 caracteres) o `Nosotros` (8 caracteres) sin sufijo de sitio, y su descripción por defecto mide 171 caracteres (>160). Impacto: alto en CTR y SERP.
3. **Reducir el riesgo LCP: hero de 878 KB + fondo CSS no descubrible + og-image de 948 KB mal etiquetada** — `hero-iglesia.webp` (878 KB) no tiene `fetchpriority="high"` ni `preload`, y `/nosotros` carga su hero vía `backgroundImage` CSS (invisible para el parser). Impacto: alto en Core Web Vitals y ranking.

---

## 1. Crawling e Indexación

| Verificación              | Estado | Evidencia | Acción |
| ------------------------- | ------ | --------- | ------ |
| `robots.txt` válido       | ✅ | `src/app/robots.ts:4-12` genera `User-agent: * / Allow: /` + `Sitemap: https://bioiglesia.com/sitemap.xml`. Directivas soportadas (`user-agent`, `allow`, `sitemap`) y sitemap con URL absoluta. | Ninguna. Mantener. Fuente: https://developers.google.com/search/docs/crawling-indexing/robots/intro |
| Sitemap declarado         | ⚠️ | `src/app/sitemap.ts:5-48` incluye Home (`priority: 1`), `/nosotros`, `/contacto`, `/ministerios` y 8 slugs dinámicos vía `ministeriosItems`. Bien: excluye `/links` (noindex). Mal: `lastModified: new Date()` en todas las rutas (fecha falsa en cada build), y usa `changeFrequency`/`priority` que Google ignora. | Fijar `lastModified` real por página (fecha de edición del contenido) o eliminarlo; retirar `priority`/`changefreq` para no dar señal ruido. Fuente: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview |
| `noindex` correcto        | ✅ | `src/app/links/page.tsx:20` usa `robots: { index: false, follow: true }` para página utilitaria de redes. Correcto: se usa `noindex`, no `robots.txt`, para desindexar. Las páginas 404 de slug usan `noIndex: true` en `generateMetadata` (`[slug]/page.tsx:35-39`). | Ninguna. No replicar el patrón `noindex` en páginas de ministerios reales. Fuente: https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag |
| Canonical correcto        | ⚠️ | `layout.tsx:50` (`canonical: '/'` relativo), `nosotros/page.tsx:22`, `contacto/page.tsx:10`, `[slug]/page.tsx:50` usan canónicos relativos (`/nosotros`, `/contacto`, `/ministerios/slug`). Next los resuelve contra `metadataBase`, pero la guía exige URL absoluta explícita. `/ministerios/page.tsx` **no declara metadata ni canonical**: hereda título/descripción de la Home → contenido duplicado en SERP. | Declarar canonical absoluto en cada página (ej. `https://bioiglesia.com/nosotros`) y añadir `constructMetadata({title, description, canonical})` a `/ministerios/page.tsx`. Nunca apuntar canonical a 404/redirección/noindex. Fuente: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls |
| Redirecciones sin cadenas | ✅* | No hay archivo de redirects ni cadenas en el código (`next.config.ts` no define `redirects`). *No verificable en producción sin Search Console / inspección HTTP. | Verificar con Inspección de URLs de Search Console tras el despliegue que no haya cadenas ni bucles. Fuente: https://support.google.com/webmasters/answer/9012289 |

**Notas:**
- `verification.google` está comentado en `layout.tsx:51-53` → Search Console **no verificable** desde código. Sin Search Console no hay Informe de Cobertura ni de Core Web Vitals de campo. Dar de alta la propiedad y pegar el token.
- Bien: JSON-LD y contenido crítico están en el HTML inicial (Server Components), no dependen de JS para el rastreo. No se bloquea CSS/JS en `robots.txt`. Fuente: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

---

## 2. Contenido On-Page

Mediciones exactas (2026-09-16, script de conteo sobre los strings literales del repo):

| Verificación                | Estado | Evidencia | Acción |
| --------------------------- | ------ | --------- | ------ |
| Título 50-60 chars          | ⚠️ | Home `layout.tsx:10-12`: `Bioiglesia \| Iglesia Evangélica en Barrio Nuevo, Libertad` = **57 chars** ✅ con keyword al inicio de la parte descriptiva. PERO: `lib/metadata.ts:13` default = 50 chars ✅ con descripción de **171 chars** ❌; `nosotros` title = `Nosotros` (**8 chars** ❌, sin sufijo de sitio porque `constructMetadata` no usa `template`); `contacto` hereda el mismo problema; slugs usan `ministerio.title` (`MAAOC` = 5 chars, `Grupos la Red`, etc. sin `\| Bioiglesia`); `links` = `Enlaces \| Bioiglesia` (20 chars, aceptable porque es `noindex`). | Extender `constructMetadata` para aplicar `template`-like: `${title} \| Bioiglesia` y validar longitud 50-60 en `generateMetadata` del slug. Recortar descripción por defecto a ≤160. Fuente: https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=es |
| Meta descripción            | ⚠️ | Home = **158 chars** ✅. `nosotros` = 153 chars ✅. `contacto` = 113 chars ⚠️ (corta, desperdicia píxeles SERP). `lib` default = **171 chars** ❌ (será truncada/reescrita por Google, tasa de reescritura 40-60%). Slug: `substring(0,155)+...` en `[slug]/page.tsx:44-48` → corta a mitad de palabra y añade `...` literal (ej. `...` pegado sin espacio). | Reescribir default a 150-160 chars; ampliar contacto a ~155 con keyword + CTA + horario; en slugs cortar por palabra completa (`lastIndexOf(' ')`) en vez de carácter 155. Fuente: Google Search Central, sección Títulos y Meta Descripciones. |
| Un solo H1                  | ❌ | Home ✅: `Hero.tsx:61-63` (`as="h1"`). Slug ✅: `[slug]/page.tsx:146-147` (`as="h1"`). **Sin H1**: `nosotros/page.tsx` (4 `Heading` sin `as`), `contacto/ContactClient.tsx` (hero `Heading:162` sin `as`), `ministerios/page.tsx:75` (sin `as`), `links/page.tsx:68` sí tiene `as="h1"` pero es `noindex`. Chakra `Heading` sin `as` renderiza `h2` por defecto → esas páginas tienen cero H1 y varios H2. | Añadir `as="h1"` al encabezado hero de cada página indexable (uno solo por página). Nunca usar `<div>` con estilo de encabezado. Fuente: https://developer.mozilla.org/es/docs/Web/HTML/Element/Heading_Elements |
| Jerarquía H2/H3             | ⚠️ | Slug ✅: H1 → H2 (`Acerca de...`, `En Acción`, `Explorar...`). Nosotros/contacto/ministerios: jerarquía plana de H2 sin H1 padre; `ContactClient.tsx:228,256,284` usa `Heading fontSize md` (`Dirección`, `Teléfono`, `Email`) como supuestos H3 sin H2 previo claro. | Re-mapear: H1 (hero) → H2 (secciones) → H3 (sub-bloques). No saltar niveles por estética; eso es trabajo de CSS. Fuente: `references/google-search-central.md` + MDN. |
| E-E-A-T                     | ⚠️ | Positivo: sección `Leaders.tsx` nombra a 6 líderes con rol/credencial (pastor, periodista, profesora…), dirección física, teléfono y horarios visibles en Home/Contacto. Negativo: sin autoría firmada, sin fechas `datePublished/dateModified` visibles, sin fuentes citadas, sin enlaces a perfiles. Sitio **no YMYL**, por lo que no es bloqueante, pero limita la confianza. | Añadir bloque autor/organización visible, fechas de actualización y página de contacto coherente con el schema `Church`. Fuente: https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=es (E-E-A-T). |
| Enlaces salientes con `rel` | ❌ | `Hero.tsx:143-146` (`<a target="_blank">` a YouTube **sin `rel`**), `Social.tsx:18-37` (Instagram + YouTube con `target _blank` **sin `rel`**). Solo `links/page.tsx:117` usa `rel="noopener noreferrer"` ✅. No hay enlaces pagados/UGC, por lo que `sponsored`/`ugc` no aplican, pero falta `noopener` (seguridad + rendimiento). Hallazgo extra: `ContactClient.tsx:292` tiene `href="mail:info@..."` (typo, debería ser `mailto:`) → enlace roto. | Añadir `rel="noopener noreferrer"` a todo `target="_blank"` externo; corregir `mail:` → `mailto:`. Fuente: https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links + MDN `<a target>`. |

**Notas:**
- Open Graph/Twitter bien configurados en `layout.tsx:24-48` (`type website`, `locale es_AR`, `siteName`, imagen 1200x630 con `alt`). Pero las imágenes OG se declaran relativas (`/og-image.jpg`); Next las absolutiza vía `metadataBase` — aceptable, preferible declarar absoluta explícita.
- `keywords` (`layout.tsx:17-23`) es ignorado por Google desde hace años; no daña, pero no aporta. No quitar por compatibilidad con otros motores, pero no invertir esfuerzo en él.

---

## 3. Core Web Vitals

| Métrica | Valor p75 | Umbral | Estado |
| ------- | --------- | ------ | ------ |
| LCP     | no verificable (sin CrUX / PSI / despliegue) | ≤ 2.5s | ⚠️ riesgo alto por análisis estático |
| INP     | no verificable | ≤ 200ms | ⚠️ riesgo medio |
| CLS     | no verificable | ≤ 0.1 | ⚠️ riesgo medio |

**Fuente de datos:** No verificable — no hay URL pública, ni Search Console, ni PageSpeed Insights, ni RUM propios conectados (solo `@vercel/speed-insights` instalado en `layout.tsx:78` pero sin datos). Las tablas siguientes son **riesgos detectados en código**, no mediciones.

**Notas (análisis estático con regla + archivo):**
- **LCP en riesgo:** hero `hero-iglesia.webp` pesa **878 KB** (`src/assets/img/hero-iglesia.webp`) y se renderiza con `next/image` `loading="eager"` + `fill` pero **sin `fetchpriority="high"`, sin `<link rel="preload">`, sin formato AVIF y con `sizes="100%"`** (`Hero.tsx:162-172`). Solo la imagen LCP debe llevar `fetchpriority="high"` y nunca `loading="lazy"` — aquí se cumple lo segundo pero falta lo primero. Peor: `/nosotros` pinta su hero con `backgroundImage: url(...)` CSS (`nosotros/page.tsx:34`) → el recurso LCP **no es descubrible por el parser** y siempre pierde contra un `<img>`/`<Image priority>`. `og-image.jpg` pesa **948 KB** y `file(1)` revela que **es un PNG renombrado a .jpg** (1730x909) → el navegador no puede aplicar optimización JPEG y descarga ~1 MB para cada share. `portada-2.jpg` (4.0 MB) existe en assets. Fuentes: https://web.dev/articles/lcp + https://web.dev/learn/images
- **INP en riesgo:** Chakra UI + Emotion + Iconify + `react-compiler` + carrusel `autoplay` del lado cliente (`CarouselComponent.tsx:53`, `Footer.tsx:1 use client`, `Social.tsx:1`, `ContactClient.tsx:1`) hidratan mucho JS en el hilo principal. No hay `scheduler.yield()` ni partición de tareas largas; los scripts de terceros (Vercel Analytics/SpeedInsights) compiten por el hilo. Mitigante bueno: el mapa de Google se difiere con `IntersectionObserver` + `rootMargin 200px` y `loading="lazy"` (`ContactClient.tsx:36-55,558-566`) ✅. Fuentes: https://web.dev/articles/inp
- **CLS en riesgo:** la mayoría de `next/image` con `fill` están dentro de contenedores con tamaño (`aspectRatio`, `h-100svh`), pero el hero usa `position absolute + transform translate(-50%,-50%)` sobre `h-100svh` (`Hero.tsx:25-36`) y el carrusel/autoplay inserta contenido sin reserva explícita adicional; sin `width`/`height` o `aspect-ratio` en cada slot hay desplazamiento. No se detecta `font-display: swap/optional` (no hay `next/font` en el repo) → riesgo FOIT/FOUT. Fuentes: https://web.dev/articles/cls
- **Canon aplicable:** `fetchpriority="high"` solo en LCP; `loading="lazy"` solo below-fold; AVIF → WebP → JPEG; `srcset`+`sizes` reales; `width`+`height`; `font-display: swap`. Verificar tras desplegar con PageSpeed Insights (campo + laboratorio) y priorizar siempre CrUX sobre Lighthouse. Fuentes: https://pagespeed.web.dev/ + https://developer.chrome.com/docs/crux

---

## 4. Datos Estructurados

| Schema implementado | Tipo | Estado | Acción |
| ------------------- | ---- | ------ | ------ |
| `Church` en Home (`src/app/page.tsx:7-28`, inyectado vía `<script type="application/ld+json">` en Server Component ✅ HTML inicial, no vía JS) | Activo (subtipo de `Place`/`CivicStructure` en Schema.org, válido para iglesias locales) | ⚠️ válido pero incompleto | Completar y validar (ver Notas). |
| `Organization` / `WebSite` / `BreadcrumbList` / `Event` | Ausente | ❌ | Añadir grafo mínimo `@graph`: `Church` + `WebSite` (+`SearchAction` solo si hay buscador; si no, omitir) + `BreadcrumbList` en slugs. No usar `FAQPage` (restringido a gobierno/salud), ni `HowTo`/`SpecialAnnouncement`/otros deprecados. |
| Schemas en Nosotros / Contacto / Ministerios / Slugs | Ausente | ⚠️ | Añadir `AboutPage`/`ContactPage` coherentes con el contenido visible; en slugs reutilizar el `Church` + datos del ministerio visible. Todo JSON-LD sensible debe ir en HTML inicial. |

**Validado con:** No verificable — no se ejecutó Rich Results Test ni Schema.org Validator en esta auditoría (sin URL pública). Validación obligatoria antes de desplegar: https://search.google.com/test/rich-results + https://validator.schema.org/ + https://www.bing.com/webmasters/markup-validator

**Notas (por qué importa cada campo):**
- `dayOfWeek: 'Sunday'` (`page.tsx:25`) debería ser el enum canónico `"https://schema.org/Sunday"`; como string suelto puede no validar. `addressLocality: 'Libertad, Merlo'` mezcla ciudad + partido en un campo; separar (`addressLocality: Libertad`, + `addressRegion: Buenos Aires`, + `postalCode`, + `geo` con lat/lng del mapa embebido). `telephone` usa formato `+549...` sin espacios — válido E.164, mantener. Falta `sameAs` (Instagram/YouTube reales del repo) y `openingHoursSpecification.opens/closes` en formato `HH:MM` ✅ ya correcto.
- El marcado **coincide** con contenido visible (nombre, dirección Honduras 2004, horario domingos 19:00) ✅ — nunca marcar contenido oculto. Fuente: https://developers.google.com/search/docs/appearance/structured-data + https://schema.org/Church
- Plantillas de referencia: `references/schema-templates.md` (Organization, LocalBusiness, WebSite, BreadcrumbList, Event). Para cultos recurrentes evaluar `Event` con `eventSchedule` en vez de inventar un tipo propio.

---

## 5. HTML Semántico

| Verificación             | Estado | Acción |
| ------------------------ | ------ | ------ |
| `lang` declarado         | ✅ | `layout.tsx:67-71` usa `<html lang="es">` ✅. Mejora menor: `es-AR` si todo el contenido es argentino. Fuente: https://developer.mozilla.org/es/docs/Web/HTML/Element/html |
| `<main>` presente        | ✅ | `ConditionalLayaout.tsx:23` envuelve `{children}` en un único `<main>` ✅ (uno por página). |
| Estructura semántica     | ⚠️ | `Navbar.tsx:14-15,29` usa `Stack as="header"` + `Flex as="nav"` ✅ pero sin `aria-label` en el `<nav>`. `Footer.tsx:42` usa `Stack` **sin `as="footer"`** ❌ → el pie no es landmark. Cero `<article>`/`<section>`/`<address>`/`<time>` en todo el repo: direcciones y horarios son `<Text>` genéricos; el formulario de contacto sí usa `<form>`+`Field.Label` ✅ pero el newsletter del footer es un `<Input placeholder>` **sin `<label>` asociado** ❌. `Social.tsx:27-37` anida `<button>` (IconButton) > `<a>` (Link) en el botón de YouTube ❌ (interactivo dentro de interactivo, HTML inválido). |
| `alt` en imágenes        | ⚠️ | Hero `alt="Imagen de la iglesia"` (`Hero.tsx:164`) y About `alt="Portada sobre nosotros"` (`AboutUs.tsx:180`) son genéricos (no describen ni aportan keyword). `Leaders.tsx:63` (`Avatar.Image src` sin `alt`) ❌ deja avatares sin texto alternativo. Galerías (`[slug]/page.tsx:363`) y tarjetas (`alt={ministerio.title}`) ✅ aceptables aunque repetitivas. Logo `alt="Logo Bioiglesia"` ✅. |
| Jerarquía de encabezados | ❌ | Ver sección 2 (falta H1 en 3 plantillas). Además `Footer.tsx:68` y tarjetas usan `Heading` sin nivel explícito donde debería ser H2/H3. No usar encabezados por tamaño; eso es CSS. Fuente: https://developer.mozilla.org/es/docs/Web/HTML/Element/Heading_Elements |

**Notas:**
- Regla de oro ARIA: no usar ARIA si existe el elemento nativo (`<header>`, `<nav>`, `<main>`, `<footer>`, `<button>` vs `<a>`, `<ul>` vs `<div>`). El menú móvil (`NavMobile.tsx`) usa `Menu.Root` sin `aria-label` en el trigger (icono solo) → añadir `aria-label="Abrir menú"`. Validar con https://validator.w3.org/ + Lighthouse + axe. Fuente: https://developer.mozilla.org/es/docs/Web/Accessibility

---

## 6. Hreflang y Multiidioma

| Verificación              | Estado | Acción |
| ------------------------- | ------ | ------ |
| Variantes declaradas      | ➖ no aplica | Sitio monolingüe (`lang="es"`, `og:locale es_AR`, sin rutas `/en` ni `/pt`). No se requiere `hreflang`. |
| Self-referencing incluido | ➖ no aplica | — |
| Formato correcto          | ➖ no aplica | Si se internacionaliza, usar `es-AR`, `es-ES`, `x-default` en HTML + sitemap + canonical autocontenido por versión. Fuente: https://developers.google.com/search/docs/specialty/international/localized-versions |
| Canonical por versión     | ➖ no aplica | — |

**Notas:** No penaliza. Solo documentar la decisión para que un futuro `/en` no se implemente con `?lang=` sin canonical.

---

## 7. Mobile-First

| Verificación          | Estado | Acción |
| --------------------- | ------ | ------ |
| Contenido equivalente | ⚠️ | `Social.tsx:11` usa `hideBelow="md"` → los iconos sociales **desaparecen en móvil** en navbar y footer (que reutiliza `Social`). Google indexa mobile-first: lo oculto en móvil cuenta como ausente. Fuente: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing |
| Tap targets adecuados | ⚠️* | *No verificable sin render*: menú `IconButton size="lg"` ✅ apunta a ≥48px, pero botones `asChild` + enlaces del carrusel con overlay `opacity 0 → hover` (`CarouselComponent.tsx:97-107`) son inalcanzables por táctil (no hay `hover` en móvil) y el `right: -50px` de la tarjeta de horario (`Hero.tsx:187`) puede provocar scroll horizontal en 360px. Verificar a 360x740. |
| Viewport correcto     | ✅ | `layout.tsx:56-59` (`width=device-width, initialScale=1`) ✅. |
| Legibilidad móvil     | ✅* | Tipografías fluidas (`5xl→6xl→8xl`) y `maxW 85%`. *Revisar `lineHeight` fijo (`55px/65px`) con `fontSize 6xl/7xl` en `nosotros`/`contacto`: puede recortar descendentes con zoom 200%. |

**Notas:** Probar con Chrome DevTools (Moto G4 / Pixel) + PageSpeed móvil. El mapa diferido ayuda mucho en móvil (menos JS inicial).

---

## 8. Plan de acción priorizado

| Prioridad | Acción | Impacto estimado | Esfuerzo | Fuente |
| --------- | ------ | ---------------- | -------- | ------ |
| Alta | Añadir `as="h1"` único en `/nosotros`, `/contacto`, `/ministerios` + auditar que no haya doble H1 | Alto | Bajo | MDN https://developer.mozilla.org/es/docs/Web/HTML/Element/Heading_Elements |
| Alta | `constructMetadata`: sufijo `\| Bioiglesia`, títulos 50-60 chars, descripción 150-160 cortada por palabra; crear metadata de `/ministerios` con canonical absoluto | Alto | Bajo | Google https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=es |
| Alta | LCP: convertir hero `/nosotros` de CSS `backgroundImage` a `<Image priority fetchpriority="high">`, añadir `preload` + `fetchpriority` al hero Home, recomprimir `hero-iglesia.webp` (878 KB) y `og-image` (948 KB PNG→JPG/AVIF ≤200 KB), `sizes` reales | Alto | Medio | web.dev https://web.dev/articles/lcp + https://web.dev/learn/images |
| Alta | Completar schema `Church` (`geo`, `postalCode`, `sameAs`, `dayOfWeek` canónico) + añadir `WebSite`/`BreadcrumbList`; validar con Rich Results + Schema Validator | Alto | Bajo | Schema.org https://schema.org/Church + Google https://developers.google.com/search/docs/appearance/structured-data |
| Alta | Añadir `rel="noopener noreferrer"` a todos los `target="_blank"` y corregir `mail:` → `mailto:` en contacto | Medio | Bajo | Google https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links |
| Media | `sitemap.ts`: `lastModified` real por página, eliminar `priority/changefreq`; canonical absoluto en todas las páginas; verificar Search Console + token `verification.google` | Medio | Bajo | Google https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview |
| Media | Semántica: `Footer as="footer"`, `nav aria-label`, `<address>`+`<time>` para contacto/horarios, `<label>` en newsletter, desanidar `<button>`>`<a>` en `Social.tsx`, `alt` en `Avatar.Image`, alts descriptivos con keyword local | Medio | Medio | MDN https://developer.mozilla.org/es/docs/Web/Accessibility |
| Media | INP/CLS: `next/font` con `display: swap` + `preload`, revisar `autoplay` del carrusel (pausar en `prefers-reduced-motion`), reservar `aspect-ratio` en slots, auditar hidratación Chakra/Emotion | Medio | Medio | web.dev https://web.dev/articles/inp + https://web.dev/articles/cls |
| Media | E-E-A-T: fechas visibles, autor/organización, coherencia NAP (dirección/teléfono idénticos en Home/Contacto/schema/mapa) | Medio | Bajo | Google SEO Starter Guide (E-E-A-T) |
| Baja | `Social` visible en móvil (quitar `hideBelow` o duplicar en menú), tap targets ≥48px, sin scroll horizontal, `lang="es-AR"` | Bajo | Bajo | Google https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing |
| Baja | Retirar `keywords` como tarea SEO (mantener sin esfuerzo) y declarar OG absolutas explícitas | Bajo | Bajo | Google (keywords ignorado) |

---

## 9. Anexos

- [ ] Capturas de Search Console (pendiente: verificar propiedad con token `verification.google`)
- [ ] Datos de PageSpeed Insights (pendiente: sin URL pública — **no verificable** en esta auditoría)
- [ ] Validaciones de schema (pendiente: Rich Results Test + Schema.org Validator + Bing)
- [ ] Capturas de SERP para `iglesia evangélica Barrio Nuevo Libertad` (pendiente)
- [ ] Informe de cobertura (pendiente Search Console)
- [ ] Informe de Core Web Vitals de campo CrUX (pendiente Search Console)
- [x] Evidencia de código: `layout.tsx`, `lib/metadata.ts`, `robots.ts`, `sitemap.ts`, `page.tsx`, `Hero.tsx`, `nosotros/page.tsx`, `ContactClient.tsx`, `ministerios/page.tsx`, `[slug]/page.tsx`, `Footer.tsx`, `Social.tsx`, `Leaders.tsx`, `Navbar.tsx`, pesos `public/` y `src/assets/`

---

## 10. Conclusión

Bioiglesia parte de una base sana (robots/sitemap correctos, `noindex` bien usado, OG completo, JSON-LD en HTML inicial, viewport y `lang` correctos), pero pierde puntos en lo que más pondera Google: jerarquía de encabezados (3 plantillas sin H1), títulos dinámicos demasiado cortos y riesgo LCP por imágenes pesadas y hero CSS. Con las 5 acciones altas (H1, títulos, LCP, schema, `rel`/`mailto`) el sitio puede pasar de 67 a ~85 sin cambiar el diseño. El resto es disciplina de validación: Search Console + PSI + validadores de schema en cada despliegue.

---

## 11. Errores comunes a evitar (lecciones de esta auditoría)

1. **Creer que Chakra `Heading` ya es H1.** Sin `as="h1"` renderiza `h2`: tres páginas se quedaron sin H1. El nivel semántico no lo da el tamaño sino la etiqueta.
2. **Usar `robots.txt` para desindexar.** Aquí se hizo bien (`noindex` en `/links`), pero es el error nº1 del sector: `disallow` + `noindex` a la vez impide que Google vea el `noindex`.
3. **Poner `loading="lazy"` al hero o el hero como `background-image`.** `/nosotros` lo hace con CSS: el LCP se vuelve indetectable. El hero va en `<img>` descubrible con `fetchpriority="high"`.
4. **Recomendar `FAQPage` o `HowTo` para ganar rich results.** Ambos están restringidos/deprecados; en esta auditoría no se recomiendan. Solo tipos activos y contenido visible.
5. **Duplicar títulos por heredar metadata del layout.** `/ministerios` no tiene metadata propia y hereda la de la Home: canibalización interna garantizada.

---

## 12. Para reflexionar (autoevaluación del equipo)

1. Si Google reescribe el 40-60% de los títulos, ¿qué parte de tu título debe seguir convenciendo al usuario en la SERP aunque sea reescrito, y cómo lo garantizas con títulos de 5 caracteres como `MAAOC`?
2. ¿Qué pierde la versión móvil si ocultas los sociales con `hideBelow="md"` bajo indexación mobile-first, y cómo medirías esa pérdida en Search Console?
3. ¿Cómo distinguirías una mejora real de LCP/INP/CLS (datos de campo CrUX p75) de una mejora solo visible en Lighthouse laboratorio, y qué decisión de negocio tomarías con cada una?

---

## Firma

**Auditor:** Skill `seo-expert` v1.0.0 (Muse Spark, rol tutor-arquitecto)
**Fecha de entrega:** 2026-09-16
**Versión:** v1.0
**Fuentes verificadas:** Google Search Central https://developers.google.com/search/docs — web.dev https://web.dev/articles/vitals — Schema.org https://schema.org/ — MDN https://developer.mozilla.org/es/
