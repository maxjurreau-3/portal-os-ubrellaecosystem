// world-models/operator-logic/model.js
// Canonical operator logic model used by SIM and Operators engines.

import { substrateEventBus } from '../substrate/event-bus.js';

export function defineOperator(name, spec = {}) {
  const op = { id: `op-${name}-${Date.now()}`, name, spec, createdAt: Date.now() };
  substrateEventBus.emit('worldmodel:operator:defined', op);
  return op;
}

export function invokeOperator(op, input = {}) {
  substrateEventBus.emit('worldmodel:operator:invoked', { op, input });
  // simplistic outcome
  const outcome = { opId: op.id || op.name, ok: true, output: { echo: input } };
  substrateEventBus.emit('worldmodel:operator:completed', outcome);
  return outcome;
}

export default { defineOperator, invokeOperator };
