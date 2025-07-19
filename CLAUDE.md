# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based landing page generator for multi-regional campaign pages. The project creates landing pages in different languages (JP, KR, US) with dynamic routing for different people/campaigns and versions.

## Development Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun dev` | Start development server at localhost:4321 |
| `bun build` | Build production site to ./dist/ |
| `bun preview` | Preview build locally |
| `bun astro ...` | Run Astro CLI commands |
| `./deploy_static.sh` | Build and deploy to cf-cloak project |

## Code Quality Commands

| Command | Description |
|---------|-------------|
| `bunx eslint .` | Run ESLint linting |
| `bunx astro check` | Type-check Astro files |

## Architecture

### Directory Structure
- `/src/pages/` - File-based routing with region-specific folders (JP/, KR/, US/)
- `/src/components/` - Reusable Astro and React components
- `/src/layouts/` - Page layout templates
- `/src/utils/` - Utility functions and shared logic

### Dynamic Routing Pattern
The project uses a complex dynamic routing system:
- `[people]/YYYYMMDD-N.[version].[t]/index.astro` - Campaign pages with date, version, and type parameters
- `getStaticPaths()` functions generate routes for different people/campaigns
- Static assets are organized in campaign-specific `static/` folders

### Technology Stack
- **Astro 5.11.0** - Static site generator with file-based routing
- **React 19** - Component library for interactive elements  
- **UnoCSS** - Utility-first CSS framework with custom animations
- **TypeScript** - Type checking with strict configuration
- **Bun** - Package manager and runtime

### Key Components
- `BaseLayout.astro` - Main layout wrapper
- `RedirectCode.astro` - Handles campaign redirects
- Landing page components with region-specific styling

### Build Configuration
- Assets are built to `mjSFqQ/` directory (configured in astro.config.mjs)
- Custom deployment script copies built assets to cf-cloak project
- Path alias `@/` points to `./src/`

### Styling
- UnoCSS with custom animations (breathing effect)
- CSS files imported directly in components
- Responsive design with mobile-first approach

### Image Management
- Images stored in region/campaign-specific folders
- Dynamic imports used for campaign-specific assets
- Astro:assets integration for optimization

## Development Notes

- The root index.astro page auto-discovers all available pages using `import.meta.glob()`
- Each campaign has its own static assets folder for images and CSS
- Dynamic routes support multiple versions and types (kakao, band) for A/B testing
- ESLint uses @antfu/eslint-config with Astro and Prettier formatting