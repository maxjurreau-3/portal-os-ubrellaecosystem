# ARCHITECTURE.md

## 1. High‑Level Architecture

Portal‑OS v3 is structured around three main layers:

1. **Runtime Spine (`src/runtime/`)**
2. **Engines (`src/modules/`)**
3. **Substrate Integration (`substrate/` via `substrate-engine/`)**

The OS is event‑driven, engine‑centric, and substrate‑backed.

---

## 2. Runtime Spine

### 2.1 Files

- `event-bus.js` — global event bus for OS and engines
- `renderers.jsx` — registry of engine renderers
- `unified-surface.jsx` — unified rendering surface
- `shell.jsx` — top‑level OS UI
- `window-manager.jsx` — window lifecycle and focus
- `dock.jsx` — engine launcher
- `notifications.jsx` — transient notification system
- `command-palette.jsx` — OS and engine command runner
- `styles.css` — layout and visual styling

### 2.2 Responsibilities

- **EventBus:** decouples producers (engines, shell) from consumers (windows, notifications, commands).
- **UnifiedSurface:** abstracts rendering so engines only provide a `render()` method.
- **Shell:** composes dock, windows, notifications, and command palette into a single UI.
- **WindowManager:** manages open windows, active window, and engine association.
- **Dock:** launches engines via `shell:launchEngine` events.
- **Notifications:** listens to engine events and surfaces them to the user.
- **CommandPalette:** indexes commands and runs them via engine APIs.

---

## 3. Engines Architecture

### 3.1 Engine Modules

Each engine lives under `src/modules/<engine>/index.js` and exposes:

- core API functions (create, list, activate, run, etc.)
- alias exports for convenience
- a `Renderer` object with:
  - `id`
  - `label`
  - `icon`
  - `render()` method returning HTML string

Engines:

- `sim/` — simulation spaces and operators
- `xr/` — XR scenes and interactions
- `identity-physics/` — identity state and transitions
- `operators/` — cross‑engine operations and substrate console
- `games/` — game worlds and state
- `substrate-engine/` — wrapper around deep substrate layer

### 3.2 Engine Lifecycle

1. Engine module initializes its internal state.
2. Engine registers events via `EventBus.emit(...)`.
3. Engine renderer is registered in `renderers.jsx`.
4. Dock launches engine windows via `shell:launchEngine`.
5. WindowManager opens windows and passes engine id to UnifiedSurface.
6. UnifiedSurface calls `renderer.render()` to display engine output.

---

## 4. Substrate Integration

### 4.1 Substrate Layer

Located under `substrate/`:

- `coherence-engine/`
- `awareness-generator/`
- `unified-field/`
- `quantum-suite/`

These provide:

- **Coherence:** consistency and stability across identities and states.
- **Awareness:** streams of attention and perception.
- **Unified Field:** cross‑engine state unification.
- **Quantum Suite:** authenticity, identity lineage, signing, verification.

### 4.2 Substrate Engine Module

`src/modules/substrate-engine/index.js` wraps substrate APIs and exposes:

- `runCoherenceField(...)`
- `generateAwarenessStream(...)`
- `invokeUnifiedFieldProtocol(...)`
- `verifyQuantumIdentity(...)`

It also defines `SubstrateRenderer` and emits events like:

- `substrate:coherenceRun`
- `substrate:awarenessGenerated`
- `substrate:fieldInvoked`
- `substrate:identityVerified`

---

## 5. Event Model

### 5.1 OS‑Level Events

- `shell:launchEngine` — request to open an engine window
- `shell:openWindow` / `shell:closeWindow` — window lifecycle
- `command:run` — command execution

### 5.2 Engine‑Level Events (examples)

- SIM:
  - `sim:spaceCreated`
  - `sim:spaceActivated`
  - `sim:operatorRun`
- XR:
  - `xr:sceneCreated`
  - `xr:sceneActivated`
  - `xr:interaction`
- Substrate:
  - `substrate:coherenceRun`
  - `substrate:awarenessGenerated`

Notifications and other runtime components subscribe to these events.

---

## 6. Extensibility

Portal‑OS v3 is designed to:

- add new engines by:
  - creating a module under `src/modules/`
  - defining a renderer
  - registering it in `renderers.jsx`
  - adding a dock item and window mapping
- extend substrate bindings by:
  - adding new substrate APIs
  - exposing them via `substrate-engine`
  - wiring them into engines and commands

This architecture keeps the runtime spine stable while allowing engines and substrate to evolve.
