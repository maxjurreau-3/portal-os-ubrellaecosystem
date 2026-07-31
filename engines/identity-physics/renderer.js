// engines/identity-physics/renderer.js
// Identity Physics renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.identity-physics',
  label: 'Identity Physics',
  icon: '🧬',
  render(ctx = {}) {
    const html = `
      <div class="engine-identity">
        <h3>Identity Physics</h3>
        <p>Manage identity states & transitions.</p>
        <button data-action="id-create">Create Identity</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="id-create"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.identity:createRequested', {});
          eventBus.emit('notification:show', { title: 'Identity', message: 'Identity creation requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
