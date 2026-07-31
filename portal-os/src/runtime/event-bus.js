// portal-os/src/runtime/event-bus.js
// Lightweight EventBus designed for Portal‑OS multi-engine runtime.
// Exports both EventBus class and a shared default instance.

export class EventBus {
  constructor() {
    this._listeners = new Map(); // event -> Set of handlers
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

  once(event, handler) {
    const wrapper = (...args) => {
      handler(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  emit(event, payload = {}) {
    const handlers = this._listeners.get(event);
    if (!handlers) return;
    // Copy to array to allow handlers to modify listeners safely
    for (const h of Array.from(handlers)) {
      try {
        h(payload);
      } catch (err) {
        // swallow but surface an error event
        const errorPayload = { event, payload, error: err };
        const errHandlers = this._listeners.get('eventbus:error');
        if (errHandlers) for (const eh of Array.from(errHandlers)) eh(errorPayload);
      }
    }
  }

  listeners(event) {
    return this._listeners.has(event) ? Array.from(this._listeners.get(event)) : [];
  }
}

export const eventBus = new EventBus();
export default eventBus;
