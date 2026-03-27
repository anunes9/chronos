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
- **Vite 8** with `@vitejs/plugin-react` (Oxc-based JSX transform)
- **ESLint 9** using the flat config format (`eslint.config.js`)

## Architecture

This is a fresh React + TypeScript + Vite project. Entry point is `src/main.tsx`, which mounts `<App />` into `#root` in `index.html`.

### React Compiler

The project uses the React Compiler (via `@rolldown/plugin-babel` + `babel-plugin-react-compiler` in `vite.config.ts`). This means manual memoization (`useMemo`, `useCallback`, `memo`) is generally unnecessary — the compiler handles it automatically.

### TypeScript Config

Two tsconfig files: `tsconfig.app.json` (source code) and `tsconfig.node.json` (build tooling like `vite.config.ts`). Both use `"moduleResolution": "bundler"`.

### ESLint

Uses ESLint v9 flat config. Extends `@eslint/js`, `typescript-eslint`, `react-hooks`, and `react-refresh` recommended rules.
