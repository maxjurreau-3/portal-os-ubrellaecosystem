// world-models/xr-world/model.js
// XR world model definitions: scene graph and interaction primitives.

import { substrateEventBus } from '../substrate/event-bus.js';

export function createXRScene(meta = {}) {
  const id = `xrscene-${Date.now()}`;
  const scene = { id, nodes: [], meta, createdAt: Date.now() };
  substrateEventBus.emit('worldmodel:xr:created', { id, meta });
  return scene;
}

export function addNode(scene, node) {
  node.id = node.id || `node-${Date.now()}`;
  scene.nodes.push(node);
  substrateEventBus.emit('worldmodel:xr:nodeAdded', { sceneId: scene.id, node });
  return node;
}

export default { createXRScene, addNode };
