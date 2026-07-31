// publishing/distribution/index.js
// Distribution adapters: simple stubs for distribution targets.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function distributeToCDN(job, options = {}) {
  eventBus.emit('publishing:distribution:cdn', { job, options });
  return { ok: true, distributedAt: Date.now() };
}

export function distributeToMarketplace(job, options = {}) {
  eventBus.emit('publishing:distribution:marketplace', { job, options });
  return { ok: true };
}

export default { distributeToCDN, distributeToMarketplace };
