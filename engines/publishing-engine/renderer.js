// engines/publishing-engine/renderer.js
// Publishing engine renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.publishing',
  label: 'Publishing Engine',
  icon: '📦',
  render(ctx = {}) {
    const html = `
      <div class="engine-publishing">
        <h3>Publishing Engine</h3>
        <p>Template-driven publication pipelines.</p>
        <button data-action="publish-create">Create Job</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="publish-create"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.publishing:createJobRequested', {});
          eventBus.emit('notification:show', { title: 'Publishing', message: 'Publish job requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
