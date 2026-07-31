// ecosystem-operations/cloudflare/config.js
// Cloudflare deployment helper stub.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function deploySite(zone, assets = {}) {
  const id = `cf-deploy-${Date.now()}`;
  eventBus.emit('ops:cloudflare:deploy', { id, zone, assets });
  return { id, zone, ok: true };
}

export default { deploySite };
