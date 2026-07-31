// world-models/identity-physics/model.js
// Canonical identity-physics world model: data shape and basic operations.

import { substrateEventBus } from '../substrate/event-bus.js';

export function createIdentityModel(profile = {}) {
  const id = `wm-identity-${Date.now()}`;
  const model = { id, profile, createdAt: Date.now() };
  substrateEventBus.emit('worldmodel:identity:created', model);
  return model;
}

export function summarize(model) {
  return { id: model.id, name: model.profile?.name || 'unknown', createdAt: model.createdAt };
}

export default { createIdentityModel, summarize };
