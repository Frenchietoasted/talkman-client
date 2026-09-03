import React, { useState } from "react";

/**
 * Talkman — lobby screen
 * A pairing screen for a voice-first pair-programming tool: pick your editor,
 * pick day/night, then create or join a room by code.
 *
 * Self-contained: styles are scoped under .talkman-lobby, no Tailwind or
 * external CSS required. Drop this file into any React + TypeScript project.
 */

type Mode = "light" | "dark";
type Editor = "vscode" | "eclipse" | "intellij";
type RoomAction = "create" | "join";

const EDITORS: { id: Editor; label: string }[] = [
  { id: "vscode", label: "VS Code" },
  { id: "eclipse", label: "Eclipse" },
  { id: "intellij", label: "IntelliJ" },
];

function EditorIcon({ id }: { id: Editor }) {
  if (id === "vscode") {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <rect x="3" y="3" width="12" height="12" fill="#f25a5a" />
        <rect x="17" y="3" width="12" height="12" fill="#3bd671" />
        <rect x="3" y="17" width="12" height="12" fill="#3b7bf2" />
        <rect x="17" y="17" width="12" height="12" fill="#f2c53b" />
      </svg>
    );
  }
  if (id === "eclipse") {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <circle cx="16" cy="16" r="13" fill="none" stroke="#5b4fc4" strokeWidth="3" />
        <circle cx="16" cy="16" r="13" fill="none" stroke="#5b4fc4" strokeWidth="3"
          strokeDasharray="46 100" transform="rotate(-90 16 16)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="4" fill="#000" />
      <path d="M9 9h4v14H9zM17 9h6v3h-6zM17 14h6v3h-6zM17 19h6v3h-6z" fill="#8bd44d" />
    </svg>
  );
}

export default function TalkmanLobby() {
  const [mode, setMode] = useState<Mode>("dark");
  const [editor, setEditor] = useState<Editor>("vscode");
  const [action, setAction] = useState<RoomAction>("create");
  const [roomCode, setRoomCode] = useState("");

  const isDark = mode === "dark";

  return (
    <div className={`talkman-lobby ${isDark ? "is-dark" : "is-light"}`}>
      <style>{`
        .talkman-lobby {
          --bg: #0c2036;
          --bg-soft: #14304e;
          --panel: #17385a;
          --panel-line: rgba(255,255,255,0.08);
          --text: #eef4fb;
          --text-dim: #9db2c9;
          --accent: #ffb648;
          --accent-ink: #3a2400;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          background: radial-gradient(120% 90% at 50% -10%, #163a5e 0%, var(--bg) 55%, #081527 100%);
          font-family: "Space Grotesk", "Segoe UI", system-ui, -apple-system, sans-serif;
          color: var(--text);
          transition: background 0.4s ease;
          box-sizing: border-box;
        }
        .talkman-lobby.is-light {
          --bg: #eef3f9;
          --bg-soft: #ffffff;
          --panel: #ffffff;
          --panel-line: rgba(15,35,60,0.08);
          --text: #10263f;
          --text-dim: #5c7690;
          --accent: #ff9d2e;
          --accent-ink: #2a1600;
          background: radial-gradient(120% 90% at 50% -10%, #ffffff 0%, var(--bg) 60%, #dbe6f2 100%);
        }
        .talkman-lobby * { box-sizing: border-box; }

        .tl-card {
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        .tl-wordmark {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: -6px;
        }
        .tl-wordmark span:first-child {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .tl-wordmark span:last-child {
          font-size: 12px;
          color: var(--text-dim);
          font-family: "JetBrains Mono", ui-monospace, monospace;
        }

        .tl-section-label {
          font-size: 13px;
          color: var(--text-dim);
          text-align: center;
          margin-bottom: -14px;
        }

        /* mode toggle */
        .tl-mode {
          display: flex;
          background: var(--panel);
          border: 1px solid var(--panel-line);
          border-radius: 999px;
          padding: 5px;
          gap: 4px;
        }
        .tl-mode button {
          width: 52px;
          height: 40px;
          border-radius: 999px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .tl-mode button.active {
          background: var(--accent);
          transform: scale(1.04);
        }
        .tl-mode button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* editor picker */
        .tl-editors {
          display: flex;
          background: var(--panel);
          border: 1px solid var(--panel-line);
          border-radius: 999px;
          padding: 5px;
          gap: 4px;
        }
        .tl-editors button {
          width: 44px;
          height: 40px;
          border-radius: 999px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: transparent;
          position: relative;
          transition: background 0.2s ease;
        }
        .tl-editors button.active {
          background: var(--bg-soft);
          box-shadow: 0 0 0 1.5px var(--accent) inset;
        }
        .tl-editors button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .tl-panel {
          width: 100%;
          background: var(--panel);
          border: 1px solid var(--panel-line);
          border-radius: 22px;
          padding: 22px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tl-panel-title {
          font-size: 18px;
          font-weight: 600;
          text-align: center;
        }
        .tl-panel-title .tl-blank {
          display: inline-block;
          width: 46px;
          border-bottom: 2px solid var(--accent);
          margin-right: 6px;
        }

        .tl-toggle {
          display: flex;
          border-radius: 12px;
          background: var(--bg-soft);
          border: 1px solid var(--panel-line);
          padding: 4px;
        }
        .tl-toggle button {
          flex: 1;
          padding: 10px 0;
          border: none;
          border-radius: 9px;
          background: transparent;
          color: var(--text-dim);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .tl-toggle button.active {
          background: var(--accent);
          color: var(--accent-ink);
        }

        .tl-code-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--panel-line);
          background: var(--bg-soft);
          color: var(--text);
          padding: 13px 14px;
          font-size: 15px;
          letter-spacing: 0.12em;
          font-family: "JetBrains Mono", ui-monospace, monospace;
          text-transform: uppercase;
        }
        .tl-code-input::placeholder {
          font-family: "Space Grotesk", sans-serif;
          letter-spacing: normal;
          text-transform: none;
          color: var(--text-dim);
        }
        .tl-code-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .tl-go {
          width: 100%;
          padding: 13px 0;
          border-radius: 12px;
          border: none;
          background: var(--accent);
          color: var(--accent-ink);
          font-weight: 700;
          font-size: 15px;
          cursor: pointer;
          transition: filter 0.15s ease;
        }
        .tl-go:hover { filter: brightness(1.05); }
        .tl-go:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .tl-hint {
          font-size: 12px;
          color: var(--text-dim);
          text-align: center;
        }
      `}</style>

      <div className="tl-card">
        <div className="tl-wordmark">
          <span>talkman</span>
          <span>// pair by voice</span>
        </div>

        <div className="tl-section-label">Mode?</div>
        <div className="tl-mode" role="radiogroup" aria-label="Color mode">
          <button
            className={mode === "light" ? "active" : ""}
            role="radio"
            aria-checked={mode === "light"}
            onClick={() => setMode("light")}
            title="Light mode"
          >
            ☀️
          </button>
          <button
            className={mode === "dark" ? "active" : ""}
            role="radio"
            aria-checked={mode === "dark"}
            onClick={() => setMode("dark")}
            title="Dark mode"
          >
            🌙
          </button>
        </div>

        <div className="tl-editors" role="radiogroup" aria-label="Editor">
          {EDITORS.map((e) => (
            <button
              key={e.id}
              className={editor === e.id ? "active" : ""}
              role="radio"
              aria-checked={editor === e.id}
              onClick={() => setEditor(e.id)}
              title={e.label}
            >
              <EditorIcon id={e.id} />
            </button>
          ))}
        </div>

        <div className="tl-panel">
          <div className="tl-panel-title">
            <span className="tl-blank" /> a room
          </div>

          <div className="tl-toggle">
            <button
              className={action === "create" ? "active" : ""}
              onClick={() => setAction("create")}
            >
              Create
            </button>
            <button
              className={action === "join" ? "active" : ""}
              onClick={() => setAction("join")}
            >
              Join
            </button>
          </div>

          {action === "join" ? (
            <input
              className="tl-code-input"
              placeholder="Room code"
              value={roomCode}
              maxLength={8}
              onChange={(e) => setRoomCode(e.target.value)}
            />
          ) : (
            <div className="tl-code-input" style={{ color: "var(--text-dim)" }}>
              A code will be generated
            </div>
          )}

          <button
            className="tl-go"
            disabled={action === "join" && roomCode.trim().length === 0}
          >
            {action === "create" ? "Create room" : "Join room"}
          </button>

          <div className="tl-hint">
            {editor === "vscode" && "Opens the Talkman panel in VS Code once connected."}
            {editor === "eclipse" && "Opens the Talkman view in Eclipse once connected."}
            {editor === "intellij" && "Opens the Talkman tool window in IntelliJ once connected."}
          </div>
        </div>
      </div>
    </div>
  );
}
