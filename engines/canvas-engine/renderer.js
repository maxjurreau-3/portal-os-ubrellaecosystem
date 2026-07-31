// engines/canvas-engine/renderer.js
// Canvas engine renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.canvas',
  label: 'Canvas Engine',
  icon: '🖼️',
  render(ctx = {}) {
    const html = `
      <div class="engine-canvas">
        <h3>Canvas Engine</h3>
        <p>2D visual canvas and renderer surface.</p>
        <button data-action="canvas-new">New Canvas</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="canvas-new"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.canvas:createRequested', {});
          eventBus.emit('notification:show', { title: 'Canvas', message: 'New canvas requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
