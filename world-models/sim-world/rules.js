// world-models/sim-world/rules.js
// Rules for simulation steps, determinism, and operator interactions.

import { substrateEventBus } from '../substrate/event-bus.js';

export function simulateStep(world, delta = 16) {
  // simple step: tag lastStep
  world.lastStep = { at: Date.now(), delta };
  substrateEventBus.emit('worldmodel:sim:step', { worldId: world.id, delta });
  return world.lastStep;
}

export function isDeterministic(world) {
  // stub: return true if meta indicates determinism
  const det = !!world.meta?.deterministic;
  substrateEventBus.emit('worldmodel:sim:determinismCheck', { worldId: world.id, deterministic: det });
  return det;
}

export default { simulateStep, isDeterministic };
