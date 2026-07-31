// portal-apps/runtime/loader.js
// Dynamic loader for portal apps into Portal-OS runtime.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export async function loadApp(manifest) {
  eventBus.emit('portalapp:loading', { manifest });
  // in real runtime we'd fetch manifest.entry; here we simulate
  await new Promise((r) => setTimeout(r, 10));
  eventBus.emit('portalapp:loaded', { manifest });
  return { loaded: true, manifest };
}

export default { loadApp };
