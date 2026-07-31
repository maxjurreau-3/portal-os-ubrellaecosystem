// engines/games/index.js
// Games engine entry.

import { eventBus } from '../../portal-os/src/runtime/event-bus.js';
import { Renderer as RendererObj } from './renderer.js';

const games = new Map();

export function createGame(meta = {}) {
  const id = `game-${Date.now()}`;
  const g = { id, meta, createdAt: Date.now() };
  games.set(id, g);
  eventBus.emit('games:created', { game: g });
  return g;
}

export function startGame(id) {
  const g = games.get(id);
  if (!g) return null;
  g.running = true;
  eventBus.emit('games:started', { id });
  return g;
}

export function listGames() {
  return Array.from(games.values());
}

export const Renderer = RendererObj;

export default { createGame, startGame, listGames, Renderer };
export { Renderer as renderer };
