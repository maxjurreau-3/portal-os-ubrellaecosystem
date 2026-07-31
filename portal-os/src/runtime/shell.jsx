// portal-os/src/runtime/shell.jsx
// Top-level OS shell: composes dock, window manager, unified surface, notifications, command palette.

import UnifiedSurface from './unified-surface.jsx';
import { eventBus } from './event-bus.js';
import Renderers from './renderers.jsx';
import WindowManager from './window-manager.jsx';
import Dock from './dock.jsx';
import Notifications from './notifications.jsx';
import CommandPalette from './command-palette.jsx';

export default function Shell(rootEl) {
  if (!rootEl) throw new Error('Shell requires a root DOM element');

  // layout
  const dockEl = document.createElement('div');
  dockEl.className = 'portal-dock';
  rootEl.appendChild(dockEl);

  const notifEl = document.createElement('div');
  notifEl.className = 'portal-notifications';
  rootEl.appendChild(notifEl);

  const surfaceEl = document.createElement('div');
  surfaceEl.className = 'portal-surface';
  rootEl.appendChild(surfaceEl);

  const commandEl = document.createElement('div');
  commandEl.className = 'portal-command-palette';
  rootEl.appendChild(commandEl);

  // initialize subsystems
  const unifiedSurface = UnifiedSurface(surfaceEl);
  const windowManager = WindowManager(rootEl, unifiedSurface);
  const dock = Dock(dockEl);
  const notifications = Notifications(notifEl);
  const commandPalette = CommandPalette(commandEl);

  // Boot sequence
  eventBus.emit('shell:booting', { time: Date.now() });
  // register preloaded renderers (already done by renderers.jsx import side-effect)
  eventBus.emit('shell:booted', { time: Date.now() });

  // simple API
  return {
    rootEl,
    unifiedSurface,
    windowManager,
    dock,
    notifications,
    commandPalette,
    destroy() {
      // TODO: teardown listeners
      eventBus.emit('shell:shutdown', { time: Date.now() });
    }
  };
}
