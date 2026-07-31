// engines/games/renderer.js
// Games renderer module.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';

export const Renderer = {
  id: 'engine.games',
  label: 'Games',
  icon: '🎮',
  render(ctx = {}) {
    const html = `
      <div class="engine-games">
        <h3>Games</h3>
        <p>Game worlds & runtime.</p>
        <button data-action="game-new">New Game</button>
      </div>
    `;
    if (ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="game-new"]');
        if (btn) btn.onclick = () => {
          eventBus.emit('engine.games:createRequested', {});
          eventBus.emit('notification:show', { title: 'Games', message: 'New game requested' });
        };
      }, 10);
    }
    return html;
  }
};

export default Renderer;
