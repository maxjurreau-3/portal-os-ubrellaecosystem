// engines/world-models/index.js
// World-Models engine entry: provides access to canonical world-models and rules.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

const models = new Map();

export function registerModel(name, model) {
  models.set(name, model);
  eventBus.emit('world-models:registered', { name });
  return true;
}

export function getModel(name) {
  return models.get(name) || null;
}

export function listModels() {
  return Array.from(models.keys());
}

export const Renderer = RendererObj;

export default { registerModel, getModel, listModels, Renderer };
export { Renderer as renderer };
