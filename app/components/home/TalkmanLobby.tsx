"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";

function setCookie(name: string , value:string) {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    const date = new Date();
    date.setTime(date.getTime() + (6 * 60 * 60 * 1000)); // expires in 6 hours cause why not 
    cookieString += `; expires=${date.toUTCString()}`;
    
    cookieString += "; path=/; SameSite=Lax; Secure";
    
    document.cookie = cookieString;
}

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
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const isDark = mode === "dark";

  const handleJoin = () => {
    const targetCode = roomCode.trim().toLowerCase();
    const targetUsername = username.trim().toLowerCase();
    if (!targetCode || !targetUsername) return;
    setCookie("username", targetUsername)
    setCookie("roomId", targetCode);
    router.push(`/room/${encodeURIComponent(targetCode)}`);
  };

  return (
    <div className={`talkman-lobby ${isDark ? "is-dark" : "is-light"}`}>

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
            placeholder="Username"
            value={username}
            maxLength={18}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          
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
            If the room doesn&apos;t exist, it will be created automatically.
          </div>

          <div className="tl-hint">
            {editor === "vscode" && "VS Code Mode"}
            {editor === "eclipse" && "Eclipse Mode."}
            {editor === "intellij" && "IntelliJ Mode."}
            {editor === "codeblocks" && "Code::Blocks Mode."}
          </div>
        </div>
      </div>
    </div>
  );
}
