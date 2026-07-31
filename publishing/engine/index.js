// publishing/engine/index.js
// Publishing engine: orchestrates template rendering and distribution.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function createJob({ templateId, content, target } = {}) {
  const id = `publish-${Date.now()}`;
  const job = { id, templateId, content, target, status: 'created', createdAt: Date.now() };
  eventBus.emit('publishing:jobCreated', job);
  return job;
}

export function runJob(job) {
  job.status = 'running';
  eventBus.emit('publishing:jobStarted', { id: job.id });
  // simulate processing
  setTimeout(() => {
    job.status = 'completed';
    eventBus.emit('publishing:jobCompleted', { id: job.id });
  }, 50);
  return job;
}

export default { createJob, runJob };
