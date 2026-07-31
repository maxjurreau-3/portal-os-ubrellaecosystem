// publishing/lanes/index.js
// Lane-specific publishing helpers.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function publishToLane(laneName, job) {
  eventBus.emit('publishing:lane:publish', { laneName, job });
  return { laneName, jobId: job.id, ok: true };
}

export default { publishToLane };
