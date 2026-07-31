// engines/identity-physics/index.js
// Identity-Physics engine entry.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

const identities = new Map();

export function createIdentity(profile = {}) {
  const id = `id-${Date.now()}`;
  const rec = { id, profile, createdAt: Date.now() };
  identities.set(id, rec);
  eventBus.emit('identity:created', rec);
  return rec;
}

export function transitionIdentity(id, transition) {
  const rec = identities.get(id);
  if (!rec) return null;
  rec.lastTransition = transition;
  eventBus.emit('identity:transition', { id, transition });
  return rec;
}

export function listIdentities() {
  return Array.from(identities.values());
}

export const Renderer = RendererObj;

export default { createIdentity, transitionIdentity, listIdentities, Renderer };
export { Renderer as renderer };
