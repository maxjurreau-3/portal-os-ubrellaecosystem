// portal-apps/premium/premium-app.js
// Premium portal app sample with runtime hooks.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function enablePremiumFeatures(userId) {
  eventBus.emit('portalapp:premium:enabled', { userId });
  return { ok: true, userId };
}

export default { enablePremiumFeatures };
