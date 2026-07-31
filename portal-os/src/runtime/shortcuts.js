// portal-os/src/runtime/shortcuts.js
// Small keyboard shortcut utilities for Portal-OS runtime.

import { eventBus } from './event-bus.js';

export function installShortcut(keyCombo, handler) {
  function onKey(e) {
    const combo = [];
    if (e.ctrlKey) combo.push('Ctrl');
    if (e.metaKey) combo.push('Meta');
    if (e.altKey) combo.push('Alt');
    if (e.shiftKey) combo.push('Shift');
    combo.push(e.key);
    if (combo.join('+') === keyCombo) handler(e);
  }
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}

export function registerDefaultShortcuts() {
  installShortcut('Ctrl+k', () => eventBus.emit('command:openPalette'));
}

export default { installShortcut, registerDefaultShortcuts };
