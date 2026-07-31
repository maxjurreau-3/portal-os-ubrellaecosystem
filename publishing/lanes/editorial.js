// publishing/lanes/editorial.js
// Editorial lane helpers for publishing.

import { createJob, runJob } from '../engine/index.js';
import { publishToLane } from '../lanes/index.js';

export function createEditorialPublish(payload = {}) {
  const job = createJob(payload);
  publishToLane('editorial', job);
  runJob(job);
  return job;
}

export default { createEditorialPublish };
