// engines/sim/index.js
// SIM engine entry: core API and renderer export.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

const instances = new Map();

export function init(opts = {}) {
  eventBus.emit('engine:sim:init', { opts });
  return { ok: true };
}

export function createInstance(meta = {}) {
  const id = `sim-${Date.now()}`;
  const instance = { id, meta, createdAt: Date.now() };
  instances.set(id, instance);
  eventBus.emit('sim:instanceCreated', { instance });
  return instance;
}

export function activateInstance(id) {
  const inst = instances.get(id);
  if (!inst) return null;
  inst.active = true;
  eventBus.emit('sim:instanceActivated', { id });
  return inst;
}

export function listInstances() {
  return Array.from(instances.values());
}

export const Renderer = RendererObj;

export default {
  init,
  createInstance,
  activateInstance,
  listInstances,
  Renderer
};
export { Renderer as renderer };
