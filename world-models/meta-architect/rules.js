// world-models/meta-architect/rules.js
// Rules and invariants for architectural changes and migrations.

import { substrateEventBus } from '../substrate/event-bus.js';

export function checkMigrationSafe(currentSpec, nextSpec) {
  // very naive: require same majorVersion
  const safe = (currentSpec?.major === nextSpec?.major);
  substrateEventBus.emit('worldmodel:meta:migrationCheck', { safe, currentSpec, nextSpec });
  return safe;
}

export function applyMigration(spec) {
  substrateEventBus.emit('worldmodel:meta:migrationApplied', { spec });
  return { appliedAt: Date.now() };
}

export default { checkMigrationSafe, applyMigration };
