// world-models/quantum-world/rules.js
// Rules for attaching quantum tokens and verifying lineage expectations.

import { substrateEventBus } from '../substrate/event-bus.js';

export function attachToken(record, token) {
  record.token = token;
  substrateEventBus.emit('worldmodel:quantum:tokenAttached', { id: record.id, token });
  return record;
}

export function verifyLineage(record) {
  const ok = !!record && !!record.profile;
  substrateEventBus.emit('worldmodel:quantum:lineageChecked', { id: record.id, ok });
  return { ok, id: record.id };
}

export default { attachToken, verifyLineage };
