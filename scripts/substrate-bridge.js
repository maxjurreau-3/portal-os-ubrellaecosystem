// scripts/substrate-bridge.js
// Bridge that listens to Portal-OS eventBus requests and invokes repo-level substrate APIs.
// Also forwards selected substrate events into Portal-OS eventBus.
//
// Run this script alongside a Portal-OS runtime in environments where both the
// portal and substrate modules are loadable (e.g. local dev via Node).

import { eventBus as portalEventBus } from '../portal-os/src/runtime/event-bus.js';
import { substrateEventBus } from '../substrate/event-bus.js';

import * as coherence from '../substrate/coherence-engine/index.js';
import * as awareness from '../substrate/awareness-generator/index.js';
import * as unifiedField from '../substrate/unified-field/index.js';
import * as quantum from '../substrate/quantum-suite/index.js';

// Map actions to handlers
const handlers = {
  async runCoherence(opts) {
    // call the repo-level API and return its result
    return coherence.runCoherence(opts);
  },
  async generateAwareness(opts) {
    return awareness.generateAwareness(opts);
  },
  async invokeUnifiedFieldProtocol(opts) {
    return unifiedField.invokeProtocol(opts.protocolName || 'default', opts.payload || {});
  },
  async verifyQuantumIdentity(opts) {
    return quantum.verifyIdentity(opts.payload || {});
  }
};

// Forward selected substrate events into Portal EventBus
const substrateToPortalEvents = [
  'coherence:field:complete',
  'coherence:field:start',
  'awareness:stream:ready',
  'unified-field:protocol:complete',
  'quantum:identity:verified',
  'quantum:auth:issued'
];

for (const name of substrateToPortalEvents) {
  substrateEventBus.on(name, (p) => {
    try {
      portalEventBus.emit(`substrate:${name}`, p);
    } catch (err) {
      // ensure bridge does not crash
      console.error('bridge:forward-error', name, err);
    }
  });
}

// Listen for Portal invoke requests
portalEventBus.on('engine.substrate:invoke', async ({ action, opts, requestId }) => {
  const responseEvent = `engine.substrate:response:${requestId}`;
  try {
    const handler = handlers[action];
    if (!handler) throw new Error(`No substrate handler for action: ${action}`);
    const result = await handler(opts || {});
    portalEventBus.emit(responseEvent, { result });
  } catch (err) {
    portalEventBus.emit(responseEvent, { error: { message: err.message } });
  }
});

// Optional: log bridge activity to portal notifications
portalEventBus.on('engine.substrate:invoke', ({ action, requestId }) => {
  portalEventBus.emit('notification:show', { title: 'Substrate Bridge', message: `Invoked ${action} (${requestId})`, timeout: 2000 });
});

export default { handlers };
