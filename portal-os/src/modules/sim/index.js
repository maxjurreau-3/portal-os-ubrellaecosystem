// portal-os/src/modules/sim/index.js
// SIM engine module: exposes core API and Renderer object.

import { eventBus } from '../../runtime/event-bus.js';

export function createSpace(meta = {}) {
  const id = `sim-space-${Date.now()}`;
  eventBus.emit('sim:spaceCreated', { id, meta });
  return { id, meta };
}

export function activateSpace(id) {
  eventBus.emit('sim:spaceActivated', { id });
  return true;
}

export function runOperator(operatorId, opts = {}) {
  eventBus.emit('sim:operatorRun', { operatorId, opts });
  return { operatorId, ok: true };
}

export const Renderer = {
  id: 'sim',
  label: 'SIM Engine',
  icon: '🧪',
  render(ctx) {
    // minimal HTML UI for SIM
    const html = `
      <div class="sim-engine">
        <h3>SIM Engine</h3>
        <p>Use the dock to create or activate simulation spaces.</p>
        <button data-action="create-space">Create Space</button>
      </div>
    `;
    // Attach simple event delegation to container if provided
    if (ctx && ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="create-space"]');
        if (btn) btn.onclick = () => {
          const space = createSpace({ name: 'New Space' });
          eventBus.emit('notification:show', { title: 'SIM', message: `Space ${space.id} created` });
          ctx.container.dispatchEvent(new CustomEvent('sim:spaceCreated', { detail: space }));
        }
      }, 10);
    }
    return html;
  }
};

export default {
  createSpace,
  activateSpace,
  runOperator,
  Renderer
};
export { Renderer as renderer };
