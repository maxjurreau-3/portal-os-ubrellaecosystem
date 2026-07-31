// portal-os/src/runtime/command-palette.jsx
// Lightweight command registry and runner. Engines and the OS can register commands.

import { eventBus } from './event-bus.js';

const commands = new Map(); // id -> { id, label, run }

export default function CommandPalette(container) {
  if (!container) throw new Error('CommandPalette requires a container element');

  function registerCommand(cmd) {
    if (!cmd || !cmd.id || typeof cmd.run !== 'function') {
      throw new Error('Command must have id and run()');
    }
    commands.set(cmd.id, cmd);
    eventBus.emit('command:registered', { id: cmd.id });
  }

  function runCommand(id, args = {}) {
    const cmd = commands.get(id);
    if (!cmd) {
      eventBus.emit('command:notFound', { id });
      return null;
    }
    try {
      const result = cmd.run(args, { eventBus });
      eventBus.emit('command:run', { id, args });
      return result;
    } catch (err) {
      eventBus.emit('command:error', { id, error: err });
      throw err;
    }
  }

  // Expose registration to EventBus so engines can register commands dynamically
  eventBus.on('command:register', ({ command }) => registerCommand(command));

  // UI omitted — container could host a popup list; for now keep headless
  return {
    registerCommand,
    runCommand,
    listCommands: () => Array.from(commands.values())
  };
}
