// publishing/lanes/automation.js
// Automation helpers that create publish jobs from events.

import { createJob, runJob } from '../engine/index.js';

export function autoPublishFromWebhook(data = {}) {
  const job = createJob({ templateId: 'basic', content: data, target: 'cdn' });
  runJob(job);
  return job;
}

export default { autoPublishFromWebhook };
