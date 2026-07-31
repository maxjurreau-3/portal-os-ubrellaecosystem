// portal-os/src/runtime/renderers.jsx
// Registry of engine renderers. Engines register a renderer object:
// { id, label, icon, render(ctx) }
// We export registration helpers and a default registry object.

import { eventBus } from './event-bus.js';

const registry = new Map();

export function registerRenderer(renderer) {
  if (!renderer || !renderer.id) throw new Error('Renderer must have an id');
  registry.set(renderer.id, renderer);
  eventBus.emit('renderers:registered', { id: renderer.id, renderer });
  return renderer;
}

export function unregisterRenderer(id) {
  const exists = registry.delete(id);
  if (exists) eventBus.emit('renderers:unregistered', { id });
  return exists;
}

export function getRenderer(id) {
  return registry.get(id) || null;
}

export function listRenderers() {
  return Array.from(registry.values());
}

// Convenience: pre-register known local module renderers statically.
// Engines should also call registerRenderer themselves when loaded.
// NOTE: Keep imports static to help bundlers; if you change engine set, update these imports.

import simModule from '../modules/sim/index.js';
import xrModule from '../modules/xr/index.js';
import identityPhysicsModule from '../modules/identity-physics/index.js';
import operatorsModule from '../modules/operators/index.js';
import gamesModule from '../modules/games/index.js';
import substrateModule from '../modules/substrate-engine/index.js';

const preloaded = [
  simModule && simModule.Renderer,
  xrModule && xrModule.Renderer,
  identityPhysicsModule && identityPhysicsModule.Renderer,
  operatorsModule && operatorsModule.Renderer,
  gamesModule && gamesModule.Renderer,
  substrateModule && substrateModule.Renderer
].filter(Boolean);

for (const r of preloaded) registerRenderer(r);

const defaultExport = {
  registerRenderer,
  unregisterRenderer,
  getRenderer,
  listRenderers
};

export default defaultExport;
