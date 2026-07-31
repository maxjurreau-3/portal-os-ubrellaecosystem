// portal-os/src/modules/xr/helpers.js
// XR helper utilities.

import { eventBus } from '../../runtime/event-bus.js';

export function normalizeSceneMeta(meta = {}) {
  return { env: meta.env || 'default', quality: meta.quality || 'medium', ...meta };
}

export function emitXREvent(name, payload = {}) {
  eventBus.emit(`xr:${name}`, payload);
}

export default { normalizeSceneMeta, emitXREvent };
