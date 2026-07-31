// portal-apps/premium/feature-flags.js
// Simple feature flag helper for premium apps.

const flags = new Map();

export function enableFlag(name) {
  flags.set(name, true);
  return true;
}

export function disableFlag(name) {
  flags.delete(name);
  return true;
}

export function isEnabled(name) {
  return flags.has(name);
}

export default { enableFlag, disableFlag, isEnabled };
