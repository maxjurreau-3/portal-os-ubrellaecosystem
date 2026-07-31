# RUNTIME.md

## Runtime Phases

Phase 1 — Runtime Spine
Implement all files in src/runtime/:

EventBus
UnifiedSurface
Renderers
Shell
WindowManager
Dock
Notifications
CommandPalette
Styles

Once Phase 1 is complete, Portal‑OS boots and can host engines.

Phase 2 — Engine Integration
Register all engine renderers in renderers.jsx.

Add dock entries for each engine.

Add window mappings in WindowManager.

Add engine‑specific notifications.

Add engine commands to CommandPalette.

Phase 3 — Substrate Binding
Wrap substrate APIs in substrate-engine.

Expose substrate operations via engines and commands.

Surface substrate events via Notifications.

At the end of these phases, Portal‑OS v3 is a fully functional, multi‑engine, substrate‑backed operating system.
