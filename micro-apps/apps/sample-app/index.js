// micro-apps/apps/sample-app/index.js
// Example micro-app entry point.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export function activate(opts = {}) {
  eventBus.emit('microapp:sample:activated', { opts, at: Date.now() });
  return { ok: true };
}

export function getManifest() {
  return {
    id: 'sample-app',
    name: 'Sample Micro-App',
    version: '0.1.0',
    entry: 'index.js'
  };
}

export default { activate, getManifest };
