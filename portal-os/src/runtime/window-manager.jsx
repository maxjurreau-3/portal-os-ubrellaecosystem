// portal-os/src/runtime/window-manager.jsx
// Manages window ids, focus, window lifecycle integration with UnifiedSurface.

import { eventBus } from './event-bus.js';
import { v4 as uuidv4 } from '../../vendor/uuid.js'; // lightweight bundled uuid helper

export default function WindowManager(rootEl, unifiedSurface) {
  const openWindows = new Map(); // windowId -> { engineId }

  function openWindowForEngine(engineId, opts = {}) {
    const windowId = uuidv4();
    openWindows.set(windowId, { engineId, opts });
    eventBus.emit('shell:openWindow', { windowId, engineId, opts });
    return windowId;
  }

  function closeWindow(windowId) {
    if (!openWindows.has(windowId)) return false;
    eventBus.emit('shell:closeWindow', { windowId });
    openWindows.delete(windowId);
    return true;
  }

  function listWindows() {
    return Array.from(openWindows.entries()).map(([id, meta]) => ({ id, ...meta }));
  }

  // react to shell:launchEngine requests
  eventBus.on('shell:launchEngine', ({ engineId, opts }) => {
    const id = openWindowForEngine(engineId, opts);
    eventBus.emit('shell:windowLaunched', { windowId: id, engineId, opts });
  });

  // focus management (simplified)
  let focusedWindow = null;
  eventBus.on('shell:focusWindow', ({ windowId }) => { focusedWindow = windowId; eventBus.emit('shell:focused', { windowId }); });

  return {
    openWindowForEngine,
    closeWindow,
    listWindows,
    getFocused: () => focusedWindow
  };
}
