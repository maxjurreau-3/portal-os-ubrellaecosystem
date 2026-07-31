# MODULES.md

## Overview

This document describes the engine modules and shared modules that make up Portal‑OS v3.

All modules live under:

portal-os/src/modules/

## Module layout

Each engine is a self-contained folder with at least:
- index.js — public API and exports
- renderer.js (optional) — renderer helper if needed (we prefer the `Renderer` exported from index.js)
- other helpers, e.g., state.js, api.js

Shared utilities live in `src/modules/shared/`.

## Engines

- sim — simulation spaces and operators
- xr — XR scenes and interactions
- identity-physics — identity state machine and physics
- operators — cross‑engine operations & console
- games — game worlds & lifecycle
- substrate-engine — thin wrapper around umbrella-ecosystem/substrate

## Conventions

- Use ES modules (import / export).
- Each engine must export a `Renderer` object:
  { id, label, icon, render(ctx) }
- Export both named and default exports:
  export const Renderer = {...}
  export default { ... , Renderer }
- Engines should emit lifecycle events via EventBus.

## Registration

Renderers are registered in src/runtime/renderers.jsx (static pre-load plus runtime registration).
Dock items are generated from renderers list and WindowManager maps engines to windows.
