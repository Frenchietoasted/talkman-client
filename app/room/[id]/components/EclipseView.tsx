"use client";

import React, { useState } from "react";
import {
  Search,
  Play,
  Bug,
  Package,
  Folder,
  ChevronDown,
  ChevronRight,
  FileCode,
  FileText,
  AlertTriangle,
  Coffee,
  Users,
  Check,
  Copy,
  Save,
  Printer,
  Hammer,
  RotateCcw,
  RotateCw,
  Terminal,
  ArrowRight,
  ArrowLeft,
  Plus,
  Files,
  ExternalLink,
  Link2,
  Bookmark,
  CircleSlash,
  Boxes,
} from "lucide-react";
import TopControls from "./TopControls";
import { IDEProps } from "./types";

export default function EclipseView({
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
  const isDark = mode === "dark";
  const [eclipseBottomTab, setEclipseBottomTab] = useState<"console" | "problems" | "javadoc" | "declaration" | "participants">("console");
  const [activeFile, setActiveFile] = useState<"MainActivity.java" | "NotesList.java" | "NoteEdit.java">("MainActivity.java");
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [quickAccessQuery, setQuickAccessQuery] = useState("");
  const [projectOpen, setProjectOpen] = useState(true);
  const [srcOpen, setSrcOpen] = useState(true);
  const [pkgOpen, setPkgOpen] = useState(true);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: isDark ? "#1e1e1e" : "#ffffff",
        color: isDark ? "#cccccc" : "#24292e",
        fontSize: "12px",
        fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 1. Eclipse Main Titlebar (Strict 38px Height matching all other IDEs) */}
      <div
        style={{
          height: "38px",
          background: isDark ? "#333333" : "#e8e8e8",
          borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {/* Left Section: Title & Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
          {/* Authentic Eclipse Logo */}
          <svg viewBox="0 0 16 16" width="16" height="16" style={{ flexShrink: 0 }}>
            <circle cx="8" cy="8" r="7" fill="#2d2254" stroke="#5b4fc4" strokeWidth="1.5" />
            <path d="M4 8a4 4 0 0 0 8 0" stroke="#f8981d" strokeWidth="2" fill="none" />
            <circle cx="8" cy="8" r="2" fill="#fff" />
          </svg>
          <span style={{ fontWeight: 600, fontSize: "12px", whiteSpace: "nowrap", color: isDark ? "#ffffff" : "#000000" }}>
            Java — {activeFile} - Eclipse IDE
          </span>
          <span
            style={{
              fontSize: "11px",
              color: isDark ? "#888888" : "#57606a",
              background: isDark ? "#282828" : "#dedede",
              padding: "1px 6px",
              borderRadius: "3px",
              border: isDark ? "1px solid #3c3c3c" : "1px solid #c0c0c0",
              whiteSpace: "nowrap",
            }}
          >
            Room #{roomId}
          </span>
        </div>

        {/* Center: Quick Access Search matching Screenshots */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              background: isDark ? "#1e1e1e" : "#ffffff",
              border: isDark ? "1px solid #4a4a4a" : "1px solid #b8c4d0",
              borderRadius: "4px",
              padding: "2px 12px",
              fontSize: "11px",
              color: isDark ? "#cccccc" : "#24292e",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              width: "240px",
            }}
          >
            <Search size={11} style={{ opacity: 0.6 }} />
            <input
              value={quickAccessQuery}
              onChange={(e) => {
                setQuickAccessQuery(e.target.value);
                setQuickAccessOpen(true);
              }}
              onFocus={() => setQuickAccessOpen(true)}
              placeholder="Quick Access"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "inherit",
                fontSize: "11px",
                width: "100%",
              }}
            />
          </div>

          {/* Quick Access Popup */}
          {quickAccessOpen && (
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "360px",
                background: isDark ? "#262626" : "#ffffff",
                border: isDark ? "1px solid #3c3c3c" : "1px solid #c0c0c0",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                borderRadius: "4px",
                zIndex: 200,
                fontSize: "11px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #e0e0e0" }}>
                <div style={{ width: "95px", background: isDark ? "#1e1e1e" : "#f1f3f5", padding: "6px", borderRight: isDark ? "1px solid #3c3c3c" : "1px solid #e0e0e0", color: isDark ? "#888888" : "#57606a" }}>
                  <div style={{ padding: "2px 0", color: "#3875d7", fontWeight: 600 }}>Views</div>
                  <div style={{ padding: "2px 0" }}>Perspectives</div>
                  <div style={{ padding: "2px 0" }}>Commands</div>
                </div>
                <div style={{ flex: 1, padding: "6px", display: "flex", flexDirection: "column", gap: "2px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 6px", background: isDark ? "#303030" : "#e6f0fa", borderRadius: "2px", cursor: "pointer" }}>
                    <Play size={11} color="#3bd671" />
                    <span style={{ fontWeight: 600 }}>Java Application</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "3px 6px", cursor: "pointer" }}>
                    <Bug size={11} color="#3bd671" />
                    <span>Debug active editor (F11)</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "3px 8px", background: isDark ? "#1e1e1e" : "#f1f3f5", color: isDark ? "#888888" : "#57606a", fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
                <span>Press &apos;Ctrl+3&apos; to show all matches</span>
                <span onClick={() => setQuickAccessOpen(false)} style={{ cursor: "pointer", color: "#3875d7" }}>Close ✕</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Standardized Top Controls */}
        <TopControls
          currentTheme="eclipse"
          setEditor={setEditor}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* 2. Menu Bar (Native Eclipse menu strip) */}
      <div
        style={{
          height: "23px",
          background: isDark ? "#2c2c2c" : "#e8e8e8",
          borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
          padding: "0 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "11px",
          color: isDark ? "#cccccc" : "#24292e",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {["File", "Edit", "Source", "Refactor", "Navigate", "Search", "Project", "Run", "Window", "Help"].map((item, idx) => (
            <span
              key={idx}
              style={{
                cursor: "pointer",
                padding: "1px 4px",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#3c3c3c" : "#d0d7de")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Perspectives Switcher (Right aligned) */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "1px 6px",
              background: isDark ? "#20354b" : "#cde2f8",
              border: "1px solid #3875d7",
              borderRadius: "2px",
              fontSize: "10px",
              fontWeight: 600,
              color: isDark ? "#80b0ff" : "#1a4675",
            }}
          >
            <Coffee size={10} color="#f8981d" />
            <span>Java</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", padding: "1px 6px", color: isDark ? "#888888" : "#57606a", fontSize: "10px", cursor: "pointer" }}>
            <Bug size={10} color="#3bd671" />
            <span>Debug</span>
          </div>
          <div style={{ padding: "1px 4px", color: isDark ? "#888888" : "#57606a", fontSize: "10px", cursor: "pointer" }}>
            <Plus size={10} />
          </div>
        </div>
      </div>

      {/* 3. Full Authentic Eclipse Toolbar with ALL Iconic Tools */}
      <div
        style={{
          height: "28px",
          background: isDark ? "#2c2c2c" : "#e8e8e8",
          borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        {/* New Java Class / Package wizard */}
        <button
          title="New Java Class"
          style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px" }}
        >
          <span style={{ fontSize: "11px", color: "#f8981d", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>
            +<Coffee size={12} color="#f8981d" />
          </span>
          <span style={{ fontSize: "8px", marginLeft: "1px" }}>▾</span>
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3c3c3c" : "#c0c0c0", margin: "0 2px" }} />

        {/* Save & Save All */}
        <button title="Save (Ctrl+S)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Save size={13} color={isDark ? "#888888" : "#57606a"} />
        </button>
        <button title="Save All (Ctrl+Shift+S)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Files size={13} color="#f8981d" />
        </button>
        <button title="Print" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Printer size={13} color={isDark ? "#888888" : "#57606a"} />
        </button>
        <button title="Build All" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Hammer size={13} color="#f59f00" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3c3c3c" : "#c0c0c0", margin: "0 2px" }} />

        {/* Undo / Redo */}
        <button title="Undo (Ctrl+Z)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <RotateCcw size={13} color="#4b8bf5" />
        </button>
        <button title="Redo (Ctrl+Y)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <RotateCw size={13} color="#4b8bf5" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3c3c3c" : "#c0c0c0", margin: "0 2px" }} />

        {/* Build / Run (Green Play) with Dropdown */}
        <button
          title="Run (Ctrl+F11)"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "2px",
          }}
        >
          <Play size={13} fill="#2f9e44" color="#2f9e44" />
          <span style={{ fontSize: "8px", marginLeft: "1px" }}>▾</span>
        </button>

        {/* Debug (Bug) with Dropdown */}
        <button
          title="Debug (F11)"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: "2px",
          }}
        >
          <Bug size={13} color="#2f9e44" />
          <span style={{ fontSize: "8px", marginLeft: "1px" }}>▾</span>
        </button>

        <button title="External Tools" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <ExternalLink size={13} color="#e5c07b" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3c3c3c" : "#c0c0c0", margin: "0 2px" }} />

        {/* Search, History & Location Navigation */}
        <button title="Search (Ctrl+H)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Search size={13} color="#3875d7" />
        </button>
        <button title="Last Edit Location" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Bookmark size={13} color="#f59f00" />
        </button>
        <button title="Backward History (Alt+Left)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <ArrowLeft size={13} color="#f59f00" />
        </button>
        <button title="Forward History (Alt+Right)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <ArrowRight size={13} color="#f59f00" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3c3c3c" : "#c0c0c0", margin: "0 2px" }} />

        {/* Open Type, Open Resource, Skip Breakpoints */}
        <button title="Open Type (Ctrl+Shift+T)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px", fontWeight: 700, color: "#3875d7" }}>
          [T]
        </button>
        <button title="Open Resource (Ctrl+Shift+R)" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: "2px", fontWeight: 700, color: "#2f9e44" }}>
          [R]
        </button>
        <button title="Skip All Breakpoints" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <CircleSlash size={13} color="#ff6b6b" />
        </button>
        <button title="Link with Editor" style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", padding: "2px" }}>
          <Link2 size={13} color="#4b8bf5" />
        </button>
      </div>

      {/* 4. MAIN WORKSPACE (Package Explorer Left + Editor Center + Outline Right) */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* LEFT: Package Explorer */}
        <div
          style={{
            width: "235px",
            background: isDark ? "#252525" : "#fafafa",
            borderRight: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Header Tab */}
          <div
            style={{
              height: "25px",
              background: isDark ? "#303030" : "#e8e8e8",
              borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              fontSize: "11px",
              fontWeight: 600,
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Folder size={12} color="#f59f00" />
              <span>Package Explorer</span>
            </div>
            <div style={{ display: "flex", gap: "6px", color: isDark ? "#888888" : "#57606a" }}>
              <span style={{ cursor: "pointer" }}>_</span>
              <span style={{ cursor: "pointer" }}>□</span>
              <span style={{ cursor: "pointer" }}>▾</span>
            </div>
          </div>

          {/* Project Tree */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "6px 4px",
              fontSize: "11px",
              lineHeight: "19px",
            }}
          >
            <div>
              <div
                onClick={() => setProjectOpen(!projectOpen)}
                style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px", fontWeight: 600, cursor: "pointer" }}
              >
                {projectOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                <Boxes size={12} color="#6897bb" />
                <span>HelloWorld</span>
                <span style={{ color: "#7f8c8d", fontSize: "10px" }}>[master]</span>
              </div>

              {projectOpen && (
                <div style={{ paddingLeft: "14px" }}>
                  <div
                    onClick={() => setSrcOpen(!srcOpen)}
                    style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px", cursor: "pointer" }}
                  >
                    {srcOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    <Folder size={12} color="#f59f00" />
                    <span>src</span>
                  </div>

                  {srcOpen && (
                    <div style={{ paddingLeft: "14px" }}>
                      <div
                        onClick={() => setPkgOpen(!pkgOpen)}
                        style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px", cursor: "pointer" }}
                      >
                        {pkgOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                        <Package size={12} color="#f59f00" />
                        <span>com.example.helloworld</span>
                      </div>

                      {pkgOpen && (
                        <div style={{ paddingLeft: "16px" }}>
                          {["MainActivity.java", "NotesList.java", "NoteEdit.java"].map((file) => (
                            <div
                              key={file}
                              onClick={() => setActiveFile(file as any)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "1px 6px",
                                cursor: "pointer",
                                background: activeFile === file ? (isDark ? "#29475c" : "#cde2f8") : "transparent",
                                borderRadius: "2px",
                                fontWeight: activeFile === file ? 600 : 400,
                                color: activeFile === file ? (isDark ? "#ffffff" : "#003399") : "inherit",
                              }}
                            >
                              <FileCode size={12} color="#2f9e44" />
                              <span>{file}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <ChevronRight size={11} color="var(--ide-text-dim)" />
                    <Folder size={12} color="#f59f00" />
                    <span>gen [Generated Java Files]</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <ChevronRight size={11} color="var(--ide-text-dim)" />
                    <Boxes size={12} color="#e5c07b" />
                    <span>Android 4.4.2</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <ChevronRight size={11} color="var(--ide-text-dim)" />
                    <Boxes size={12} color="#e5c07b" />
                    <span>Android Dependencies</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <ChevronRight size={11} color="var(--ide-text-dim)" />
                    <Folder size={12} color="#f59f00" />
                    <span>assets</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <ChevronRight size={11} color="var(--ide-text-dim)" />
                    <Folder size={12} color="#f59f00" />
                    <span>res</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <FileText size={12} color="#f59f00" />
                    <span>AndroidManifest.xml</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CENTER: Java Code Canvas & Full-width Input Bar */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Editor Tab Bar */}
          <div
            style={{
              height: "25px",
              background: isDark ? "#2b2b2b" : "#e8e8e8",
              borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "4px",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "stretch", height: "100%" }}>
              {/* Active Tab */}
              <div
                style={{
                  padding: "0 12px",
                  background: isDark ? "#1e1e1e" : "#ffffff",
                  borderRight: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
                  borderLeft: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: isDark ? "#ffffff" : "#000000",
                }}
              >
                <Coffee size={11} color="#f8981d" />
                <span>{activeFile}</span>
                <span style={{ fontSize: "10px", opacity: 0.6, cursor: "pointer" }}>✕</span>
              </div>

              {/* Inactive Tabs */}
              {["NotesList.java", "NoteEdit.java"]
                .filter((f) => f !== activeFile)
                .map((file) => (
                  <div
                    key={file}
                    onClick={() => setActiveFile(file as any)}
                    style={{
                      padding: "0 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "11px",
                      color: isDark ? "#888888" : "#57606a",
                      cursor: "pointer",
                    }}
                  >
                    <span>{file}</span>
                    <span style={{ fontSize: "10px", opacity: 0.6 }}>✕</span>
                  </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "6px", paddingRight: "8px", color: isDark ? "#888888" : "#57606a" }}>
              <span style={{ cursor: "pointer" }}>_</span>
              <span style={{ cursor: "pointer" }}>□</span>
            </div>
          </div>

          {/* Java Code Canvas with Line Numbers, Live Messages Stream & Bottom Input Bar */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: isDark ? "#1e1e1e" : "#ffffff",
              overflow: "hidden",
            }}
          >
            {/* Editor Area with Gutter & Live Conversation Stream */}
            <div style={{ flex: 1, display: "flex", overflowY: "auto", fontFamily: 'Consolas, "Courier New", monospace', fontSize: "12px", lineHeight: "19px" }}>
              {/* Gutter */}
              <div
                style={{
                  width: "44px",
                  background: isDark ? "#252525" : "#f5f5f5",
                  borderRight: isDark ? "1px solid #333333" : "1px solid #e5e5e5",
                  color: isDark ? "#7f7f7f" : "#808080",
                  padding: "8px 0",
                  textAlign: "right",
                  userSelect: "none",
                  display: "flex",
                  flexDirection: "column",
                  flexShrink: 0,
                }}
              >
                {Array.from({ length: Math.max(25, 14 + messages.length * 3) }, (_, i) => i + 1).map((num) => (
                  <div key={num} style={{ paddingRight: "8px", height: "19px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "3px" }}>
                    {num === 6 && <span style={{ color: "#28a745", fontSize: "10px" }}>➔</span>}
                    {num === 10 && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3875d7", display: "inline-block" }} title="Breakpoint" />}
                    <span>{num}</span>
                  </div>
                ))}
              </div>

              {/* Code Body with Header & Live Messages Stream */}
              <div
                style={{
                  flex: 1,
                  padding: "8px 14px",
                  background: isDark ? "#1e1e1e" : "#ffffff",
                  color: isDark ? "#dfdfdf" : "#222222",
                  overflowX: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>package </span>
                  <span>com.example.helloworld;</span>
                </div>
                <div style={{ height: "6px" }}></div>
                <div>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>import </span>
                  <span style={{ color: isDark ? "#4ec9b0" : "#0000c0" }}>com.talkman.pair.RoomSession</span>;
                </div>
                <div>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>import </span>
                  <span style={{ color: isDark ? "#4ec9b0" : "#0000c0" }}>android.app.Activity</span>;
                </div>
                <div>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>import </span>
                  <span style={{ color: isDark ? "#4ec9b0" : "#0000c0" }}>android.os.Bundle</span>;
                </div>
                <div style={{ height: "6px" }}></div>
                <div>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>public class </span>
                  <span style={{ color: isDark ? "#4ec9b0" : "#000000", fontWeight: 600 }}>MainActivity </span>
                  <span style={{ color: isDark ? "#cc7832" : "#7f0055", fontWeight: "bold" }}>extends </span>
                  <span style={{ color: isDark ? "#4ec9b0" : "#0000c0" }}>Activity </span>&#123;
                </div>

                {/* Live Stream of Messages in Code Canvas (No blue box, natural comments & code) */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      paddingLeft: "20px",
                      marginTop: "6px",
                      marginBottom: "6px",
                      lineHeight: "1.5",
                      fontFamily: 'Consolas, "Courier New", monospace',
                    }}
                  >
                    <div style={{ color: isDark ? "#6a8759" : "#3f7f5f", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600, color: msg.isSelf ? "#3875d7" : (isDark ? "#ffc66d" : "#7f0055") }}>
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
                          ? (isDark ? "#ffffff" : "#000000")
                          : msg.isSelf
                          ? (isDark ? "#98c379" : "#2e7d32")
                          : (isDark ? "#dfdfdf" : "#24292e"),
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

            {/* Code Editor Interactive Full-Width Input Box matching previous design */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "6px 10px",
                borderTop: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
                background: isDark ? "#252525" : "#edf1f5",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type message or code to broadcast to room #${roomId} (Press Enter)...`}
                style={{
                  flex: 1,
                  background: isDark ? "#1e1e1e" : "#ffffff",
                  border: isDark ? "1px solid #4a4a4a" : "1px solid #b8c4d0",
                  color: isDark ? "#ffffff" : "#000000",
                  padding: "5px 10px",
                  fontSize: "12px",
                  borderRadius: "3px",
                  outline: "none",
                  fontFamily: 'Consolas, "Courier New", monospace',
                }}
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                style={{
                  background: "#3875d7",
                  color: "#ffffff",
                  border: "none",
                  padding: "5px 14px",
                  borderRadius: "3px",
                  fontWeight: 600,
                  fontSize: "11px",
                  cursor: "pointer",
                  opacity: !inputText.trim() ? 0.6 : 1,
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Outline View */}
        <div
          style={{
            width: "200px",
            background: isDark ? "#252525" : "#fafafa",
            borderLeft: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Header */}
          <div
            style={{
              height: "25px",
              background: isDark ? "#303030" : "#e8e8e8",
              borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              fontSize: "11px",
              fontWeight: 600,
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <FileText size={12} color="#4b8bf5" />
              <span>Outline</span>
            </div>
            <div style={{ display: "flex", gap: "4px", color: isDark ? "#888888" : "#57606a" }}>
              <span style={{ cursor: "pointer" }}>_</span>
              <span style={{ cursor: "pointer" }}>□</span>
            </div>
          </div>

          {/* Outline Tree */}
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 4px", fontSize: "11px", lineHeight: "19px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                <Package size={11} color="#f59f00" />
                <span>com.example.helloworld</span>
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px", fontWeight: 600 }}>
                  <span style={{ color: "#2f9e44" }}>●</span>
                  <span>MainActivity</span>
                </div>
                <div style={{ paddingLeft: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "1px 4px",
                      background: isDark ? "#29475c" : "#3399ff",
                      color: "#ffffff",
                      borderRadius: "2px",
                    }}
                  >
                    <span style={{ color: "#ff6b6b" }}>■</span>
                    <span>onCreate(Bundle)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <span style={{ color: "#2f9e44" }}>●</span>
                    <span>onResume()</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                    <span style={{ color: "#2f9e44" }}>●</span>
                    <span>onDestroy()</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM MULTI-TAB DECK (Console / Problems / Javadoc / Declaration / Participants) */}
      <div
        style={{
          height: "170px",
          background: isDark ? "#1e1e1e" : "#ffffff",
          borderTop: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Tab Headers Bar */}
        <div
          style={{
            height: "24px",
            background: isDark ? "#2c2c2c" : "#e8e8e8",
            borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            paddingLeft: "4px",
          }}
        >
          <div style={{ display: "flex", alignItems: "stretch", gap: "2px" }}>
            {[
              { id: "console", label: "Console", icon: <Terminal size={11} color="#2f9e44" /> },
              { id: "problems", label: "Problems", icon: <AlertTriangle size={11} color="#f59f00" /> },
              { id: "javadoc", label: "Javadoc", icon: <FileText size={11} color="#4b8bf5" /> },
              { id: "declaration", label: "Declaration", icon: <FileCode size={11} /> },
              { id: "participants", label: `Participants (${messages.length > 0 ? 2 : 1})`, icon: <Users size={11} color="#3875d7" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setEclipseBottomTab(tab.id as any)}
                style={{
                  padding: "0 10px",
                  background: eclipseBottomTab === tab.id ? (isDark ? "#1e1e1e" : "#ffffff") : "transparent",
                  border: eclipseBottomTab === tab.id ? (isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de") : "1px solid transparent",
                  borderBottom: "none",
                  color: eclipseBottomTab === tab.id ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#888888" : "#57606a"),
                  fontWeight: eclipseBottomTab === tab.id ? 600 : 400,
                  fontSize: "11px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {eclipseBottomTab === tab.id && <span style={{ fontSize: "9px", opacity: 0.6 }}>✕</span>}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "6px", alignItems: "center", paddingRight: "8px", color: isDark ? "#888888" : "#57606a" }}>
            <span style={{ cursor: "pointer" }}>_</span>
            <span style={{ cursor: "pointer" }}>□</span>
          </div>
        </div>

        {/* Tab Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "6px 10px",
            fontFamily: 'Consolas, "Courier New", monospace',
            fontSize: "11px",
            lineHeight: "17px",
            background: isDark ? "#1e1e1e" : "#ffffff",
          }}
        >
          {eclipseBottomTab === "console" && (
            <div>
              <div style={{ color: isDark ? "#888888" : "#57606a" }}>
                &lt;terminated&gt; MainActivity [Android Application] /android-sdk/platform-tools/adb ({new Date().toLocaleTimeString()})
              </div>
              <div style={{ color: isDark ? "#80b0ff" : "#0000c0" }}>[TalkMan] Android Pair Engine Initialized.</div>
              <div>[TalkMan] Listening on Room #{roomId}</div>
              <div style={{ color: "#2f9e44", fontWeight: 600, marginTop: "4px" }}>
                ● TalkMan Stream: {wsConnected ? "Connected (ws://localhost:8080)" : "Local Standalone Active"}
              </div>
            </div>
          )}

          {eclipseBottomTab === "participants" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: isDark ? "1px solid #3c3c3c" : "1px solid #e0e0e0", paddingBottom: "4px" }}>
                <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000" }}>ECLIPSE PAIR SESSION PARTICIPANTS</span>
                <span style={{ color: "#2f9e44", fontWeight: 600 }}>● {wsConnected ? "CONNECTED" : "STANDALONE"}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "4px 8px",
                  background: isDark ? "#252525" : "#f8f9fa",
                  border: isDark ? "1px solid #3c3c3c" : "1px solid #e0e0e0",
                  borderRadius: "3px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2f9e44", display: "inline-block" }} />
                  <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#24292e" }}>You (Host)</span>
                  <span style={{ fontSize: "10px", color: isDark ? "#888888" : "#57606a" }}>[Developer]</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: isDark ? "#888888" : "#57606a" }}>
                  <span style={{ background: isDark ? "#20354b" : "#e9ecef", padding: "1px 6px", borderRadius: "2px", color: "#80b0ff", fontWeight: 600 }}>Eclipse IDE</span>
                  <span>Online • 0ms</span>
                </div>
              </div>

              {/* Session Details + Copy Code */}
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ flex: 1, padding: "4px 8px", background: isDark ? "#252525" : "#f8f9fa", border: isDark ? "1px solid #3c3c3c" : "1px solid #e0e0e0", borderRadius: "3px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", rowGap: "2px", fontSize: "10px" }}>
                    <span style={{ color: isDark ? "#888888" : "#57606a" }}>Room ID:</span>
                    <span style={{ fontWeight: 600, color: "#3875d7" }}>#{roomId}</span>
                    <span style={{ color: isDark ? "#888888" : "#57606a" }}>Java Runtime:</span>
                    <span>OpenJDK 17 / Eclipse JDT</span>
                  </div>
                </div>

                <button
                  onClick={copyRoomCode}
                  style={{
                    background: isDark ? "#303030" : "#e9ecef",
                    border: isDark ? "1px solid #3c3c3c" : "1px solid #b8c4d0",
                    color: isDark ? "#ffffff" : "#24292e",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    fontSize: "10px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {copiedCode ? <><Check size={11} color="#2f9e44" /> Copied</> : <><Copy size={11} /> Copy Code</>}
                </button>
              </div>
            </div>
          )}

          {eclipseBottomTab === "problems" && (
            <div style={{ color: "#2f9e44" }}>0 errors, 0 warnings (No compilation errors in workspace).</div>
          )}

          {eclipseBottomTab === "javadoc" && (
            <div style={{ color: isDark ? "#888888" : "#57606a" }}>
              No Javadoc attached for the current selected symbol.
            </div>
          )}

          {eclipseBottomTab === "declaration" && (
            <div style={{ color: isDark ? "#888888" : "#57606a" }}>
              public class MainActivity extends Activity
            </div>
          )}
        </div>
      </div>

      {/* 6. BOTTOM STATUS BAR (Writable | Smart Insert | 30:27:1101 | 💡) */}
      <div
        style={{
          height: "22px",
          background: isDark ? "#2c2c2c" : "#e8e8e8",
          borderTop: isDark ? "1px solid #3c3c3c" : "1px solid #d0d7de",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 10px",
          fontSize: "11px",
          color: isDark ? "#999999" : "#24292e",
          gap: "16px",
          flexShrink: 0,
        }}
      >
        <span>Writable</span>
        <div style={{ width: "1px", height: "12px", background: isDark ? "#3c3c3c" : "#c0c0c0" }} />
        <span>Smart Insert</span>
        <div style={{ width: "1px", height: "12px", background: isDark ? "#3c3c3c" : "#c0c0c0" }} />
        <span>{isDark ? "30 : 27 : 1101" : "34 : 29 : 1231"}</span>
        <div style={{ width: "1px", height: "12px", background: isDark ? "#3c3c3c" : "#c0c0c0" }} />
        <span title="Quick Assist available">💡</span>
      </div>
    </div>
  );
}
