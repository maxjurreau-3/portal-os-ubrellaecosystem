// substrate/quantum-suite/index.js
// Aggregator for quantum subsystems: auth, identity, signing, verification.

import { substrateEventBus } from '../event-bus.js';
import * as auth from './quantum-auth/index.js';
import * as identity from './quantum-identity/index.js';
import * as signing from './quantum-signing/index.js';
import * as verification from './quantum-verification/index.js';

export function verifyIdentity(payload) {
  // delegate to verification module
  const res = verification.verify(payload);
  substrateEventBus.emit('quantum:identity:verified', { payload, res });
  return res;
}

export function signPayload(payload) {
  const sig = signing.sign(payload);
  substrateEventBus.emit('quantum:payload:signed', { payload, sig });
  return sig;
}

export function issueAuthToken(subject) {
  const token = auth.issueToken(subject);
  substrateEventBus.emit('quantum:auth:issued', { subject, token });
  return token;
}

export const Renderer = {
  id: 'quantum-suite',
  label: 'Quantum Suite',
  icon: '⚛️',
  render() {
    return `<div><h4>Quantum Suite</h4><p>Auth, identity, signing and verification.</p></div>`;
  }
};

export default {
  verifyIdentity,
  signPayload,
  issueAuthToken,
  Renderer
};
export { Renderer as renderer };
