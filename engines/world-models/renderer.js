// engines/world-models/renderer.js
// World-Models renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.world-models',
  label: 'World Models',
  icon: '🌐',
  render(ctx = {}) {
    const html = `
      <div class="engine-world-models">
        <h3>World Models</h3>
        <p>Canon and physics models registry.</p>
        <button data-action="wm-register">Register Model</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="wm-register"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.world-models:registerRequested', { source: 'ui' });
          eventBus.emit('notification:show', { title: 'World Models', message: 'Register requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
