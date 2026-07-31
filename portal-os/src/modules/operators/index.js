// portal-os/src/modules/operators/index.js
// Operators engine: cross-engine operations and substrate console.

import { eventBus } from '../../runtime/event-bus.js';

export function invokeOperator(name, opts = {}) {
  eventBus.emit('operators:invoke', { name, opts });
  return { name, invoked: true };
}

export function consoleLog(message) {
  eventBus.emit('operators:log', { message });
}

export const Renderer = {
  id: 'operators',
  label: 'Operators',
  icon: '⚙️',
  render(ctx) {
    const html = `
      <div class="operators-engine">
        <h3>Operators</h3>
        <p>Run cross-engine operations and substrate commands.</p>
        <button data-action="invoke-op">Invoke Operator</button>
      </div>`;
    if (ctx && ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="invoke-op"]');
        if (btn) btn.onclick = () => {
          invokeOperator('health-check', {});
          eventBus.emit('notification:show', { title: 'Operators', message: 'Health-check invoked' });
        };
      }, 10);
    }
    return html;
  }
};

export default { invokeOperator, consoleLog, Renderer };
export { Renderer as renderer };
