// engines/substrate-engine/index.js
// Substrate engine entry (engine-level facade to repository substrate layer).

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

// These functions act as shims that call into the repo-level substrate modules
// (under /substrate) — the heavy-lifting there emits substrate-level events.
export function runCoherence(opts = {}) {
  // Relay to substrate layer via event and return an optimistic response.
  eventBus.emit('engine.substrate:runCoherence', { opts });
  return { ok: true, runId: `engine-coherence-${Date.now()}` };
}

export function generateAwareness(opts = {}) {
  eventBus.emit('engine.substrate:generateAwareness', { opts });
  return { ok: true, streamId: `engine-awareness-${Date.now()}` };
}

export const Renderer = RendererObj;

export default { runCoherence, generateAwareness, Renderer };
export { Renderer as renderer };
