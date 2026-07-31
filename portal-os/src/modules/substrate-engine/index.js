// portal-os/src/modules/substrate-engine/index.js
// Wrapper around the repository-level substrate/ APIs.
// Provides simplified functions and a renderer that surfaces substrate events.

import { eventBus } from '../../runtime/event-bus.js';

// Thin wrappers that emit substrate events; actual heavy-lifting lives in umbrella-ecosystem/substrate.
export function runCoherenceField(opts = {}) {
  eventBus.emit('substrate:coherenceRun', { opts });
  return { ok: true, runId: `coherence-${Date.now()}` };
}

export function generateAwarenessStream(opts = {}) {
  eventBus.emit('substrate:awarenessGenerated', { opts });
  return { ok: true, streamId: `awareness-${Date.now()}` };
}

export function invokeUnifiedFieldProtocol(opts = {}) {
  eventBus.emit('substrate:fieldInvoked', { opts });
  return { ok: true, protocolId: `field-${Date.now()}` };
}

export function verifyQuantumIdentity(payload = {}) {
  eventBus.emit('substrate:identityVerified', { payload });
  return { ok: true, verified: true };
}

export const Renderer = {
  id: 'substrate',
  label: 'Substrate',
  icon: '🔬',
  render(ctx) {
    const html = `
      <div class="substrate-engine">
        <h3>Substrate</h3>
        <p>Deep substrate controls and events.</p>
        <button data-action="run-coherence">Run Coherence</button>
      </div>`;
    if (ctx && ctx.container && ctx.container instanceof HTMLElement) {
      setTimeout(() => {
        const btn = ctx.container.querySelector('[data-action="run-coherence"]');
        if (btn) btn.onclick = () => {
          runCoherenceField({});
          eventBus.emit('notification:show', { title: 'Substrate', message: 'Coherence run started' });
        };
      }, 10);
    }
    return html;
  }
};

export default {
  runCoherenceField,
  generateAwarenessStream,
  invokeUnifiedFieldProtocol,
  verifyQuantumIdentity,
  Renderer
};
export { Renderer as renderer };
