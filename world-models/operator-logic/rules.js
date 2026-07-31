// world-models/operator-logic/rules.js
// Rules that constrain operator inputs and scheduling.

import { substrateEventBus } from '../substrate/event-bus.js';

export function validateInput(opSpec, input) {
  // naive validation: check required keys
  const required = opSpec?.required || [];
  const missing = required.filter(k => !(k in input));
  const ok = missing.length === 0;
  substrateEventBus.emit('worldmodel:operator:validate', { opSpec, input, ok, missing });
  return { ok, missing };
}

export function schedule(op, ctx = {}) {
  substrateEventBus.emit('worldmodel:operator:schedule', { op, ctx });
  return { scheduledAt: Date.now(), opId: op.id || op.name };
}

export default { validateInput, schedule };
