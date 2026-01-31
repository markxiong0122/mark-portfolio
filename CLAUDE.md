# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- `npm run dev` - Start the development server on http://localhost:3000
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 16 portfolio site for Mark Xiong with scroll-based animations using Framer Motion.

### Tech Stack
- **Next.js 16** with App Router (app directory structure)
- **React 19** with TypeScript
- **Framer Motion** for scroll-linked animations
- **Tailwind CSS 4** with custom CSS variables for the "warm quiet luxury" color palette

### Project Structure

```
app/
├── page.tsx          # Main portfolio page with scroll animations
├── layout.tsx        # Root layout with font configuration
└── globals.css       # Global styles with CSS variables and animation classes

components/
├── ProjectCard.tsx   # Reusable project card with expandable case studies
└── TrackCard.tsx     # Music track display card

content/
├── projects.ts       # Project data and TypeScript interfaces
└── tracks.ts         # Music production track data
```

### Key Architecture Patterns

**Scroll-Based Animation System**: The portfolio uses Framer Motion's `useScroll` and `useTransform` hooks to create a pinned hero effect where:
- The hero section remains fixed while scrolling (`position: fixed`)
- Content scrolls over the hero with parallax effects
- Hero fades out and scales down based on scroll progress
- Sections animate in when entering the viewport using `whileInView`

**Content Management**: Static content is stored in TypeScript files in the `content/` directory:
- `projects.ts` exports a `Project` interface and `projects` array
- `tracks.ts` exports music track data
- Content is imported directly into page components (no CMS)

**Styling Approach**: Hybrid of Tailwind utilities and custom CSS:
- Tailwind for layout and utility classes
- Custom CSS variables for the warm luxury color palette
- Custom classes for scroll animation behaviors defined in `globals.css`

### TypeScript Configuration

- Path alias `@/*` maps to root directory for imports
- Strict mode enabled
- Uses Next.js TypeScript plugin for enhanced type checking

### Adding New Content

To add new projects:
1. Add project data to `content/projects.ts` following the `Project` interface
2. The project will automatically appear in the projects section

To add new music tracks:
1. Add track data to `content/tracks.ts`
2. Tracks automatically render in the music production section
