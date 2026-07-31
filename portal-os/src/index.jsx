// portal-os/src/index.jsx
// Public exports for the Portal‑OS library.
// Export shell factory and runtime primitives.

export { default as Shell } from './runtime/shell.jsx';
export { default as UnifiedSurface } from './runtime/unified-surface.jsx';
export { eventBus } from './runtime/event-bus.js';
export * from './modules/sim/index.js';
export * from './modules/xr/index.js';
export * from './modules/identity-physics/index.js';
export * from './modules/operators/index.js';
export * from './modules/games/index.js';
export * from './modules/substrate-engine/index.js';
