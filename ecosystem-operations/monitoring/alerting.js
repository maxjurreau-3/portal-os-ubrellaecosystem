// ecosystem-operations/monitoring/alerting.js
// Monitoring alerting helper.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function raiseAlert(level, message) {
  const id = `alert-${Date.now()}`;
  eventBus.emit('ops:monitoring:alertRaised', { id, level, message });
  return { id, level, message };
}

export default { raiseAlert };
