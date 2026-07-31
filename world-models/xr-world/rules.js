// world-models/xr-world/rules.js
// XR-specific rules: interaction affordances, coordinate transforms.

import { substrateEventBus } from '../substrate/event-bus.js';

export function transformNode(node, transform) {
  node.transform = { ...(node.transform || {}), ...transform };
  substrateEventBus.emit('worldmodel:xr:nodeTransformed', { nodeId: node.id, transform });
  return node;
}

export function canInteract(user, node) {
  const ok = !!node && !node.disabled;
  substrateEventBus.emit('worldmodel:xr:canInteract', { userId: user?.id, nodeId: node?.id, ok });
  return ok;
}

export default { transformNode, canInteract };
