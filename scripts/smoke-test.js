// scripts/smoke-test.js
// Simple smoke script that starts the substrate bridge and exercises the portal-os substrate facade.
// Run with: node --input-type=module scripts/smoke-test.js
//
// This script assumes a Node environment that can import the local ES modules.

import './substrate-bridge.js'; // start the bridge wiring
import * as substrateFacade from '../portal-os/src/modules/substrate-engine/index.js';
import { eventBus } from '../portal-os/src/runtime/event-bus.js';

async function run() {
  console.log('Smoke test: Running substrate runCoherence via portal facade...');
  try {
    const res = await substrateFacade.runCoherence({ scope: 'smoke-test', intensity: 2 });
    console.log('runCoherence result:', res);
  } catch (err) {
    console.error('runCoherence failed:', err);
  }

  console.log('Smoke test: Generating awareness stream...');
  try {
    const stream = await substrateFacade.generateAwareness({ focus: 'smoke' });
    console.log('generateAwareness result:', stream);
  } catch (err) {
    console.error('generateAwareness failed:', err);
  }

  // Listen to forwarded substrate events
  eventBus.on('substrate:coherence:field:complete', (payload) => {
    console.log('Received forwarded substrate event coherence:field:complete', payload);
  });

  // Trigger a direct substrate call via bridge (simulate)
  console.log('Smoke test complete.');
}

run().catch((e) => console.error(e));
