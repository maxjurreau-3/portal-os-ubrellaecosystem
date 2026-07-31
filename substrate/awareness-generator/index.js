// substrate/awareness-generator/index.js
// Public API for awareness streams generator.

import { substrateEventBus } from '../event-bus.js';
import { createStream } from './awareness-stream.js';

export function generateAwareness(opts = {}) {
  const stream = createStream(opts);
  substrateEventBus.emit('awareness:generated', { streamId: stream.id });
  return stream;
}

export const Renderer = {
  id: 'awareness-generator',
  label: 'Awareness Generator',
  icon: '👁️',
  render() {
    return `<div><h4>Awareness Generator</h4><p>Generate awareness streams.</p></div>`;
  }
};

export default { generateAwareness, Renderer };
export { Renderer as renderer };
