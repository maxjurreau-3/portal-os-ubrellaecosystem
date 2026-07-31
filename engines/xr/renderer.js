// engines/xr/renderer.js
// XR engine renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.xr',
  label: 'XR Engine',
  icon: '🕶️',
  render(ctx = {}) {
    const html = `
      <div class="engine-xr">
        <h3>XR Engine</h3>
        <p>XR scenes and interactions.</p>
        <button data-action="xr-create">Create Scene</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="xr-create"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.xr:createSceneRequested', { source: 'ui' });
          eventBus.emit('notification:show', { title: 'XR', message: 'Scene create requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
