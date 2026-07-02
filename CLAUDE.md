# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Production build to dist/
npm run preview  # Serve the production build locally
```

There is no test runner, linter, or type-check script configured. `tsc` runs only implicitly via the editor; `npm run build` does not type-check (Vite's `build` skips `tsc`). To type-check manually, run `npx tsc --noEmit`.

## Architecture

Single-page marketing site for a hijama (cupping) clinic in Oman. React 19 + Vite 7 + Tailwind CSS v4, TypeScript strict mode. No router, no backend, no data fetching — everything is static content rendered client-side. All CTAs deep-link to WhatsApp (`https://wa.me/96899351374`).

### Page composition

[src/App.tsx](src/App.tsx) wraps everything in `LanguageProvider` and renders a fixed section order: `Navbar → Hero → TrustStrip → About → Benefits → Gallery → Branches → Testimonials → Contact → Footer`. Sections live in [src/components/](src/components/), one file per section. Section anchors (`#home`, `#about`, etc.) drive Navbar scroll navigation.

### Internationalization (the core pattern)

Three languages — Arabic (default), English, Urdu — with RTL/LTR direction switching. This is the most load-bearing part of the codebase; touch it carefully.

- [src/i18n/ar.ts](src/i18n/ar.ts) is the **source of truth**. It exports the `ar` object and derives `export type Translations = typeof ar`. `en.ts` and `ur.ts` must structurally match `ar.ts` exactly or TypeScript will error.
- **When adding or changing any user-facing string, edit all three i18n files.** There is no fallback — a missing key in `en`/`ur` is a type error, not a silent gap.
- Each translation object carries `dir: "rtl" | "ltr"` and `lang`. [src/contexts/LanguageContext.tsx](src/contexts/LanguageContext.tsx) sets `document.documentElement.lang`/`dir` on language change and on mount (defaults to `ar`/`rtl`).
- Components consume translations via `const { t, lang, setLang } = useLang()` — never hardcode display copy in a component.

### Styling

Tailwind v4 configured entirely in CSS via `@theme` in [src/index.css](src/index.css) — there is **no `tailwind.config.js`**. The brand palette (bordeaux `#6a0720`, gold `#c9a84c`, snow `#faf6f7`) and the Cairo font are defined there as CSS custom properties, which makes utilities like `bg-bordeaux`, `text-gold`, `font-sans` available. Reusable component classes (`.btn-gold`, `.btn-whatsapp`, `.card-base`, `.glass-dark`, `.text-gold-shimmer`) are also defined in `index.css` — prefer these over re-deriving the same gradients/shadows inline.

### Scroll reveal animation

[src/hooks/useReveal.ts](src/hooks/useReveal.ts) is called once in `AppInner` and wires a single `IntersectionObserver` to every `.reveal` element. To animate an element on scroll, add `className="reveal"` (optionally `reveal-delay-1..5` for stagger); the observer adds `.visible` when it enters the viewport. No per-component observer setup needed.

### Assets

Static images (logo, hero, `gallery/gallery-01..09.jpg`) live in [public/](public/) and are referenced by absolute path (e.g. `src="/logo.png"`). `@/*` is aliased to `src/*` (see [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json)).
