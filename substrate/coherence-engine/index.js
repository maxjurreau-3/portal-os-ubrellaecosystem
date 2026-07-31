// substrate/coherence-engine/index.js
// Public API for the coherence engine: wraps coherence field and operators.

import { substrateEventBus } from '../event-bus.js';
import { runField } from './coherence-field.js';
import { scheduleOperator } from './coherence-operators.js';

export function runCoherence(opts = {}) {
  const result = runField(opts);
  substrateEventBus.emit('coherence:ran', { result });
  return result;
}

export function runOperator(operatorName, opts = {}) {
  const res = scheduleOperator(operatorName, opts);
  substrateEventBus.emit('coherence:operatorScheduled', { operatorName, res });
  return res;
}

export const Renderer = {
  id: 'coherence-engine',
  label: 'Coherence Engine',
  icon: '🧭',
  render() {
    return `<div><h4>Coherence Engine</h4><p>Run coherence fields and operators.</p></div>`;
  }
};

export default {
  runCoherence,
  runOperator,
  Renderer
};
export { Renderer as renderer };
