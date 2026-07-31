// engines/publishing-engine/index.js
// Publishing engine entry: templates, pipelines, distribution triggers.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

export function createPublishJob(meta = {}) {
  const id = `publish-${Date.now()}`;
  eventBus.emit('publishing:jobCreated', { id, meta });
  return { id, meta };
}

export function runPublishJob(id) {
  eventBus.emit('publishing:jobRun', { id });
  return { ok: true };
}

export const Renderer = RendererObj;

export default { createPublishJob, runPublishJob, Renderer };
export { Renderer as renderer };
