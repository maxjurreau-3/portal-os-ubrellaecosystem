// engines/xr/index.js
// XR engine entry: core API and renderer export.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

const scenes = new Map();

export function init(opts = {}) {
  eventBus.emit('engine:xr:init', { opts });
  return { ok: true };
}

export function createScene(meta = {}) {
  const id = `xr-${Date.now()}`;
  const scene = { id, meta, createdAt: Date.now() };
  scenes.set(id, scene);
  eventBus.emit('xr:sceneCreated', { scene });
  return scene;
}

export function activateScene(id) {
  const s = scenes.get(id);
  if (!s) return null;
  s.active = true;
  eventBus.emit('xr:sceneActivated', { id });
  return s;
}

export function listScenes() {
  return Array.from(scenes.values());
}

export const Renderer = RendererObj;

export default { init, createScene, activateScene, listScenes, Renderer };
export { Renderer as renderer };
