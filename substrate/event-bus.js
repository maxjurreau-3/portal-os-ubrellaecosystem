// substrate/event-bus.js
// Lightweight EventBus for substrate layer internal events.
// Portal-OS's substrate-engine wrapper is expected to call these APIs and
// re-emit or translate events into the OS EventBus.

export class SubstrateEventBus {
  constructor() {
    this._listeners = new Map();
  }

  on(event, handler) {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event).add(handler);
    return () => this.off(event, handler);
  }

  off(event, handler) {
    if (!this._listeners.has(event)) return;
    this._listeners.get(event).delete(handler);
    if (this._listeners.get(event).size === 0) this._listeners.delete(event);
  }

  emit(event, payload = {}) {
    const handlers = this._listeners.get(event);
    if (!handlers) return;
    for (const h of Array.from(handlers)) {
      try {
        h(payload);
      } catch (err) {
        // swallow to avoid substrate crash loops
        console.error('substrate:event-handler-error', { event, err });
      }
    }
  }

  listeners(event) {
    return this._listeners.has(event) ? Array.from(this._listeners.get(event)) : [];
  }
}

export const substrateEventBus = new SubstrateEventBus();
export default substrateEventBus;
