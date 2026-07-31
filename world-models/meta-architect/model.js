// world-models/meta-architect/model.js
// Meta-architect world model: contains architectural meta-data used across the ecosystem.

import { substrateEventBus } from '../substrate/event-bus.js';

export function registerPattern(name, spec = {}) {
  const p = { id: `pattern-${name}-${Date.now()}`, name, spec, registeredAt: Date.now() };
  substrateEventBus.emit('worldmodel:meta:patternRegistered', p);
  return p;
}

export function lookupPattern(name) {
  substrateEventBus.emit('worldmodel:meta:patternLookup', { name });
  return { name, found: Boolean(name) };
}

export default { registerPattern, lookupPattern };
