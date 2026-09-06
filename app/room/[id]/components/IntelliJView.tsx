"use client";

import React, { useState } from "react";
import {
  Play,
  Bug,
  GitBranch,
  FolderTree,
  Boxes,
  MessageSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  FileCode,
  FileText,
  Package,
  Folder,
  X,
  Users,
  Terminal,
  Check,
  Copy,
  Radio,
} from "lucide-react";
import TopControls from "./TopControls";
import { IDEProps } from "./types";

export default function IntelliJView({
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
  const [intellijBottomTab, setIntellijBottomTab] = useState<"terminal" | "problems" | "todo" | "git">("terminal");
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
      {/* IntelliJ Main Header / New UI Toolbar (Strict 38px Height) */}
      <div
        style={{
          height: "38px",
          background: "var(--ide-titlebar)",
          borderBottom: "1px solid var(--ide-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        {/* Left Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "260px" }}>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--ide-accent)" }}>// Talkman</span>
          <span style={{ fontWeight: 600 }}>room-{roomId}</span>
          <span style={{ color: "var(--ide-text-dim)" }}>[talkman-client]</span>
          <span style={{ color: "var(--ide-text-dim)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <GitBranch size={12} /> main
          </span>
        </div>

        {/* Run Configurations in Center */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "var(--ide-bg)",
            border: "1px solid var(--ide-border)",
            borderRadius: "6px",
            padding: "3px 18px",
            gap: "8px",
            fontSize: "12px",
            minWidth: "300px",
            justifyContent: "center",
          }}
        >
          <Play size={12} color="#28a745" />
          <span style={{ fontWeight: 600 }}>PairSession [Room #{roomId}]</span>
          <Bug size={12} color="#3bd671" />
        </div>

        {/* Right Controls */}
        <TopControls
          currentTheme={editor}
          setEditor={setEditor}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* IntelliJ Main Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Left Tool Window Stripe */}
        <div
          style={{
            width: "40px",
            background: "var(--ide-activity)",
            borderRight: "1px solid var(--ide-border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px 0",
            gap: "18px",
          }}
        >
          <span title="Project" style={{ cursor: "pointer", opacity: 0.8, display: "inline-flex" }}>
            <FolderTree size={16} />
          </span>
          <span title="Git" style={{ cursor: "pointer", opacity: 0.8, display: "inline-flex" }}>
            <GitBranch size={16} />
          </span>
          <span title="Structure" style={{ cursor: "pointer", opacity: 0.8, display: "inline-flex" }}>
            <Boxes size={16} />
          </span>
          <span title="Talkman Chat (Active)" style={{ cursor: "pointer", color: "var(--ide-accent)", display: "inline-flex" }}>
            <MessageSquare size={16} />
          </span>
          <span title="Settings" style={{ cursor: "pointer", opacity: 0.8, marginTop: "auto", display: "inline-flex" }}>
            <Settings size={16} />
          </span>
        </div>

        {/* Project Explorer Window */}
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
              padding: "8px 12px",
              fontWeight: 700,
              fontSize: "11px",
              borderBottom: "1px solid var(--ide-border)",
              color: "var(--ide-text-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>PROJECT: TALKMAN-PAIR</span>
            <span style={{ fontSize: "12px", opacity: 0.7, cursor: "pointer" }}>•••</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "8px", fontSize: "12px", lineHeight: "1.6" }}>
            {/* Project File Tree */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, color: "var(--ide-text-dim)", fontSize: "11px", marginBottom: "4px" }}>
                <ChevronDown size={11} /> <span>talkman-pair</span>
              </div>
              <div style={{ paddingLeft: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                  <ChevronDown size={10} /> <Folder size={12} color="#e5c07b" /> src/main/kotlin
                </div>
                <div style={{ paddingLeft: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                    <ChevronDown size={10} /> <Package size={12} color="#e5c07b" /> com.talkman.pair
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
                      <FileCode size={12} color="#7f52ff" /> RoomSession.kt
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "6px" }}>
                      <FileCode size={12} color="#7f52ff" /> Main.kt
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", opacity: 0.8 }}>
                  <ChevronRight size={10} /> <Folder size={12} color="#e5c07b" /> src/main/resources
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "14px" }}>
                  <FileText size={12} color="#e5c07b" /> build.gradle.kts
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.8, paddingLeft: "14px" }}>
                  <FileText size={12} color="#61afef" /> settings.gradle.kts
                </div>
              </div>
            </div>

            {/* Structure / Symbols Window */}
            <div style={{ borderTop: "1px solid var(--ide-border)", paddingTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 700, color: "var(--ide-text-dim)", fontSize: "11px", marginBottom: "4px" }}>
                <ChevronDown size={11} /> <span>STRUCTURE</span>
              </div>
              <div style={{ paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "2px", fontSize: "11px", color: "var(--ide-text-dim)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--ide-text)" }}>
                  <span style={{ color: "#3bd671", fontWeight: "bold" }}>Ⓒ</span> RoomSession
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: "#7f52ff" }}>ⓕ</span> joinRoom(id: String)
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", paddingLeft: "8px" }}>
                  <span style={{ color: "#7f52ff" }}>ⓕ</span> broadcast(msg: String)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center + Right Main Area (Kotlin Canvas on Top, Tool Window / Participants Deck on Bottom) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--ide-bg)", overflow: "hidden" }}>
          {/* Top Kotlin Editor Canvas */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Tab Bar */}
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
                  <FileCode size={13} style={{ color: "#7f52ff" }} />
                  <span>RoomSession.kt</span>
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
                  <FileCode size={12} color="#7f52ff" />
                  <span>Main.kt</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "10px", color: "var(--ide-text-dim)" }}>
                <span title="Run Configuration" style={{ cursor: "pointer", display: "inline-flex" }}>
                  <Play size={13} color="#28a745" />
                </span>
                <span title="Debug" style={{ cursor: "pointer", display: "inline-flex" }}>
                  <Bug size={13} color="#3bd671" />
                </span>
                <span style={{ cursor: "pointer" }}>•••</span>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div
              style={{
                padding: "4px 14px",
                fontSize: "11px",
                color: "var(--ide-text-dim)",
                borderBottom: "1px solid var(--ide-border)",
                background: "var(--ide-bg)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>talkman-pair › src › main › kotlin ›</span>
              <FileCode size={11} color="#7f52ff" />
              <span>RoomSession.kt › joinRoom()</span>
            </div>

            {/* Kotlin Code Body with Live Messages Stream */}
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
                    {num === 6 && <span style={{ color: "#28a745", fontSize: "10px" }}>➔</span>}
                    {num === 9 && <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} title="Breakpoint" />}
                    <span>{num}</span>
                  </div>
                ))}
              </div>

              {/* Kotlin Code Body Canvas */}
              <div style={{ flex: 1, padding: "8px 14px", color: "var(--ide-text)", overflowX: "auto", display: "flex", flexDirection: "column" }}>
                <div><span style={{ color: "#cc7832", fontWeight: "bold" }}>package</span> com.talkman.pair</div>
                <div style={{ height: "19px" }}></div>
                <div><span style={{ color: "#cc7832", fontWeight: "bold" }}>import</span> kotlinx.coroutines.*</div>
                <div><span style={{ color: "#cc7832", fontWeight: "bold" }}>import</span> io.talkman.client.<span style={{ color: "#ffc66d" }}>RoomSession</span></div>
                <div style={{ height: "19px" }}></div>
                <div><span style={{ color: "#cc7832", fontWeight: "bold" }}>class</span> <span style={{ color: "#ffc66d" }}>RoomSession</span>(<span style={{ color: "#9876aa" }}>val</span> roomId: String = <span style={{ color: "#6a8759" }}>"#{roomId}"</span>) &#123;</div>
                <div style={{ height: "19px" }}></div>

                {/* Messages in Kotlin Code Canvas */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      paddingLeft: "20px",
                      marginTop: "6px",
                      marginBottom: "6px",
                      lineHeight: "1.5",
                      fontFamily: '"JetBrains Mono", Consolas, monospace',
                    }}
                  >
                    <div style={{ color: isDark ? "#7a7e85" : "#808080", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600, color: msg.isSelf ? "var(--ide-accent)" : (isDark ? "#ffc66d" : "#9876aa") }}>
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
                          ? (isDark ? "#6a8759" : "#008000")
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

            {/* IntelliJ Bottom Assistant Input */}
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
                placeholder={`IntelliJ Pair Prompt (Room #${roomId})...`}
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

          {/* Bottom Tool Window / Participants Deck */}
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
            {/* Tool Window Tabs Bar */}
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
                  onClick={() => setIntellijBottomTab("terminal")}
                  style={{
                    padding: "0 10px",
                    background: intellijBottomTab === "terminal" ? "var(--ide-bg)" : "transparent",
                    borderTop: intellijBottomTab === "terminal" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: intellijBottomTab === "terminal" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: intellijBottomTab === "terminal" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Terminal size={12} color="var(--ide-accent)" />
                  <span>4: Run / Terminal: Participants</span>
                </button>
                <button
                  onClick={() => setIntellijBottomTab("todo")}
                  style={{
                    padding: "0 10px",
                    background: intellijBottomTab === "todo" ? "var(--ide-bg)" : "transparent",
                    borderTop: intellijBottomTab === "todo" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: intellijBottomTab === "todo" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: intellijBottomTab === "todo" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  TODO
                </button>
                <button
                  onClick={() => setIntellijBottomTab("git")}
                  style={{
                    padding: "0 10px",
                    background: intellijBottomTab === "git" ? "var(--ide-bg)" : "transparent",
                    borderTop: intellijBottomTab === "git" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: intellijBottomTab === "git" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: intellijBottomTab === "git" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Git: Log
                </button>
                <button
                  onClick={() => setIntellijBottomTab("problems")}
                  style={{
                    padding: "0 10px",
                    background: intellijBottomTab === "problems" ? "var(--ide-bg)" : "transparent",
                    borderTop: intellijBottomTab === "problems" ? "2px solid var(--ide-accent)" : "none",
                    borderBottom: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    color: intellijBottomTab === "problems" ? "var(--ide-text)" : "var(--ide-text-dim)",
                    fontWeight: intellijBottomTab === "problems" ? 600 : 400,
                    fontSize: "11px",
                    cursor: "pointer",
                  }}
                >
                  Problems
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.7, fontSize: "11px", paddingRight: "6px" }}>
                <span title="Settings" style={{ cursor: "pointer" }}>⚙</span>
                <span title="Minimize" style={{ cursor: "pointer" }}>—</span>
                <span title="Close" style={{ cursor: "pointer" }}>✕</span>
              </div>
            </div>

            {/* Tool Window Body */}
            <div style={{ flex: 1, overflowY: "auto", background: "var(--ide-bg)", padding: "8px 12px", fontFamily: '"JetBrains Mono", Consolas, monospace', fontSize: "11px" }}>
              {intellijBottomTab === "terminal" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ color: "var(--ide-text-dim)", borderBottom: "1px solid var(--ide-border)", paddingBottom: "4px", display: "flex", justifyContent: "space-between" }}>
                    <span>C:\TalkMan\bin\java.exe -Droom.id=#{roomId} com.talkman.pair.RoomSessionKt</span>
                    <span style={{ color: "#3bd671", fontWeight: 600 }}>● {wsConnected ? "CONNECTED" : "STANDALONE"}</span>
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
                        <span style={{ background: "var(--ide-self-msg)", padding: "1px 6px", borderRadius: "2px", color: "var(--ide-accent)", fontWeight: 600 }}>IntelliJ IDEA</span>
                        <span>Online • 0ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Session Details Box & Copy Room Code */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, padding: "6px 10px", background: "var(--ide-sidebar)", border: "1px solid var(--ide-border)", borderRadius: "4px" }}>
                      <div style={{ color: "var(--ide-text-dim)", fontSize: "10px", marginBottom: "3px", fontWeight: 600 }}>SESSION / PAIRING DETAILS</div>
                      <div style={{ display: "grid", gridTemplateColumns: "90px 1fr", rowGap: "2px", fontSize: "10px" }}>
                        <span style={{ color: "var(--ide-text-dim)" }}>Room ID:</span>
                        <span style={{ fontWeight: 600, color: "var(--ide-accent)" }}>#{roomId}</span>
                        <span style={{ color: "var(--ide-text-dim)" }}>Transport:</span>
                        <span>WebSocket ({wsConnected ? "ws://localhost:8080" : "Local Standalone"})</span>
                        <span style={{ color: "var(--ide-text-dim)" }}>Runtime:</span>
                        <span>Kotlin 1.9 / JVM 21</span>
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

              {intellijBottomTab === "todo" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  No TODO items found in the project.
                </div>
              )}
              {intellijBottomTab === "git" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  Git log: HEAD -&gt; main (Talkman Pair Session Active)
                </div>
              )}
              {intellijBottomTab === "problems" && (
                <div style={{ color: "var(--ide-text-dim)", padding: "8px 0" }}>
                  No compilation problems detected in RoomSession.kt.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* IntelliJ Bottom Status Bar */}
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
          borderTop: "1px solid var(--ide-border)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <span>1: Project</span>
          <span>4: Run</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Radio size={11} /> Talkman Stream ({wsConnected ? "Online" : "Local"})
          </span>
          <span>12: Terminal</span>
        </div>
        <div style={{ display: "flex", gap: "14px" }}>
          <span>UTF-8</span>
          <span>CRLF</span>
          <span>Kotlin</span>
          <span>main</span>
          <span>Room: #{roomId}</span>
        </div>
      </div>
    </div>
  );
}
