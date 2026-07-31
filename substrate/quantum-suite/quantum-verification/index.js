// substrate/quantum-suite/quantum-verification/index.js
// High-level verification functions composed from signing/auth subsystems.

import { substrateEventBus } from '../../event-bus.js';
import { verifySignature } from '../quantum-signing/index.js';
import { verifyToken } from '../quantum-auth/index.js';

export function verify(payload = {}) {
  // For stubbing: accept payload with { token, signature }
  const tokenCheck = payload.token ? verifyToken(payload.token) : { valid: false };
  const sigCheck = payload.signature ? verifySignature(payload.signature, payload) : { ok: false };
  const ok = tokenCheck.valid && sigCheck.ok;
  const result = { ok, tokenCheck, sigCheck, checkedAt: Date.now() };
  substrateEventBus.emit('quantum:verification:result', result);
  return result;
}

export default { verify };
