// engines/operators/index.js
// Operators engine entry.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

export function invoke(name, opts = {}) {
  eventBus.emit('operators:invoke', { name, opts });
  return { ok: true, name };
}

export function log(msg) {
  eventBus.emit('operators:log', { message: msg });
}

export const Renderer = RendererObj;

export default { invoke, log, Renderer };
export { Renderer as renderer };
