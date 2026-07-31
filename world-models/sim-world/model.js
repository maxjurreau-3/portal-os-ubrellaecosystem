// world-models/sim-world/model.js
// Simulation world model: canonical space and entity definitions.

import { substrateEventBus } from '../substrate/event-bus.js';

export function createSimWorld(meta = {}) {
  const id = `simworld-${Date.now()}`;
  const world = { id, meta, entities: [], createdAt: Date.now() };
  substrateEventBus.emit('worldmodel:sim:created', { id, meta });
  return world;
}

export function addEntity(world, entity) {
  entity.id = entity.id || `ent-${Date.now()}`;
  world.entities.push(entity);
  substrateEventBus.emit('worldmodel:sim:entityAdded', { worldId: world.id, entity });
  return entity;
}

export default { createSimWorld, addEntity };
