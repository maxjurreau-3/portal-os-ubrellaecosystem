// substrate/quantum-suite/quantum-signing/index.js
// Signing primitives (stubbed, not cryptographically secure).

import { substrateEventBus } from '../../event-bus.js';

export function sign(payload = {}) {
  const signature = `sig-${Math.random().toString(36).slice(2, 12)}-${Date.now()}`;
  substrateEventBus.emit('quantum:signing:created', { signature, payload });
  return { signature, payload };
}

export function verifySignature(signature, payload = {}) {
  // naive verification
  const ok = typeof signature === 'string' && signature.startsWith('sig-');
  substrateEventBus.emit('quantum:signing:verified', { signature, ok });
  return { signature, ok };
}

export default { sign, verifySignature };
