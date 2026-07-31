// micro-apps/store/curation.js
// Simple curation utilities for the micro-app store.

import { registerApp } from './index.js';
import sample from '../apps/sample-app/index.js';

export function curateSample() {
  const m = sample.getManifest();
  registerApp(m);
  return m;
}

export default { curateSample };
