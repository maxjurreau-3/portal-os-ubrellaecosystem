// substrate/awareness-generator/awareness-stream.js
// Creates a simple awareness stream object (pull-based snapshot + events).

import { substrateEventBus } from '../event-bus.js';

export function createStream({ focus = 'global', intensity = 1 } = {}) {
  const id = `awareness-${Date.now()}`;
  const snapshot = { id, focus, intensity, createdAt: Date.now() };

  // Emit initial ready event
  substrateEventBus.emit('awareness:stream:ready', { id, snapshot });

  // Provide a small API to push updates
  function push(update) {
    substrateEventBus.emit('awareness:stream:update', { id, update });
  }

  return {
    id,
    snapshot,
    push
  };
}

export default { createStream };
