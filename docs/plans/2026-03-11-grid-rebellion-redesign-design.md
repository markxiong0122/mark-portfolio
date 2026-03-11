# Grid Rebellion — Portfolio Redesign

**Date:** 2026-03-11
**Approach:** Structured chaos brutalism — visible grid system with intentional rule-breaking
**Scope:** Full visual redesign, same content (projects, tracks, bio, Vanishing Point)

---

## Typography

| Role | Font | Source | Usage |
|------|------|--------|-------|
| Display | Clash Display | Fontshare | Name, section headings, section numbers — used at extreme sizes |
| Body | JetBrains Mono | Google Fonts (already loaded) | All body text, metadata, labels — raw/code aesthetic |
| Accent | Cormorant Garamond | Google Fonts (already loaded) | Project titles only (italic) — tension between brutalist and elegant |

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--black` | `#0a0a0a` | Primary text, borders, fills |
| `--white` | `#f5f5f0` | Background |
| `--accent` | `#FF4D00` | Construction orange — links, hover states, section numbers at low opacity |
| `--grid` | `rgba(0,0,0,0.06)` | Visible grid lines |

No gradients, no soft shadows. Flat and raw.

## Grid System

- 12-column grid rendered as thin vertical lines across full viewport
- Always visible as a background layer (CSS `::before` or dedicated element)
- Content lives on the grid but frequently breaks boundaries
- Collapses to 4 columns on mobile

## Hero

- "MARK XIONG" in Clash Display at ~15vw, flush left, spanning full width
- "ENTREPRENEUR & BUILDER" in JetBrains Mono, 0.8rem, letterspaced, positioned in left gutter (columns 1-2)
- Profile photo: duotone (black + orange), overlaps right side of name, breaks grid edge, 2px raw border
- Scroll effect: `scaleY` compresses to 0.3, `letterSpacing` tightens — "crushed" instead of fade

## Section Numbers

- `01`, `02`, `03` at 30-40vh height in Clash Display
- Semi-transparent accent orange (opacity 0.06)
- Background anchors that bleed behind content
- Parallax: scroll at 0.5x speed

## Profile (01)

- Title "The Art of Intentional Building" in Clash Display ~4rem, columns 3-11
- Bio in JetBrains Mono, columns 4-9, line-height 1.8
- Key phrases: orange inline underlines

## Projects (02)

- Each card breaks grid differently:
  - Title: Cormorant Garamond italic ~3rem, starts column 2, bleeds into gutter
  - Metadata: JetBrains Mono, small, column 1 (marginalia)
  - Summary: columns 4-10, monospace
  - Links: raw bordered boxes (2px solid black, no fill, uppercase mono)
  - Case study toggle: `[+]`/`[-]` in margin
- Projects separated by full-width 2px horizontal rules

## Music/Art (03)

- Track cards: raw bordered containers, monospace labels, orange progress bars
- Vanishing Point: breaks right grid edge, heavy black border, rotated "INTERACTIVE" label in margin

## Footer

- No background — heavy top border
- Links inline, monospace, separated by `/`
- "Chicago" as small label in column 1

## Animation & Interaction

**Scroll (Framer Motion):**
- Hero: `scaleY` crush + `letterSpacing` collapse on scroll
- Section entries: elements slide from grid column positions (title from left, body center, metadata drops), staggered 100ms
- Section numbers: 0.5x parallax

**Hover:**
- Project titles: orange background highlight, instant toggle (no easing)
- Links: border boxes invert (black fill, white text), hard swap
- Audio tracks: waveform underline animation

**Micro-interactions:**
- Grid lines pulse (0.04 → 0.08 opacity) near scroll position ("scanner" effect)
- `cursor: crosshair` over project cards
- Case study expand: spring snap (high stiffness, low damping)

**Mobile:**
- 4-column grid
- `clamp()` for all type scaling
- Hover → tap
- Grid pulse disabled for performance
