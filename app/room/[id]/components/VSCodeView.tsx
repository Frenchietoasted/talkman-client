"use client";

import React, { useState } from "react";
import {
  Search,
  Files,
  GitBranch,
  Play,
  LayoutGrid,
  MessageSquare,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Code2,
  X,
  FileText,
  XCircle,
  AlertTriangle,
  Radio,
  Bell,
  Users,
  Terminal,
  Check,
  Copy,
  Folder,
} from "lucide-react";
import TopControls from "./TopControls";
import { IDEProps } from "./types";

export default function VSCodeView({
  roomId,
  mode,
  setMode,
  editor,
  setEditor,
  messages,
  inputText,
  setInputText,
  handleSendMessage,
  messagesEndRef,
  wsConnected,
  copiedCode,
  copyRoomCode,
}: IDEProps) {
  const [vscodeBottomTab, setVscodeBottomTab] = useState<"terminal" | "problems" | "output" | "debug">("terminal");
  const isDark = mode === "dark";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--ide-bg)",
        color: "var(--ide-text)",
        fontSize: "13px",
      }}
    >
      {/* VS Code Titlebar (Strict 38px Height) */}
      <div
        style={{
          height: "38px",
          background: "var(--ide-titlebar)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          borderBottom: "1px solid var(--ide-border)",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {/* Left Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "260px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ff5f56" }} />
            <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ffbd2e" }} />
            <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <div style={{ display: "flex", gap: "12px", color: "var(--ide-text-dim)", marginLeft: "6px" }}>
            <span>File</span>
            <span>Edit</span>
            <span>Selection</span>
            <span>View</span>
            <span>Go</span>
            <span>Run</span>
            <span>Terminal</span>
            <span>Help</span>
          </div>
        </div>

        {/* Center Command Search Bar */}
        <div
          style={{
            background: "var(--ide-bg)",
            border: "1px solid var(--ide-border)",
            borderRadius: "6px",
            padding: "3px 18px",
            fontSize: "12px",
            color: "var(--ide-text)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "300px",
            justifyContent: "center",
          }}
        >
          <Search size={13} style={{ opacity: 0.7 }} />
          <span>talkman-pair — room #{roomId} (Workspace)</span>
        </div>

        {/* Right Controls */}
        <TopControls
          currentTheme={editor}
          setEditor={setEditor}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* VS Code Main Layout */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Activity Bar (Far Left) */}
        <div
          style={{
            width: "48px",
            background: "var(--ide-activity)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 0",
            borderRight: "1px solid var(--ide-border)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", alignItems: "center" }}>
            <div title="Explorer" style={{ cursor: "pointer", color: "var(--ide-activity-fg)", display: "flex" }}>
              <Files size={18} />
            </div>
            <div title="Search" style={{ cursor: "pointer", opacity: 0.6, display: "flex" }}>
              <Search size={18} />
            </div>
            <div title="Source Control" style={{ cursor: "pointer", opacity: 0.6, display: "flex" }}>
              <GitBranch size={18} />
            </div>
            <div title="Run and Debug" style={{ cursor: "pointer", opacity: 0.6, display: "flex" }}>
              <Play size={18} />
            </div>
            <div title="Extensions" style={{ cursor: "pointer", opacity: 0.6, display: "flex" }}>
              <LayoutGrid size={18} />
            </div>
            <div
              title="Talkman Pair Channel (Active)"
              style={{
                cursor: "pointer",
                color: "var(--ide-activity-badge)",
                display: "flex",
                borderLeft: "2px solid var(--ide-activity-badge)",
                paddingLeft: "4px",
              }}
            >
              <MessageSquare size={18} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <div title="Accounts" style={{ cursor: "pointer", opacity: 0.7, display: "flex" }}>
              <User size={18} />
            </div>
            <div title="Manage" style={{ cursor: "pointer", opacity: 0.7, display: "flex" }}>
              <Settings size={18} />
            </div>
          </div>
        </div>

        {/* Sidebar (Explorer / Project Files & Symbols) */}
        <div
          style={{
            width: "240px",
            background: "var(--ide-sidebar)",
            borderRight: "1px solid var(--ide-border)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "9px 14px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "var(--ide-text-dim)",
              borderBottom: "1px solid var(--ide-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>EXPLORER: TALKMAN-PAIR</span>
            <span style={{ fontSize: "12px", opacity: 0.7, cursor: "pointer" }}>•••</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px", fontSize: "12px", lineHeight: "1.6" }}>
            {/* Project Files Tree */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, color: "var(--ide-text-dim)", fontSize: "11px", marginBottom: "4px" }}>
                <ChevronDown size={12} /> <span>TALKMAN-PAIR</span>
              </div>
              <div style={{ paddingLeft: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <ChevronDown size={10} /> <Folder size={12} color="#e5c07b" /> app
                </div>
                <div style={{ paddingLeft: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                    <ChevronDown size={10} /> <Folder size={12} color="#e5c07b" /> room/[id]
                  </div>
                  <div style={{ paddingLeft: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "1px 6px",
                        background: "var(--ide-self-msg)",
                        borderRadius: "3px",
                        fontWeight: 600,
                        color: "var(--ide-accent)",
                      }}
                    >
                      <Code2 size={12} color="#3875d7" /> room-{roomId}.tsx
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "6px" }}>
                      <FileText size={12} color="#61afef" /> page.tsx
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", opacity: 0.8 }}>
                  <ChevronRight size={10} /> <Folder size={12} color="#e5c07b" /> components
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "14px" }}>
                  <FileText size={12} color="#e5c07b" /> package.json
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "14px" }}>
                  <FileText size={12} color="#61afef" /> tsconfig.json
                </div>
              </div>
            </div>

            {/* Outline / Structure Window */}
            <div style={{ borderTop: "1px solid var(--ide-border)", paddingTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, color: "var(--ide-text-dim)", fontSize: "11px", marginBottom: "4px" }}>
                <ChevronDown size={12} /> <span>OUTLINE</span>
              </div>
              <div style={{ paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "2px", fontSize: "11px", color: "var(--ide-text-dim)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--ide-text)" }}>
                  <span style={{ color: "#3875d7", fontWeight: "bold" }}>⚛</span> RoomPage
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: "#e5c07b" }}>⚙</span> handleSendMessage
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: "#e5c07b" }}>⚙</span> copyRoomCode
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center + Right Main Area (Code Canvas on Top, Terminal / Participants Deck on Bottom) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--ide-bg)", overflow: "hidden" }}>
          {/* Top Java/TSX Editor Canvas */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Tabs Bar */}
            <div
              style={{
                height: "36px",
                background: "var(--ide-sidebar)",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--ide-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "stretch" }}>
                <div
                  style={{
                    padding: "0 16px",
                    background: "var(--ide-tab-active)",
                    borderTop: "2px solid var(--ide-accent)",
                    borderRight: "1px solid var(--ide-border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: 600,
                    fontSize: "12px",
                  }}
                >
                  <Code2 size={13} style={{ color: "#3875d7" }} />
                  <span>room-{roomId}.tsx</span>
                  <X size={11} style={{ opacity: 0.6, marginLeft: "4px", cursor: "pointer" }} />
                </div>
                <div
                  style={{
                    padding: "0 14px",
                    background: "var(--ide-tab-inactive)",
                    borderRight: "1px solid var(--ide-border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--ide-text-dim)",
                  }}
                >
                  <FileText size={12} color="#61afef" />
                  <span>page.tsx</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "10px", color: "var(--ide-text-dim)" }}>
                <span title="Run Code" style={{ cursor: "pointer", display: "inline-flex" }}>
                  <Play size={13} />
                </span>
                <span style={{ cursor: "pointer" }}>•••</span>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div
              style={{
                padding: "4px 16px",
                fontSize: "11px",
                color: "var(--ide-text-dim)",
                borderBottom: "1px solid var(--ide-border)",
                background: "var(--ide-bg)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>talkman › app › room › [{roomId}] ›</span>
              <Code2 size={11} color="#3875d7" />
              <span>room-{roomId}.tsx</span>
            </div>

            {/* TSX Code Body with Live Messages Stream */}
            <div style={{ flex: 1, display: "flex", overflowY: "auto", fontFamily: '"JetBrains Mono", Consolas, monospace', fontSize: "13px", lineHeight: "1.45" }}>
              {/* Left Gutter with Breakpoint Indicator */}
              <div
                style={{
                  width: "44px",
                  background: "var(--ide-sidebar)",
                  borderRight: "1px solid var(--ide-border)",
                  color: "var(--ide-text-dim)",
                  padding: "8px 0",
                  textAlign: "right",
                  userSelect: "none",
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                }}
              >
                {Array.from({ length: Math.max(20, 14 + messages.length * 3) }, (_, i) => i + 1).map((num) => (
                  <div key={num} style={{ paddingRight: "8px", height: "19px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "3px" }}>
                    {num === 5 && <span style={{ color: "#28a745", fontSize: "10px" }}>➔</span>}
                    {num === 8 && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} title="Breakpoint" />}
                    <span>{num}</span>
                  </div>
                ))}
              </div>

              {/* Code Body Canvas */}
              <div style={{ flex: 1, padding: "8px 14px", color: "var(--ide-text)", overflowX: "auto", display: "flex", flexDirection: "column" }}>
                <div><span style={{ color: "#c678dd", fontWeight: "bold" }}>import</span> React, &#123; useState &#125; <span style={{ color: "#c678dd", fontWeight: "bold" }}>from</span> <span style={{ color: "#98c379" }}>"react"</span>;</div>
                <div><span style={{ color: "#c678dd", fontWeight: "bold" }}>import</span> &#123; <span style={{ color: "#e5c07b" }}>RoomSession</span> &#125; <span style={{ color: "#c678dd", fontWeight: "bold" }}>from</span> <span style={{ color: "#98c379" }}>"@talkman/pair"</span>;</div>
                <div style={{ height: "19px" }}></div>
                <div><span style={{ color: "#c678dd", fontWeight: "bold" }}>export default function</span> <span style={{ color: "#61afef" }}>RoomPage</span>() &#123;</div>
                <div style={{ paddingLeft: "20px" }}><span style={{ color: "#c678dd", fontWeight: "bold" }}>const</span> roomId = <span style={{ color: "#98c379" }}>"#{roomId}"</span>;</div>
                <div style={{ height: "19px" }}></div>

                {/* Messages in Code Canvas */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      paddingLeft: "20px",
                      marginTop: "6px",
                      marginBottom: "6px",
                      lineHeight: "1.5",
                      fontFamily: '"JetBrains Mono", Consolas, "Fira Code", monospace',
                    }}
                  >
                    <div style={{ color: isDark ? "#6a9955" : "#008000", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600, color: msg.isSelf ? (isDark ? "#4ec9b0" : "#0070c1") : (isDark ? "#e5c07b" : "#b26b00") }}>
                        // @{msg.sender}{msg.isSelf ? " (You)" : ""}:
                      </span>
                      <span style={{ opacity: 0.6, fontSize: "11px" }}>{msg.timestamp}</span>
                    </div>
                    <div
                      style={{
                        paddingLeft: "16px",
                        fontSize: "13px",
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.4",
                        color: msg.type === "code"
                          ? "var(--ide-text-bright)"
                          : msg.isSelf
                          ? (isDark ? "#98c379" : "#2e7d32")
                          : "var(--ide-text)",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
                <div style={{ height: "12px" }}></div>
                <div>&#125;</div>
              </div>
            </div>

            {/* VS Code Integrated Input / Action Bar */}
            <form
              onSubmit={handleSendMessage}
              style={{
                borderTop: "1px solid var(--ide-border)",
                background: "var(--ide-sidebar)",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type message to room #${roomId} (Press Enter to Send)...`}
                style={{
                  flex: 1,
                  background: "var(--ide-input-bg)",
                  border: "1px solid var(--ide-input-border)",
                  color: "var(--ide-text)",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  fontSize: "12px",
                  outline: "none",
                  fontFamily: '"JetBrains Mono", Consolas, monospace',
                }}
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                style={{
                  background: "var(--ide-accent)",
                  color: "#fff",
                  border: "none",
                  padding: "5px 14px",
                  borderRadius: "3px",
                  fontWeight: 600,
                  fontSize: "11px",
                  cursor: "pointer",
                  opacity: inputText.trim() ? 1 : 0.6,
                }}
              >
                Send
              </button>
            </form>
          </div>

          {/* Bottom Multi-tab Terminal / Participants Dock */}
          <div
            style={{
              height: "200px",
              background: "var(--ide-sidebar)",
              borderTop: "1px solid var(--ide-border)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Panel Tabs Header */}
            <div
              style={{
                height: "28px",
                background: "var(--ide-sidebar)",
                borderBottom: "1px solid var(--ide-border)",
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                padding: "0 6px",
              }}
            >
              <div style={{ display: "flex", alignItems: "stretch", gap: "2px" }}>
                <button
                  onClick={() => setVscodeBottomTab("terminal")}
                  style={{
                    padding: "0 10px",
                    background: vscodeBottomTab === "terminal" ? "var(--ide-bg)" : "transparent",
                    borderTop: vscodeBottomTab === "terminal" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: vscodeBottomTab === "terminal" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: vscodeBottomTab === "terminal" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Terminal size={12} color="#3875d7" />
                  <span>Terminal: Participants</span>
                </button>
                <button
                  onClick={() => setVscodeBottomTab("problems")}
                  style={{
                    padding: "0 10px",
                    background: vscodeBottomTab === "problems" ? "var(--ide-bg)" : "transparent",
                    borderTop: vscodeBottomTab === "problems" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: vscodeBottomTab === "problems" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: vscodeBottomTab === "problems" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Problems (0)
                </button>
                <button
                  onClick={() => setVscodeBottomTab("output")}
                  style={{
                    padding: "0 10px",
                    background: vscodeBottomTab === "output" ? "var(--ide-bg)" : "transparent",
                    borderTop: vscodeBottomTab === "output" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: vscodeBottomTab === "output" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: vscodeBottomTab === "output" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Output
                </button>
                <button
                  onClick={() => setVscodeBottomTab("debug")}
                  style={{
                    padding: "0 10px",
                    background: vscodeBottomTab === "debug" ? "var(--ide-bg)" : "transparent",
                    borderTop: vscodeBottomTab === "debug" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: vscodeBottomTab === "debug" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: vscodeBottomTab === "debug" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Debug Console
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.7, fontSize: "11px", paddingRight: "6px" }}>
                <span title="New Terminal" style={{ cursor: "pointer" }}>+</span>
                <span title="Split Terminal" style={{ cursor: "pointer" }}>◫</span>
                <span title="Maximize Panel" style={{ cursor: "pointer" }}>^</span>
                <span title="Close Panel" style={{ cursor: "pointer" }}>✕</span>
              </div>
            </div>

            {/* Panel Content Body */}
            <div style={{ flex: 1, overflowY: "auto", background: "var(--ide-bg)", padding: "8px 12px", fontFamily: '"JetBrains Mono", Consolas, monospace', fontSize: "11px" }}>
              {vscodeBottomTab === "terminal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ color: "var(--ide-text-dim)", borderBottom: "1px solid var(--ide-border)", paddingBottom: "4px", display: "flex", justifyContent: "space-between" }}>
                    <span>talkman@pair-terminal:~$ talkman status --room=#{roomId}</span>
                    <span style={{ color: "#3bd671", fontWeight: 600 }}>● {wsConnected ? "CONNECTED" : "LOCAL"}</span>
                  </div>

                  {/* Participants Section */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, color: "var(--ide-text-dim)", marginBottom: "4px" }}>
                      <Users size={12} color="var(--ide-accent)" />
                      <span>CONNECTED PARTICIPANTS (1)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 10px",
                        background: "var(--ide-sidebar)",
                        border: "1px solid var(--ide-border)",
                        borderRadius: "4px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3bd671", display: "inline-block" }} />
                        <span style={{ fontWeight: 600, color: "var(--ide-text)" }}>You (Host)</span>
                        <span style={{ fontSize: "10px", color: "var(--ide-text-dim)" }}>[Developer]</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: "var(--ide-text-dim)" }}>
                        <span style={{ background: "var(--ide-self-msg)", padding: "1px 6px", borderRadius: "2px", color: "var(--ide-accent)", fontWeight: 600 }}>VS Code</span>
                        <span>Online • 0ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Session Info Box & Copy Room Code */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, padding: "6px 10px", background: "var(--ide-sidebar)", border: "1px solid var(--ide-border)", borderRadius: "4px" }}>
                      <div style={{ color: "var(--ide-text-dim)", fontSize: "10px", marginBottom: "3px", fontWeight: 600 }}>SESSION / PAIRING DETAILS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", rowGap: "2px", fontSize: "10px" }}>
                        <span style={{ color: "var(--ide-text-dim)" }}>Room ID:</span>
                        <span style={{ fontWeight: 600, color: "var(--ide-accent)" }}>#{roomId}</span>
                        <span style={{ color: "var(--ide-text-dim)" }}>Transport:</span>
                        <span>WebSocket ({wsConnected ? "ws://localhost:8080" : "Local Standalone"})</span>
                        <span style={{ color: "var(--ide-text-dim)" }}>Environment:</span>
                        <span>VS Code Web Client</span>
                      </div>
                    </div>

                    <div style={{ width: "150px", display: "flex", flexDirection: "column" }}>
                      <button
                        onClick={copyRoomCode}
                        style={{
                          flex: 1,
                          background: "var(--ide-sidebar)",
                          border: "1px solid var(--ide-border)",
                          color: "var(--ide-text)",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        {copiedCode ? <><Check size={11} color="#3bd671" /> Copied</> : <><Copy size={11} /> Copy Room Code</>}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {vscodeBottomTab === "problems" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  No problems have been detected in the workspace.
                </div>
              )}
              {vscodeBottomTab === "output" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  [Talkman Language Server] Initialized with room #{roomId}. Ready.
                </div>
              )}
              {vscodeBottomTab === "debug" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  Debug console attached to session #{roomId}.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* VS Code Blue Status Bar */}
      <div
        style={{
          height: "24px",
          background: "var(--ide-status)",
          color: "var(--ide-status-fg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <GitBranch size={12} /> main*
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <XCircle size={12} /> 0 <AlertTriangle size={12} style={{ marginLeft: "4px" }} /> 0
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Radio size={12} /> Talkman: {wsConnected ? "Online (ws:8080)" : "Local Mode"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span>Ln {messages.length}, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>TypeScript JSX</span>
          <Bell size={12} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}
