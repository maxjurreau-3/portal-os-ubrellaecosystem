// micro-apps/apps/app-two/index.js
// Another example micro-app.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export function activate(opts = {}) {
  eventBus.emit('microapp:app-two:activate', { opts });
  return { ok: true, id: 'app-two' };
}

export function getManifest() {
  return { id: 'app-two', name: 'Second App', version: '0.1.0' };
}

export default { activate, getManifest };
