// micro-apps/apps/app-three/index.js
// Third sample micro-app.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export function activate(opts = {}) {
  eventBus.emit('microapp:app-three:activate', { opts });
  return { ok: true, id: 'app-three' };
}

export function getManifest() {
  return { id: 'app-three', name: 'Third App', version: '0.1.0' };
}

export default { activate, getManifest };
