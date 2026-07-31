// engines/canvas-engine/index.js
// Canvas engine entry: high-level 2D/visual canvas renderer.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

export function createCanvas(meta = {}) {
  const id = `canvas-${Date.now()}`;
  eventBus.emit('canvas:created', { id, meta });
  return { id, meta };
}

export function draw(id, payload = {}) {
  eventBus.emit('canvas:draw', { id, payload });
  return { ok: true };
}

export const Renderer = RendererObj;

export default { createCanvas, draw, Renderer };
export { Renderer as renderer };
