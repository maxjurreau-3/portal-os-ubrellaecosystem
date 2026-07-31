// micro-apps/store/index.js
// Simple micro-app store manifest helper.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

const apps = new Map();

export function registerApp(manifest) {
  const id = manifest.id || `microapp-${Date.now()}`;
  apps.set(id, { id, ...manifest, registeredAt: Date.now() });
  eventBus.emit('microapp:registered', { id, manifest });
  return id;
}

export function listApps() {
  return Array.from(apps.values());
}

export default { registerApp, listApps };
