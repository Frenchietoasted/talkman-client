"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";

/**
 * Talkman — lobby screen
 * A pairing screen for a voice-first pair-programming tool: pick your editor,
 * pick day/night, then create or join a room by code.
 *
 * Self-contained: styles are scoped under .talkman-lobby, no Tailwind or
 * external CSS required. Drop this file into any React + TypeScript project.
 */
type Mode = "light" | "dark";
type Editor = "vscode" | "eclipse" | "intellij" | "codeblocks";

const EDITORS: { id: Editor; label: string }[] = [
  { id: "vscode", label: "VS Code" },
  { id: "eclipse", label: "Eclipse" },
  { id: "intellij", label: "IntelliJ" },
  { id: "codeblocks", label: "Code::Blocks" },
];

function EditorIcon({ id }: { id: Editor }) {
  if (id === "vscode") {
    return (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        {/* Official Visual Studio Code Vector Logo */}
        <path
          d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"
          fill="#007ACC"
        />
      </svg>
    );
  }
  if (id === "eclipse") {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="#2c2255" />
        <circle cx="16" cy="16" r="12" fill="none" stroke="#5b4fc4" strokeWidth="2.5" />
        <path d="M8 16a8 8 0 0 0 16 0" stroke="#f8981d" strokeWidth="3" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#ffffff" />
      </svg>
    );
  }
  if (id === "intellij") {
    return (
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <rect x="3" y="3" width="26" height="26" rx="5" fill="#000000" />
        <path d="M7 23h8v2.5H7z" fill="#ffffff" />
        <path d="M7 7.5h4v13H7z" fill="#fe2857" />
        <path d="M14 7.5h11v3H14zM14 12.5h8v3h-8zM14 17.5h11v3H14z" fill="#00f1ff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
      {/* Code::Blocks 4 colorful 3D blocks */}
      <rect x="3" y="3" width="11" height="11" rx="2" fill="#e03131" />
      <rect x="18" y="3" width="11" height="11" rx="2" fill="#2f9e44" />
      <rect x="3" y="18" width="11" height="11" rx="2" fill="#f59f00" />
      <rect x="18" y="18" width="11" height="11" rx="2" fill="#9c36b5" />
    </svg>
  );
}

export default function TalkmanLobby() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("dark");
  const [editor, setEditor] = useState<Editor>("vscode");
  const [roomCode, setRoomCode] = useState("");

  const isDark = mode === "dark";

  const handleJoin = () => {
    const targetCode = roomCode.trim().toLowerCase();
    if (!targetCode) return;

    router.push(`/room/${encodeURIComponent(targetCode)}?editor=${editor}&mode=${mode}`);
  };

  return (
    <div className={`talkman-lobby ${isDark ? "is-dark" : "is-light"}`}>
      <style>{`
        .talkman-lobby {
          --bg: #0a192f;
          --bg-soft: #112240;
          --panel: #172a46;
          --panel-line: #233554;
          --text: #f8fafc;
          --text-dim: #94a3b8;
          --accent: #facc15;
          --accent-ink: #0f172a;
          --blue-title: #38bdf8;
          --yellow-title: #facc15;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 20px;
          background: var(--bg);
          font-family: "Space Grotesk", "Segoe UI", system-ui, -apple-system, sans-serif;
          color: var(--text);
          transition: background 0.3s ease;
          box-sizing: border-box;
        }
        .talkman-lobby.is-light {
          --bg: #e8f0fe;
          --bg-soft: #ffffff;
          --panel: #ffffff;
          --panel-line: #cbd5e1;
          --text: #0f172a;
          --text-dim: #64748b;
          --accent: #eab308;
          --accent-ink: #0f172a;
          --blue-title: #2563eb;
          --yellow-title: #ca8a04;
          background: var(--bg);
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
          align-items: center;
          justify-content: center;
          margin-bottom: -4px;
        }
        .tl-title {
          font-size: 44px;
          font-weight: 800;
          letter-spacing: -0.03em;
          display: inline-flex;
          align-items: center;
          line-height: 1;
          user-select: none;
        }
        .tl-title-blue {
          color: var(--blue-title);
        }
        .tl-title-yellow {
          color: var(--yellow-title);
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
          color: var(--text);
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .tl-mode button.active {
          background: var(--accent);
          color: var(--accent-ink);
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

        .tl-code-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--panel-line);
          background: var(--bg-soft);
          color: var(--text);
          padding: 13px 14px;
          font-size: 15px;
          letter-spacing: 0.08em;
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

        .tl-subhint {
          font-size: 12px;
          color: var(--text-dim);
          text-align: center;
          margin-top: -6px;
        }

        .tl-hint {
          font-size: 12px;
          color: var(--text-dim);
          text-align: center;
        }
      `}</style>

      <div className="tl-card">
        <div className="tl-wordmark">
          <span className="tl-title">
            <span className="tl-title-blue">talk</span>
            <span className="tl-title-yellow">man</span>
          </span>
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
            <Sun size={17} strokeWidth={2} />
          </button>
          <button
            className={mode === "dark" ? "active" : ""}
            role="radio"
            aria-checked={mode === "dark"}
            onClick={() => setMode("dark")}
            title="Dark mode"
          >
            <Moon size={17} strokeWidth={2} />
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
            Join a room
          </div>

          <input
            className="tl-code-input"
            placeholder="Room code"
            value={roomCode}
            maxLength={18}
            onChange={(e) => setRoomCode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && roomCode.trim().length > 0) {
                handleJoin();
              }
            }}
            autoFocus
          />

          <button
            className="tl-go"
            disabled={roomCode.trim().length === 0}
            onClick={handleJoin}
          >
            Join room
          </button>

          <div className="tl-subhint">
            If the room doesn't exist, it will be created automatically.
          </div>

          <div className="tl-hint">
            {editor === "vscode" && "The Talkman panel opens in VS Code-like UI."}
            {editor === "eclipse" && "The Talkman view opens in Eclipse-like UI."}
            {editor === "intellij" && "The Talkman tool window opens in IntelliJ-like UI."}
            {editor === "codeblocks" && "The Talkman workspace opens in Code::Blocks-like UI."}
          </div>
        </div>
      </div>
    </div>
  );
}
