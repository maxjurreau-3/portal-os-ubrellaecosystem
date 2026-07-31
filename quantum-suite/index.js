// quantum-suite/index.js
// Top-level quantum-suite aggregator that bridges substrate.quantum-suite and Portal-OS.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';
import * as auth from '../substrate/quantum-suite/quantum-auth/index.js';
import * as identity from '../substrate/quantum-suite/quantum-identity/index.js';
import * as signing from '../substrate/quantum-suite/quantum-signing/index.js';
import * as verification from '../substrate/quantum-suite/quantum-verification/index.js';

export function issueToken(subject) {
  const token = auth.issueToken(subject);
  eventBus.emit('quantum:tokenIssued', { subject, token });
  return token;
}

export function createIdentity(profile) {
  const rec = identity.createQuantumIdentity(profile);
  eventBus.emit('quantum:identityCreated', rec);
  return rec;
}

export function sign(payload) {
  const s = signing.sign(payload);
  eventBus.emit('quantum:signed', s);
  return s;
}

export function verify(payload) {
  const res = verification.verify(payload);
  eventBus.emit('quantum:verified', res);
  return res;
}

export default { issueToken, createIdentity, sign, verify };
