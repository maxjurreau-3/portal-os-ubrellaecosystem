// portal-os/src/runtime/notifications.jsx
// Subscribes to EventBus and shows transient notifications.

import { eventBus } from './event-bus.js';

export default function Notifications(container) {
  if (!container) throw new Error('Notifications requires a container element');
  container.innerHTML = '';

  function showNotification({ title, message, timeout = 5000, level = 'info' }) {
    const el = document.createElement('div');
    el.className = `notification notification-${level}`;
    el.innerHTML = `<strong>${escapeHtml(title || level)}</strong><div class="message">${escapeHtml(message || '')}</div>`;
    container.appendChild(el);
    setTimeout(() => el.remove(), timeout);
  }

  function escapeHtml(s = '') {
    return String(s).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  }

  // subscribe to common engine events
  eventBus.on('shell:booted', () => showNotification({ title: 'Portal‑OS', message: 'Boot complete', timeout: 2500 }));
  eventBus.on('renderers:registered', ({ id }) => showNotification({ title: 'Renderer registered', message: id, timeout: 1700 }));
  eventBus.on('notification:show', (payload) => showNotification(payload));

  return { showNotification };
}
