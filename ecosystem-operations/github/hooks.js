// ecosystem-operations/github/hooks.js
// GitHub operations helper: simple webhook and CI trigger helpers.

import { eventBus } from '../portal-os/src/runtime/event-bus.js';

export function createWebhook(repo, url) {
  const id = `hook-${Date.now()}`;
  eventBus.emit('ops:github:webhookCreated', { id, repo, url });
  return { id, repo, url };
}

export function triggerWorkflow(repo, workflowId) {
  eventBus.emit('ops:github:workflowTriggered', { repo, workflowId });
  return { ok: true };
}

export default { createWebhook, triggerWorkflow };
