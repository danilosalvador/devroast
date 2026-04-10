# DevRoast - Global Standards

## Project Overview
DevRoast is a code roasting platform built during NLW Operator. It allows users to paste code and get roasted with varying degrees of sarcasm.

## Design System
- **Theme**: Built with Tailwind CSS v4 using CSS variables in `index.css`.
- **Colors**: Deep dark palette (`bg-page: #050505`, `bg-surface: #0a0a0a`).
- **Typography**: `font-primary` (JetBrains Mono) and `font-secondary` (IBM Plex Mono).

## Component Standards
- **Composition Pattern**: Large components must be broken into `.Root`, `.Header`, `.Content`, etc., using React Context for internal state.
- **Styling**: Use `tailwind-variants` (TV) for all component slots and variants.
- **Exports**: Strictly named exports. No default exports allowed.
- **Linting**: Biome is the source of truth for formatting and linting.

## Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Base UI (Headless primitives)
- Shiki (Syntax highlighting with Vesper theme)
- Biome (Lint/Format)
