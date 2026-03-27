# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use **Bun** as the package manager (not npm/yarn).

```bash
bun dev          # Start dev server with HMR
bun run build    # Type-check + production build (tsc -b && vite build)
bun run lint     # ESLint on all files
bun run preview  # Preview production build locally
```

## Tech Stack

- **React 19** with the React Compiler enabled (via `babel-plugin-react-compiler`)
- **TypeScript** in strict mode, targeting ES2023
- **Vite 8** with `@vitejs/plugin-react` (Oxc-based JSX transform) and `@tailwindcss/vite`
- **Tailwind CSS v4** — configured via the Vite plugin, no `tailwind.config.js`
- **shadcn/ui** — component library built on Radix UI; add components with `bunx shadcn@latest add <name>`
- **React Router v7** for client-side routing
- **@tanstack/react-query v5** for server state
- **framer-motion** for animations
- **lucide-react** for icons
- **ESLint 9** using the flat config format (`eslint.config.js`)

## Architecture

Entry point is `src/main.tsx` → `<App />` in `index.html#root`.

`App.tsx` sets up global providers (`QueryClientProvider`, `TooltipProvider`), `BrowserRouter`, and routes. All routes are defined there — add new pages above the catch-all `*` route.

```
src/
  App.tsx            # Providers + route definitions
  pages/             # Page-level components (one per route)
  components/        # Shared/feature components
  components/ui/     # shadcn/ui primitives (auto-generated, avoid manual edits)
  lib/utils.ts       # cn() helper (Tailwind class merging)
```

### Path Alias

`@/` maps to `src/`. Configured in `vite.config.ts` and `tsconfig.app.json`.

### React Compiler

Manual memoization (`useMemo`, `useCallback`, `memo`) is generally unnecessary — the compiler handles it automatically.

### TypeScript Config

`tsconfig.app.json` (source) and `tsconfig.node.json` (build tooling). Both use `"moduleResolution": "bundler"`. `verbatimModuleSyntax` is enabled — type-only imports must use `import type` or `import { type Foo }`.

### shadcn/ui

Uses Tailwind v4 CSS variables for theming (defined in `src/index.css`). The `toaster` component is deprecated — use `sonner` instead.
