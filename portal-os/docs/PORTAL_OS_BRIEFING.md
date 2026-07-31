# PORTAL_OS_BRIEFING.md

## Overview

Portal‑OS v3 is the runtime shell of the Umbrella Ecosystem.  
It is a multi‑engine operating system that hosts:

- SIM Engine  
- XR Engine  
- Identity‑Physics Engine  
- Operators Engine  
- Games Engine  
- Substrate Engine (deep physics layer)

Portal‑OS is not “just a React app”—it is the orchestration layer that:

- boots the runtime spine  
- manages windows, dock, notifications, and commands  
- routes events between engines and substrate  
- exposes a unified surface for rendering engine output  

---

## Goals

- **Multi‑engine runtime:** Treat each engine (SIM, XR, Identity, Operators, Games, Substrate) as a first‑class OS engine.
- **Event‑driven architecture:** Use a shared EventBus for all OS‑level and engine‑level events.
- **Unified rendering surface:** Provide a single, stable surface where engines render their UI or visual output.
- **Composable engines:** Allow engines to be launched, closed, and combined via windows and commands.
- **Substrate‑backed behavior:** Bind engine behavior to the deep substrate layer (coherence, awareness, unified field, quantum suite).

---

## Core Concepts

- **Runtime Spine:** The set of files under `src/runtime/` that make Portal‑OS an operating system:
  - `event-bus.js`
  - `renderers.jsx`
  - `unified-surface.jsx`
  - `shell.jsx`
  - `window-manager.jsx`
  - `dock.jsx`
  - `notifications.jsx`
  - `command-palette.jsx`
  - `styles.css`

- **Engines:** Modules under `src/modules/` that implement domain‑specific behavior:
  - `sim/`
  - `xr/`
  - `identity-physics/`
  - `operators/`
  - `games/`
  - `substrate-engine/`

- **Substrate:** The deep engine layer under `substrate/` that provides:
  - coherence fields
  - awareness streams
  - unified field protocols
  - quantum identity/auth/signing/verification

---

## Runtime Lifecycle

1. **Boot:** Portal‑OS mounts `Shell` and initializes the EventBus.
2. **Discover engines:** `renderers.jsx` registers all engine renderers.
3. **User interaction:**
   - Dock launches engines.
   - WindowManager opens engine windows.
   - UnifiedSurface renders engine output.
   - CommandPalette runs OS and engine commands.
   - Notifications surface engine and OS events.
4. **Substrate integration:** Engines call into substrate and emit events reflecting deep physics operations.

---

## Position in Umbrella Ecosystem

Portal‑OS sits inside the `umbrella-ecosystem/portal-os/` folder and acts as:

- the **interactive front‑end** of the ecosystem  
- the **runtime host** for all engines  
- the **bridge** between user interaction and substrate physics  

Everything else in the Umbrella Ecosystem (domains, lanes, world‑models, publishing, quantum suite, meta‑architect) ultimately flows through or is surfaced by Portal‑OS.
