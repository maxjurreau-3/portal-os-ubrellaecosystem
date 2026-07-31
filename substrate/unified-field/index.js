// substrate/unified-field/index.js
// Unified Field protocol invocations and helpers.

import { substrateEventBus } from '../event-bus.js';
import { applyProtocol } from './field-protocols.js';

export function invokeProtocol(protocolName, payload = {}) {
  const res = applyProtocol(protocolName, payload);
  substrateEventBus.emit('unified-field:invoked', { protocolName, res });
  return res;
}

export const Renderer = {
  id: 'unified-field',
  label: 'Unified Field',
  icon: '🔗',
  render() {
    return `<div><h4>Unified Field</h4><p>Invoke cross-engine field protocols.</p></div>`;
  }
};

export default { invokeProtocol, Renderer };
export { Renderer as renderer };
