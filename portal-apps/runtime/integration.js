// portal-apps/runtime/integration.js
// Runtime helpers to integrate portal-apps into Portal-OS shell.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export function registerPortalApp(manifest) {
  eventBus.emit('portalapp:register', { manifest });
  return { ok: true, id: manifest.id || `portalapp-${Date.now()}` };
}

export default { registerPortalApp };
