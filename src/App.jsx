import { useState } from "react";
import "./os.css";

export default function App() {
  const [showWindow, setShowWindow] = useState(true);

  return (
    <div className="os-root">

      {/* Top Bar */}
      <div className="os-topbar">
        <div className="os-title">Portal‑OS v3</div>
        <div className="os-status">Umbrella Ecosystem • Running</div>
      </div>

      {/* Desktop */}
      <div className="os-desktop">
        {showWindow && (
          <div className="os-window">
            <div className="os-window-header">
              <span>Starter Module</span>
              <button onClick={() => setShowWindow(false)}>✕</button>
            </div>

            <div className="os-window-body">
              <h2>Welcome to Portal‑OS v3</h2>
              <p>Your OS shell is running successfully.</p>
              <p>Cloudflare deployment is confirmed.</p>
              <p>React runtime is active.</p>
            </div>
          </div>
        )}
      </div>

      {/* Dock */}
      <div className="os-dock">
        <button onClick={() => setShowWindow(true)}>Starter App</button>
      </div>
    </div>
  );
}
