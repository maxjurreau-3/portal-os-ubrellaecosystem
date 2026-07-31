// portal-os/src/main.jsx
// Lightweight boot script expected to be used in the browser.
// Mounts the Shell into #portal-root.

import { Shell } from './index.jsx';

const root = document.getElementById('portal-root');
if (!root) {
  console.error('Portal root not found.');
} else {
  const shell = Shell(root);
  // Expose for debugging
  window.PortalOS = { shell };
}
