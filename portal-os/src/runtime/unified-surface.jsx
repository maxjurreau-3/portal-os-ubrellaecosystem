// portal-os/src/runtime/unified-surface.jsx
// UnifiedSurface is the single OS surface where engine renderers draw their output.
// Engines provide a renderer with render(ctx) => HTML string (or lightweight DOM fragment).
// UnifiedSurface mounts engine rendering into container slots and routes events.

import { eventBus } from './event-bus.js';
import { getRenderer } from './renderers.jsx';

export default function UnifiedSurface(container) {
  // container: a DOM element where the surface will render.
  if (!container) throw new Error('UnifiedSurface requires a container element');

  const windows = new Map(); // windowId -> { engineId, el }

  function createWindow(windowId, engineId, opts = {}) {
    const renderer = getRenderer(engineId);
    const winEl = document.createElement('div');
    winEl.className = 'portal-window';
    winEl.dataset.windowId = windowId;
    winEl.dataset.engineId = engineId;

    const header = document.createElement('div');
    header.className = 'portal-window-header';
    header.textContent = `${renderer?.label || engineId}`;
    winEl.appendChild(header);

    const body = document.createElement('div');
    body.className = 'portal-window-body';
    winEl.appendChild(body);

    container.appendChild(winEl);
    windows.set(windowId, { engineId, el: winEl, body });

    eventBus.emit('surface:windowCreated', { windowId, engineId, el: winEl });

    // initial render
    renderWindow(windowId);

    return winEl;
  }

  function closeWindow(windowId) {
    const state = windows.get(windowId);
    if (!state) return false;
    state.el.remove();
    windows.delete(windowId);
    eventBus.emit('surface:windowClosed', { windowId, engineId: state.engineId });
    return true;
  }

  function renderWindow(windowId) {
    const state = windows.get(windowId);
    if (!state) return;
    const { engineId, body } = state;
    const renderer = getRenderer(engineId);
    if (!renderer) {
      body.innerHTML = `<div class="renderer-missing">Renderer ${engineId} not found</div>`;
      return;
    }
    try {
      const html = renderer.render({ eventBus, windowId, container: body });
      if (typeof html === 'string') {
        body.innerHTML = html;
      } else if (html instanceof HTMLElement) {
        body.innerHTML = '';
        body.appendChild(html);
      } else {
        body.innerHTML = `<pre>${JSON.stringify(html)}</pre>`;
      }
      eventBus.emit('surface:windowRendered', { windowId, engineId });
    } catch (err) {
      body.innerHTML = `<div class="renderer-error">Render error: ${err.message}</div>`;
      eventBus.emit('surface:renderError', { windowId, engineId, error: err });
    }
  }

  // Listen to shell/window events
  eventBus.on('shell:openWindow', ({ windowId, engineId }) => createWindow(windowId, engineId));
  eventBus.on('shell:closeWindow', ({ windowId }) => closeWindow(windowId));
  eventBus.on('surface:reRenderWindow', ({ windowId }) => renderWindow(windowId));

  return {
    createWindow,
    closeWindow,
    renderWindow,
    listWindows: () => Array.from(windows.keys())
  };
}
