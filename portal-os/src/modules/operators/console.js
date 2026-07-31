// portal-os/src/modules/operators/console.js
// Operators console helper that collects logs and exposes a simple API.

const logs = [];

export function log(message, meta = {}) {
  const entry = { id: `log-${Date.now()}`, message, meta, ts: Date.now() };
  logs.push(entry);
  return entry;
}

export function listLogs() {
  return logs.slice(-200);
}

export default { log, listLogs };
