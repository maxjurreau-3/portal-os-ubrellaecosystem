// engines/operators/renderer.js
// Operators renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.operators',
  label: 'Operators',
  icon: '⚙️',
  render(ctx = {}) {
    const html = `
      <div class="engine-operators">
        <h3>Operators</h3>
        <p>Cross-engine operations & console.</p>
        <button data-action="op-invoke">Invoke Operator</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="op-invoke"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.operators:invokeRequested', { op: 'diagnostic' });
          eventBus.emit('notification:show', { title: 'Operators', message: 'Operator invoked' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
