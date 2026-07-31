// portal-os/src/modules/identity-physics/state.js
// Small identity state store for the identity-physics module.

const identities = new Map();

export function addIdentity(idObj) {
  identities.set(idObj.id, idObj);
  return idObj;
}

export function getIdentity(id) {
  return identities.get(id) || null;
}

export function listIdentities() {
  return Array.from(identities.values());
}

export default { addIdentity, getIdentity, listIdentities };
