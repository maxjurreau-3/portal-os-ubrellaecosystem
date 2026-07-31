// engines/sim/renderer.js
// SIM engine renderer module — exports a Renderer object and default.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.sim',
  label: 'SIM Engine',
  icon: '🧪',
  render(ctx = {}) {
    const html = `
      <div class="engine-sim">
        <h3>SIM Engine</h3>
        <p>Sim spaces & operators.</p>
        <button data-action="sim-create">Create Space</button>
        <button data-action="sim-list">List Spaces</button>
      </div>
    `;
    // attach delegation
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const createBtn = ctx.container.querySelector('[data-action="sim-create"]');
        if (createBtn) createBtn.onclick = () => {
          eventBus.emit('engine.sim:createRequested', { source: 'ui' });
          eventBus.emit('shell:launchEngine', { engineId: 'engine.sim' }); // example
          eventBus.emit('notification:show', { title: 'SIM', message: 'Create requested' });
        };
        const listBtn = ctx.container.querySelector('[data-action="sim-list"]');
        if (listBtn) listBtn.onclick = () => eventBus.emit('engine.sim:listRequested', {});
      }, 10);
    }
    return html;
  }
};

export default Renderer;
