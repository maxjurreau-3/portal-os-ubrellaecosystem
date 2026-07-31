// engines/substrate-engine/renderer.js
// Substrate engine renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.substrate',
  label: 'Substrate Engine',
  icon: '🔬',
  render(ctx = {}) {
    const html = `
      <div class="engine-substrate">
        <h3>Substrate Engine</h3>
        <p>Engine-level substrate controls.</p>
        <button data-action="substrate-run">Run Coherence</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="substrate-run"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.substrate:runRequested', {});
          eventBus.emit('notification:show', { title: 'Substrate', message: 'Run requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
