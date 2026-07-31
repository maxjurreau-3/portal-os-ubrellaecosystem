// portal-os/src/runtime/dock.jsx
// Simple dock that lists registered renderers and dispatches shell:launchEngine events.

import { listRenderers } from './renderers.jsx';
import { eventBus } from './event-bus.js';

export default function Dock(container) {
  if (!container) throw new Error('Dock requires a container element');

  function render() {
    container.innerHTML = '';
    const list = listRenderers();
    const ul = document.createElement('div');
    ul.className = 'dock-list';
    for (const r of list) {
      const item = document.createElement('button');
      item.className = 'dock-item';
      item.title = r.label || r.id;
      item.innerHTML = `<span class="dock-icon">${r.icon || '🧩'}</span><span class="dock-label">${r.label || r.id}</span>`;
      item.onclick = () => eventBus.emit('shell:launchEngine', { engineId: r.id });
      ul.appendChild(item);
    }
    container.appendChild(ul);
  }

  // re-render on renderer registry change
  eventBus.on('renderers:registered', render);
  eventBus.on('renderers:unregistered', render);

  // initial render
  render();

  return {
    render
  };
}
