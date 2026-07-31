// portal-os/src/modules/sim/helpers.js
// Helper utilities specific to the SIM engine.

import { now } from '../shared/utils.js';
import { eventBus } from '../../runtime/event-bus.js';

export function makeSpaceName(base = 'Space') {
  return `${base}-${now()}`;
}

export function emitSimEvent(name, payload = {}) {
  eventBus.emit(`sim:${name}`, payload);
}

export default { makeSpaceName, emitSimEvent };
