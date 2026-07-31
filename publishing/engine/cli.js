// publishing/engine/cli.js
// Lightweight CLI helper to run publishing jobs in dev.

import { createJob, runJob } from './index.js';

export function runPublishFromCLI({ templateId, content, target }) {
  const job = createJob({ templateId, content, target });
  runJob(job);
  return job;
}

export default { runPublishFromCLI };
