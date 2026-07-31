// world-models/identity-physics/rules.js
// Rules for identity state transitions in the world-model.

import { substrateEventBus } from '../substrate/event-bus.js';

export function canTransition(currentState, transition) {
  // simple rule: allow any transition if not locked
  const ok = !(currentState && currentState.locked);
  substrateEventBus.emit('worldmodel:identity:ruleCheck', { currentState, transition, ok });
  return ok;
}

export function applyTransition(model, transition) {
  if (!canTransition(model.state, transition)) throw new Error('Transition not allowed');
  model.state = transition;
  substrateEventBus.emit('worldmodel:identity:transitionApplied', { id: model.id, transition });
  return model;
}

export default { canTransition, applyTransition };
