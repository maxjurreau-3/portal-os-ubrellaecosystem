// portal-os/src/modules/xr/index.js
// XR engine module: core API and Renderer.

import { eventBus } from '../../runtime/event-bus.js';

export function createScene(meta = {}) {
  const id = `xr-scene-${Date.now()}`;
  eventBus.emit('xr:sceneCreated', { id, meta });
  return { id, meta };
}

export function activateScene(id) {
  eventBus.emit('xr:sceneActivated', { id });
  return true;
}

export const Renderer = {
  id: 'xr',
  label: 'XR Engine',
  icon: '🕶️',
  render(ctx) {
    const html = `
      <div class="xr-engine">
        <h3>XR Engine</h3>
        <p>XR scene container.</p>
        <button data-action="create-scene">Create Scene</button>
      </div>`;
    if (ctx && ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="create-scene"]');
        if (btn) btn.onclick = () => {
          const s = createScene({ env: 'default' });
          eventBus.emit('notification:show', { title: 'XR', message: `Scene ${s.id} created` });
          ctx.container.dispatchEvent(new CustomEvent('xr:sceneCreated', { detail: s }));
        };
      }, 10);
    }
    return html;
  }
};

export default { createScene, activateScene, Renderer };
export { Renderer as renderer };
