# Grid Rebellion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from "warm quiet luxury" to "structured chaos brutalism" — visible grid, massive type, construction orange accent, grid-breaking layouts.

**Architecture:** Same Next.js 16 + Framer Motion stack. Replace all CSS styles, restructure page.tsx layout, add a GridOverlay component, redesign ProjectCard and TrackCard. Content files (projects.ts, tracks.ts) stay untouched.

**Tech Stack:** Next.js 16, React 19, Framer Motion, Tailwind CSS 4, Clash Display (Fontshare), JetBrains Mono, Cormorant Garamond

---

### Task 1: Branch Setup & Font Loading

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Create feature branch**

Run: `git checkout -b feat/grid-rebellion`

**Step 2: Update layout.tsx — remove Outfit, add Clash Display via Fontshare CDN**

Replace the font imports and layout. Remove `Outfit` entirely. Add a `<link>` to Fontshare CDN for Clash Display in the `<head>`. Keep Cormorant Garamond (accent italic) and JetBrains Mono (body text).

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mark Xiong - Entrepreneur & Builder",
  description: "Portfolio of Mark Xiong - CS major, builder, and creator",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
      <Analytics />
    </html>
  );
}
```

**Step 3: Verify fonts load**

Run: `npm run dev`
Open http://localhost:3000, inspect element, confirm Clash Display is loading in the Network tab.

**Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: swap font stack — add Clash Display, remove Outfit"
```

---

### Task 2: CSS Foundation — Variables, Base Styles & Grid Overlay

**Files:**
- Rewrite: `app/globals.css`

**Step 1: Rewrite globals.css with new design system**

Replace the entire file. This establishes:
- New color palette (black/white/orange)
- Visible 12-column grid overlay via `body::after`
- Base typography using JetBrains Mono as default body font
- Grain overlay kept but adjusted
- New transition tokens

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Grid Rebellion Palette */
  --black: #0a0a0a;
  --white: #f5f5f0;
  --accent: #FF4D00;
  --grid-color: rgba(0, 0, 0, 0.06);
  --grid-color-active: rgba(0, 0, 0, 0.1);
  --rule: #0a0a0a;

  /* Grid dimensions */
  --grid-columns: 12;
  --grid-gap: 0;
  --grid-margin: clamp(1.5rem, 4vw, 4rem);
  --grid-max-width: 1400px;

  /* Transitions */
  --snap: 0s;  /* instant / brutalist */
  --transition-base: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-jetbrains), monospace;
  background-color: var(--white);
  color: var(--black);
  line-height: 1.6;
  font-size: clamp(0.85rem, 1vw, 1rem);
  font-weight: 400;
  overflow-x: hidden;
  cursor: default;
}

/* Grain Overlay */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}

/* ================================================================
   VISIBLE GRID OVERLAY
   12 columns, always visible, content breaks through it
   ================================================================ */
.grid-overlay {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: var(--grid-max-width);
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  padding: 0 var(--grid-margin);
  pointer-events: none;
  z-index: 9998;
}

.grid-overlay .grid-col {
  border-right: 1px solid var(--grid-color);
  height: 100%;
}

.grid-overlay .grid-col:first-child {
  border-left: 1px solid var(--grid-color);
}

/* ================================================================
   PORTFOLIO CONTAINER
   ================================================================ */
.portfolio-container {
  position: relative;
  min-height: 300vh;
}

/* ================================================================
   HERO SECTION
   ================================================================ */
.hero-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: var(--white);
  display: flex;
  align-items: flex-end;
  z-index: 1;
  will-change: transform;
  overflow: hidden;
  padding: 0 var(--grid-margin);
}

.hero-inner {
  width: 100%;
  max-width: var(--grid-max-width);
  margin: 0 auto;
  position: relative;
  padding-bottom: clamp(3rem, 8vh, 6rem);
}

.hero-name {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(4rem, 15vw, 14rem);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.03em;
  color: var(--black);
  text-transform: uppercase;
  will-change: transform, letter-spacing;
}

.hero-subtitle {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.65rem, 0.9vw, 0.85rem);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.5;
  position: absolute;
  top: clamp(2rem, 5vh, 4rem);
  left: 0;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

/* Duotone photo treatment */
.hero-photo-wrapper {
  position: absolute;
  right: clamp(2rem, 8vw, 8rem);
  top: 50%;
  transform: translateY(-50%);
  width: clamp(180px, 22vw, 320px);
  z-index: 3;
  border: 2px solid var(--black);
}

.hero-photo-wrapper img {
  display: block;
  width: 100%;
  height: auto;
  filter: grayscale(100%) contrast(1.3);
}

.hero-photo-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent);
  mix-blend-mode: color;
  opacity: 0.5;
  pointer-events: none;
}

/* ================================================================
   CONTENT WRAPPER
   ================================================================ */
.content-wrapper {
  position: relative;
  z-index: 2;
  background-color: var(--white);
  min-height: 200vh;
  padding-top: clamp(4rem, 8vh, 8rem);
  will-change: transform;
}

/* ================================================================
   CONTAINER — content area within the grid
   ================================================================ */
.container {
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--grid-margin);
}

/* ================================================================
   SECTIONS
   ================================================================ */
.section {
  margin-bottom: clamp(6rem, 12vw, 12rem);
  position: relative;
}

.section:last-child {
  padding-bottom: clamp(6rem, 12vw, 12rem);
}

/* Giant background section numbers */
.section-number {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(15rem, 35vw, 40rem);
  font-weight: 700;
  line-height: 0.8;
  color: var(--accent);
  opacity: 0.06;
  position: absolute;
  top: -0.15em;
  left: -0.05em;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

.section-label {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.65rem, 0.8vw, 0.75rem);
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--black);
  opacity: 0.4;
  margin-bottom: clamp(1rem, 2vw, 2rem);
  display: block;
}

.section-title {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 600;
  line-height: 1.05;
  margin-bottom: clamp(2rem, 4vw, 3rem);
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
}

/* Section body text — grid-positioned */
.section p {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.85rem, 1vw, 1rem);
  line-height: 1.8;
  font-weight: 400;
  color: var(--black);
  opacity: 0.7;
  margin-bottom: 1.5rem;
  max-width: 38rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
}

/* Push profile text to grid columns 4-9 */
.section-bio {
  margin-left: calc(25%);  /* Start at ~column 4 of 12 */
  max-width: 38rem;
}

/* ================================================================
   PROJECT CARDS — grid-breaking layout
   ================================================================ */
.project {
  position: relative;
  padding: clamp(3rem, 5vw, 5rem) 0;
  border: none;
  border-top: 2px solid var(--black);
  margin-bottom: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: flex-start;
  cursor: crosshair;
}

.project:last-of-type {
  border-bottom: 2px solid var(--black);
}

/* Marginalia — metadata floats in the left gutter */
.project-info {
  position: sticky;
  top: 4rem;
}

.project h3 {
  font-family: var(--font-cormorant), serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 300;
  line-height: 1.05;
  margin-bottom: 0.75rem;
  color: var(--black);
  font-style: italic;
  transition: color var(--snap);
}

.project:hover h3 {
  color: var(--accent);
}

.project .meta {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.6rem, 0.7vw, 0.7rem);
  color: var(--black);
  opacity: 0.4;
  margin-bottom: 0;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.project .summary {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.85rem, 1vw, 1rem);
  line-height: 1.8;
  font-weight: 400;
  color: var(--black);
  opacity: 0.7;
  margin-bottom: 2rem;
  max-width: 100%;
}

/* Project Links — raw bordered boxes */
.project-links {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
}

.project-links a {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.65rem, 0.75vw, 0.75rem);
  color: var(--black);
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border: 2px solid var(--black);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  transition: background var(--snap), color var(--snap);
}

.project-links a:hover {
  background: var(--black);
  color: var(--white);
}

/* Case study toggle — [+] / [-] style */
.expand-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  background: transparent;
  color: var(--black);
  border: none;
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.65rem, 0.75vw, 0.75rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: crosshair;
  font-weight: 400;
  opacity: 0.5;
  transition: opacity var(--transition-base);
}

.expand-btn:hover {
  opacity: 1;
}

/* Project Details */
.project-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
}

.project-details.expanded {
  max-height: 5000px;
  opacity: 1;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.project-details p {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.8rem, 0.95vw, 0.95rem);
  line-height: 1.8;
  color: var(--black);
  opacity: 0.65;
}

.project-details h4 {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.4rem);
  font-weight: 500;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ================================================================
   TRACK CARDS — raw bordered containers
   ================================================================ */
.track {
  padding: clamp(1.5rem, 3vw, 2.5rem) 0;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.5fr);
  gap: clamp(2rem, 4vw, 4rem);
  align-items: center;
}

.track h4 {
  font-family: var(--font-cormorant), serif;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  font-weight: 400;
  margin-bottom: 0.25rem;
  color: var(--black);
  font-style: italic;
}

.track p {
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.7rem, 0.8vw, 0.8rem);
  font-weight: 300;
  color: var(--black);
  opacity: 0.4;
  margin-bottom: 0;
  max-width: 100%;
  line-height: 1.6;
}

/* Audio Player — raw styling */
audio {
  width: 100%;
  height: 32px;
  opacity: 0.5;
  transition: opacity var(--transition-base);
}

audio:hover {
  opacity: 1;
}

/* Vanishing Point — breaks right grid edge */
.vanishing-point-wrapper {
  position: relative;
  margin-top: clamp(2rem, 4vw, 4rem);
  border: 2px solid var(--black);
}

.vanishing-point-wrapper iframe {
  display: block;
  width: 100%;
  height: clamp(400px, 50vw, 600px);
  border: none;
}

.vanishing-point-label {
  position: absolute;
  top: 1rem;
  right: calc(-1 * clamp(1.5rem, 3vw, 3rem));
  font-family: var(--font-jetbrains), monospace;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

/* ================================================================
   FOOTER — minimal, raw
   ================================================================ */
.footer {
  border-top: 2px solid var(--black);
  padding: clamp(3rem, 5vw, 5rem) 0;
  position: relative;
  z-index: 10;
  width: 100%;
  background: transparent;
}

.footer-content {
  max-width: var(--grid-max-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 0 var(--grid-margin);
}

.footer-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.footer-links a {
  color: var(--black);
  opacity: 0.4;
  transition: opacity var(--snap);
}

.footer-links a:hover {
  opacity: 1;
}

.footer-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--black);
  opacity: 0.4;
  font-family: var(--font-jetbrains), monospace;
  font-size: clamp(0.65rem, 0.75vw, 0.75rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* ================================================================
   RESPONSIVE — grid collapse + scaling
   ================================================================ */
@media (max-width: 1024px) {
  .hero-photo-wrapper {
    width: clamp(150px, 25vw, 220px);
    right: 2rem;
  }
}

@media (max-width: 768px) {
  :root {
    --grid-columns: 4;
  }

  .content-wrapper {
    padding-top: 4rem;
  }

  .section {
    margin-bottom: 6rem;
  }

  .section-bio {
    margin-left: 0;
  }

  .section p {
    margin-left: 0;
    margin-right: 0;
  }

  .project,
  .track {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .project-info {
    position: static;
  }

  .hero-subtitle {
    writing-mode: horizontal-tb;
    position: relative;
    top: auto;
    margin-bottom: 1rem;
  }

  .hero-photo-wrapper {
    position: relative;
    right: auto;
    top: auto;
    transform: none;
    width: 60%;
    margin-bottom: 2rem;
  }

  .hero-section {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .hero-inner {
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-number {
    font-size: 20rem;
  }

  .vanishing-point-label {
    display: none;
  }
}

@media (max-width: 480px) {
  .section-number {
    font-size: 12rem;
  }

  .hero-photo-wrapper {
    width: 70%;
  }
}

/* ================================================================
   REDUCED MOTION
   ================================================================ */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2: Verify base styles**

Run: `npm run dev`
Check that the page loads with the new color palette, JetBrains Mono body text, and no old sage/taupe styles remain.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: replace CSS foundation — brutalist palette, grid system, raw typography"
```

---

### Task 3: Grid Overlay Component

**Files:**
- Create: `components/GridOverlay.tsx`

**Step 1: Create the GridOverlay component**

This renders the 12 visible grid columns as a fixed background. It also includes a subtle "scanner" effect — grid lines near the current scroll position pulse slightly brighter.

```tsx
"use client";

import { useEffect, useState } from "react";

export function GridOverlay() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="grid-overlay" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="grid-col" />
      ))}
    </div>
  );
}
```

Note: The scanner effect (grid lines pulsing near scroll position) is a stretch goal. Start with static grid lines. If time permits, add a CSS animation that shifts opacity based on a CSS custom property set by JS.

**Step 2: Commit**

```bash
git add components/GridOverlay.tsx
git commit -m "feat: add GridOverlay component — visible 12-column grid"
```

---

### Task 4: Rewrite page.tsx — Hero + Sections + Footer

**Files:**
- Rewrite: `app/page.tsx`

**Step 1: Rewrite the entire page**

This is the big one. Replace all JSX with the Grid Rebellion layout. Key changes:
- Import and render `GridOverlay`
- Hero: massive `MARK XIONG` text, vertical subtitle in gutter, duotone photo overlapping
- Scroll: `scaleY` crush + `letterSpacing` collapse instead of fade
- Sections: giant background numbers with `useScroll` parallax, grid-breaking layouts
- Profile bio positioned in center columns
- Projects render with new grid-breaking `ProjectCard`
- Music section with raw styling
- Vanishing Point with bordered wrapper and rotated label
- Footer: minimal, no background

```tsx
"use client";

import { GridOverlay } from "@/components/GridOverlay";
import { ProjectCard } from "@/components/ProjectCard";
import { TrackCard } from "@/components/TrackCard";
import { projects } from "@/content/projects";
import { tracks } from "@/content/tracks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Hero crush effect — scaleY compresses, letterSpacing tightens
  const heroScaleY = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  const heroLetterSpacing = useTransform(scrollYProgress, [0, 0.4], ["-0.03em", "-0.15em"]);
  const heroOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

  // Section number parallax (scroll at 0.5x speed)
  const { scrollY } = useScroll();
  const sectionParallax = useTransform(scrollY, (v) => v * -0.5);

  // Staggered entry animation config
  const staggerIn = (delay: number = 0) => ({
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const staggerInUp = (delay: number = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  });

  const dropIn = (delay: number = 0) => ({
    initial: { opacity: 0, y: -20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div ref={containerRef} className="portfolio-container">
      <GridOverlay />

      {/* ======== HERO ======== */}
      <motion.div className="hero-section" style={{ opacity: heroOpacity }}>
        <div className="hero-inner">
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Entrepreneur & Builder
          </motion.p>

          <div className="hero-photo-wrapper">
            <motion.img
              src="/images/mark-photo.jpg"
              alt="Mark Xiong"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <motion.h1
            className="hero-name"
            style={{
              scaleY: heroScaleY,
              letterSpacing: heroLetterSpacing,
              transformOrigin: "bottom left",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Mark<br />Xiong
          </motion.h1>
        </div>
      </motion.div>

      {/* ======== CONTENT ======== */}
      <motion.div className="content-wrapper" style={{ y: contentY }}>
        <div className="container">

          {/* -------- 01 / PROFILE -------- */}
          <section id="about" className="section">
            <motion.div
              className="section-number"
              style={{ y: sectionParallax }}
              aria-hidden="true"
            >
              01
            </motion.div>

            <motion.span className="section-label" {...dropIn(0)}>
              01 / profile
            </motion.span>

            <motion.h2 className="section-title" {...staggerIn(0.1)}>
              The Art of Intentional Building
            </motion.h2>

            <div className="section-bio">
              <motion.p {...staggerInUp(0.15)}>
                Mark is an entrepreneur and builder who creates user-facing
                products that make people actually feel something—preferably
                laughter, or joy brought by the disappearance of tedious work.
                He&apos;s drawn to projects that sit at the intersection of
                technical challenge and emotional payoff, where clever engineering
                meets genuine human delight or genuine productivity gains.
              </motion.p>
              <motion.p {...staggerInUp(0.25)}>
                Growing up in China and living across the UK, Paris, and the US
                shaped his approach to design: he specializes in multicultural
                fusion, blending Eastern and Western aesthetics in ways that feel
                natural rather than forced. Whether it&apos;s sampling guzheng
                over trap beats or building social apps, he&apos;s interested in
                how cultural elements can remix into something entirely new.
              </motion.p>
              <motion.p {...staggerInUp(0.35)}>
                Mark&apos;s creative sense pulls equally from fashion runways,
                basketball courts, and Formula 1 circuits—he believes good design
                borrows shamelessly from everywhere. His work spans beat
                production, computer vision experiments, and mobile apps, united
                by a philosophy that technology should either simplify your life
                or make you smile. Ideally both.
              </motion.p>
            </div>
          </section>

          {/* -------- 02 / WORKS -------- */}
          <section id="projects" className="section">
            <motion.div
              className="section-number"
              style={{ y: sectionParallax }}
              aria-hidden="true"
            >
              02
            </motion.div>

            <motion.span className="section-label" {...dropIn(0)}>
              02 / works
            </motion.span>

            <motion.h2 className="section-title" {...staggerIn(0.1)}>
              Selected Software Projects
            </motion.h2>

            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </section>

          {/* -------- 03 / ART -------- */}
          <section id="music" className="section">
            <motion.div
              className="section-number"
              style={{ y: sectionParallax }}
              aria-hidden="true"
            >
              03
            </motion.div>

            <motion.span className="section-label" {...dropIn(0)}>
              03 / art
            </motion.span>

            <motion.h2 className="section-title" {...staggerIn(0.1)}>
              Sampling as Cultural Dialogue
            </motion.h2>

            <motion.p {...staggerInUp(0.15)} style={{ marginLeft: 0, maxWidth: "38rem" }}>
              A three-track exploration of hip-hop production techniques,
              investigating how sampling functions as conversation—with genre
              conventions, musical archives, and cross-cultural traditions.
            </motion.p>

            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <TrackCard track={track} />
              </motion.div>
            ))}

            {/* Vanishing Point */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.h2
                className="section-title"
                {...staggerIn(0.1)}
                style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}
              >
                Vanishing Point
              </motion.h2>
              <motion.p {...staggerInUp(0.2)} style={{ marginLeft: 0, maxWidth: "38rem" }}>
                Human presence is always there but receding — tracing the arc of
                creative computing toward a point where the maker disappears into
                the system itself.
              </motion.p>
              <div className="vanishing-point-wrapper">
                <span className="vanishing-point-label">Interactive</span>
                <iframe
                  src="/vanishing-point/"
                  title="Vanishing Point — Progressive Abstraction of Human Presence"
                />
              </div>
            </motion.div>
          </section>
        </div>
      </motion.div>

      {/* ======== FOOTER ======== */}
      <footer className="footer">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="footer-links">
            <a href="mailto:haoxiang@uchicago.edu" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L12 15L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/mark-xiong-356aa3210/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C16 8 17.5 8 19 9.5C20.5 11 20.5 12.5 20.5 12.5V20H17V12.5C17 12.5 17 11.5 16.5 11C16 10.5 15.5 10.5 15.5 10.5H14V20H10.5V8H14V9.5C14 9.5 14.5 8 16 8Z" fill="currentColor" />
                <rect x="2" y="2" width="8" height="8" rx="1" fill="currentColor" />
                <path d="M2 12H8V20H2V12Z" fill="currentColor" />
              </svg>
            </a>
            <a href="https://github.com/markxiong0122" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.872 20.169 8.838 21.389C9.339 21.476 9.518 21.17 9.518 20.907C9.518 20.669 9.509 20.029 9.505 19.218C6.726 19.803 6.139 17.884 6.139 17.884C5.685 16.746 5.029 16.438 5.029 16.438C4.121 15.837 5.098 15.849 5.098 15.849C6.103 15.921 6.63 16.88 6.63 16.88C7.514 18.372 8.929 17.926 9.532 17.671C9.621 17.049 9.878 16.604 10.161 16.357C7.665 16.108 5.047 15.114 5.047 11.237C5.047 10.063 5.466 9.103 6.149 8.357C6.046 8.107 5.677 7.016 6.263 5.559C6.263 5.559 7.168 5.279 9.5 6.653C10.857 6.294 12.311 6.294 13.668 6.653C16 5.279 16.905 5.559 16.905 5.559C17.491 7.016 17.122 8.107 17.019 8.357C17.703 9.103 18.122 10.063 18.122 11.237C18.122 15.124 15.497 16.105 12.991 16.35C13.346 16.66 13.666 17.273 13.666 18.205C13.666 19.543 13.654 20.622 13.654 20.951C13.654 21.218 13.831 21.526 14.343 21.435C18.408 20.168 21.282 16.418 21.282 12C21.282 6.477 16.805 2 12 2Z" fill="currentColor" />
              </svg>
            </a>
          </div>
          <div className="footer-location">
            <span>Chicago</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
```

**Step 2: Verify the page renders**

Run: `npm run dev`
Check each section: hero crush on scroll, giant section numbers, project grid layout, music section, footer.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: rewrite page layout — hero crush, giant section numbers, grid-breaking structure"
```

---

### Task 5: Update ProjectCard — [+]/[-] Toggle & Bold Formatting

**Files:**
- Modify: `components/ProjectCard.tsx`

**Step 1: Update the expand button text and styling**

Change the expand button from "Read case study" / "Close" to "[+] Case Study" / "[-] Case Study". The bold formatting logic stays the same, but update the inline styles for the new design system.

```tsx
"use client";

import { Project } from "@/content/projects";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatContent = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return (
          <span
            key={index}
            style={{
              fontWeight: 500,
              color: "var(--black)",
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "1.1em",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginTop: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            {boldText}
          </span>
        );
      }
      return (
        <span key={index}>
          {part.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < part.split("\n").length - 1 && <br />}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <article className="project">
      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="meta">{project.meta}</p>
      </div>

      <div className="project-content">
        <p className="summary">{project.summary}</p>

        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {project.hasCaseStudy && (
          <>
            <button
              className="expand-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              {isExpanded ? "[−] Case Study" : "[+] Case Study"}
            </button>
            {isExpanded && project.content && (
              <div className="project-details expanded">
                <p>{formatContent(project.content)}</p>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
```

**Step 2: Verify project cards**

Run: `npm run dev`
Check that project cards display correctly, case study toggles work with [+]/[-], hover states (title turns orange, links invert) function.

**Step 3: Commit**

```bash
git add components/ProjectCard.tsx
git commit -m "feat: update ProjectCard — brutalist toggle, Clash Display section headers"
```

---

### Task 6: Build Verification & Final Polish

**Files:**
- No new files — verify everything works

**Step 1: Run lint**

Run: `npm run lint`
Fix any lint errors.

**Step 2: Run build**

Run: `npm run build`
Ensure no build errors. Fix any TypeScript or compilation issues.

**Step 3: Visual check**

Run: `npm run dev`
Verify at 3 breakpoints:
- Desktop (1440px): full 12-column grid, hero crush, photo overlap
- Tablet (768px): grid collapses to 4 columns, subtitle horizontal, cards stack
- Mobile (375px): scaled type via clamp(), single-column layout

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: lint and build fixes for grid rebellion redesign"
```

---

## Summary of Files Changed

| File | Action | Description |
|------|--------|-------------|
| `app/layout.tsx` | Modify | Remove Outfit font, add Clash Display CDN link |
| `app/globals.css` | Rewrite | Entire new design system — colors, grid, typography, components |
| `app/page.tsx` | Rewrite | Hero crush, giant section numbers, grid-breaking layout |
| `components/GridOverlay.tsx` | Create | Visible 12-column grid overlay |
| `components/ProjectCard.tsx` | Modify | [+]/[-] toggle, Clash Display headers in case study |
| `components/TrackCard.tsx` | Unchanged | Styling handled entirely by CSS |
| `content/projects.ts` | Unchanged | Same content |
| `content/tracks.ts` | Unchanged | Same content |
