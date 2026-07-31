// portal-os/src/modules/games/index.js
// Games engine module: game worlds and operations.

import { eventBus } from '../../runtime/event-bus.js';

export function createGame(meta = {}) {
  const id = `game-${Date.now()}`;
  eventBus.emit('games:created', { id, meta });
  return { id, meta };
}

export function startGame(id) {
  eventBus.emit('games:started', { id });
  return true;
}

export const Renderer = {
  id: 'games',
  label: 'Games',
  icon: '🎮',
  render(ctx) {
    const html = `
      <div class="games-engine">
        <h3>Games</h3>
        <p>Game worlds and state.</p>
        <button data-action="new-game">New Game</button>
      </div>`;
    if (ctx && ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="new-game"]');
        if (btn) btn.onclick = () => {
          const g = createGame({ title: 'Untitled' });
          eventBus.emit('notification:show', { title: 'Games', message: `Game ${g.id} created` });
        };
      }, 10);
    }
    return html;
  }
};

export default { createGame, startGame, Renderer };
export { Renderer as renderer };
