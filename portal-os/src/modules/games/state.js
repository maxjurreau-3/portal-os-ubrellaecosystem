// portal-os/src/modules/games/state.js
// In-memory game state helper.

const games = new Map();

export function createGameRecord(meta = {}) {
  const id = `g-${Date.now()}`;
  const rec = { id, meta, createdAt: Date.now(), players: [] };
  games.set(id, rec);
  return rec;
}

export function getGame(id) {
  return games.get(id) || null;
}

export function addPlayer(gameId, player) {
  const g = games.get(gameId);
  if (!g) return null;
  g.players.push(player);
  return player;
}

export default { createGameRecord, getGame, addPlayer };
