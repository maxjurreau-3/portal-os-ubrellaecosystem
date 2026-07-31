// portal-os/src/modules/shared/utils.js
// Small shared helpers for modules.

export function now() { return Date.now(); }

export function shortId(prefix = '') {
  return `${prefix}${Date.now().toString(36).slice(-6)}`;
}

export default { now, shortId };
