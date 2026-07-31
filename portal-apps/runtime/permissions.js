// portal-apps/runtime/permissions.js
// Permissions management for portal apps.

const perms = new Map();

export function grant(appId, permission) {
  const set = perms.get(appId) || new Set();
  set.add(permission);
  perms.set(appId, set);
  return true;
}

export function check(appId, permission) {
  const set = perms.get(appId);
  return set ? set.has(permission) : false;
}

export default { grant, check };
