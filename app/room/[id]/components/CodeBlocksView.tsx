"use client";

import React, { useState } from "react";
import {
  Search,
  Play,
  Hammer,
  RotateCcw,
  RotateCw,
  Scissors,
  Copy,
  Clipboard,
  Save,
  Printer,
  X,
  XCircle,
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  AlertTriangle,
  Users,
  Check,
  ChevronRight,
  ChevronDown,
  Code2,
  Settings,
  HelpCircle,
  Bug,
  Boxes,
  FolderTree,
  PlusSquare,
  Globe,
  StepForward,
  CornerDownRight,
  CornerUpRight,
  Square,
  CircleDot,
  Files,
} from "lucide-react";
import TopControls from "./TopControls";
import { IDEProps } from "./types";

export default function CodeBlocksView({
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
  const [codeblocksBottomTab, setCodeblocksBottomTab] = useState<
    "codeblocks" | "participants" | "buildlog" | "buildmessages" | "debugger" | "search"
  >("codeblocks");
  const [leftTab, setLeftTab] = useState<"projects" | "symbols" | "files">("projects");
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [headersOpen, setHeadersOpen] = useState(true);
  const [activeFile, setActiveFile] = useState<"Start here" | "main.cpp" | "Session.cpp" | "Session.h">("main.cpp");

  const isDark = mode === "dark";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: isDark ? "#1e2227" : "#ece9d8",
        color: isDark ? "#abb2bf" : "#24292e",
        fontSize: "12px",
        fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
      }}
    >
      {/* 1. Code::Blocks Main Titlebar (Strict 38px Height matching VS Code, Eclipse, IntelliJ) */}
      <div
        style={{
          height: "38px",
          background: isDark ? "#24282f" : "#e0dfdf",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          borderBottom: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
          fontSize: "12px",
          flexShrink: 0,
        }}
      >
        {/* Left Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "260px" }}>
          {/* Authentic 4-cube Code::Blocks Logo */}
          <div
            style={{
              width: "18px",
              height: "18px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              padding: "1px",
              background: isDark ? "#1e2227" : "#ffffff",
              borderRadius: "3px",
              boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.5)" : "0 1px 2px rgba(0,0,0,0.2)",
              flexShrink: 0,
            }}
          >
            <div style={{ background: "#e03131", borderRadius: "1px" }} />
            <div style={{ background: "#2f9e44", borderRadius: "1px" }} />
            <div style={{ background: "#f59f00", borderRadius: "1px" }} />
            <div style={{ background: "#9c36b5", borderRadius: "1px" }} />
          </div>

          <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000", fontSize: "12px", whiteSpace: "nowrap" }}>
            {activeFile} - Code::Blocks 20.03
          </span>
          <span
            style={{
              fontSize: "11px",
              color: isDark ? "#848d9c" : "#555555",
              background: isDark ? "#2b313a" : "#d0d0d0",
              padding: "1px 6px",
              borderRadius: "3px",
              border: isDark ? "1px solid #3e4451" : "1px solid #bfbfbf",
              whiteSpace: "nowrap",
            }}
          >
            [TalkManApp] • Room #{roomId}
          </span>
        </div>

        {/* Center Search / Status Bar */}
        <div
          style={{
            background: isDark ? "#1e2227" : "#ffffff",
            border: isDark ? "1px solid #3e4451" : "1px solid #b8b8b8",
            borderRadius: "5px",
            padding: "3px 14px",
            fontSize: "11px",
            color: isDark ? "#abb2bf" : "#24292e",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: "240px",
            justifyContent: "center",
          }}
        >
          <Search size={12} style={{ opacity: 0.6 }} />
          <span style={{ opacity: 0.7 }}>Code::Blocks Pair Session</span>
          <span style={{ color: isDark ? "#61afef" : "#0366d6", fontWeight: 600 }}>GNU GCC / MinGW</span>
        </div>

        {/* Right Section: Global IDE Top Controls */}
        <TopControls
          currentTheme="codeblocks"
          setEditor={setEditor}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* 2. Menu Bar (Classic Native wxWidgets style) */}
      <div
        style={{
          height: "23px",
          background: isDark ? "#282c34" : "#f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          fontSize: "11px",
          borderBottom: isDark ? "1px solid #353b45" : "1px solid #d0d0d0",
          color: isDark ? "#abb2bf" : "#24292e",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        {["File", "Edit", "View", "Search", "Project", "Build", "Debug", "wxSmith", "Tools", "Plugins", "Settings", "Help"].map(
          (m, idx) => (
            <div
              key={idx}
              style={{
                padding: "2px 6px",
                cursor: "pointer",
                borderRadius: "2px",
                transition: "background 0.1s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#3e4451" : "#dcdcdc")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {m}
            </div>
          )
        )}
      </div>

      {/* 3. Multi-row Toolbars (wxAUI Grab-handle style) */}
      {/* Toolbar Row 1: File & Edit Actions + Search Box */}
      <div
        style={{
          height: "28px",
          background: isDark ? "#24282f" : "#ebe9ed",
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          borderBottom: isDark ? "1px solid #333842" : "1px solid #dcdcdc",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        {/* Grip Handle */}
        <span style={{ color: isDark ? "#5c6370" : "#999999", fontSize: "14px", paddingRight: "4px", cursor: "grab" }}>⋮⋮</span>

        {/* Action icons */}
        <button
          title="New file / project"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <FileCode size={13} color="#2f9e44" />
          <span style={{ fontSize: "8px" }}>▾</span>
        </button>

        <button
          title="Open (Ctrl-O)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Folder size={13} color="#f59f00" />
        </button>

        <button
          title="Save active file (Ctrl-S)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Save size={13} color="#4b8bf5" />
        </button>

        <button
          title="Save all files (Ctrl-Shift-S)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Files size={13} color="#f59f00" />
        </button>

        <button
          title="Close active file (Ctrl-F4)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <X size={13} color="#e03131" />
        </button>

        <button
          title="Close all files (Ctrl-Shift-F4)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <XCircle size={13} color="#e03131" />
        </button>

        <button
          title="Print"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Printer size={13} style={{ opacity: 0.7 }} />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3e4451" : "#c8c8c8", margin: "0 4px" }} />

        {/* Edit tools */}
        <button
          title="Undo (Ctrl-Z)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RotateCcw size={13} color="#4b8bf5" />
        </button>

        <button
          title="Redo (Ctrl-Y)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RotateCw size={13} color="#4b8bf5" />
        </button>

        <button
          title="Cut (Ctrl-X)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Scissors size={13} style={{ opacity: 0.7 }} />
        </button>

        <button
          title="Copy (Ctrl-C)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Copy size={13} style={{ opacity: 0.7 }} />
        </button>

        <button
          title="Paste (Ctrl-V)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Clipboard size={13} style={{ opacity: 0.7 }} />
        </button>

        <button
          title="Find (Ctrl-F)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search size={13} color="#3875d7" />
        </button>

        <button
          title="Replace (Ctrl-R)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: isDark ? "#abb2bf" : "#24292e",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RotateCw size={13} color="#f59f00" />
        </button>

        {/* Toolbar Search Input */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: isDark ? "#1e2227" : "#ffffff",
              border: isDark ? "1px solid #3e4451" : "1px solid #b8b8b8",
              borderRadius: "2px",
              padding: "1px 6px",
              height: "20px",
              fontSize: "11px",
            }}
          >
            <Search size={11} style={{ marginRight: "4px", opacity: 0.6 }} />
            <input
              placeholder="Find in files..."
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: isDark ? "#abb2bf" : "#24292e",
                fontSize: "11px",
                width: "140px",
              }}
            />
            <span style={{ fontSize: "9px", opacity: 0.6 }}>▾</span>
          </div>
        </div>
      </div>

      {/* Toolbar Row 2: Build & Debug Toolbar */}
      <div
        style={{
          height: "28px",
          background: isDark ? "#24282f" : "#ebe9ed",
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          borderBottom: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        {/* Grip Handle */}
        <span style={{ color: isDark ? "#5c6370" : "#999999", fontSize: "14px", paddingRight: "4px", cursor: "grab" }}>⋮⋮</span>

        {/* Build (Gear) */}
        <button
          title="Build (Ctrl-F9)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "#f59f00",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
            fontWeight: 600,
          }}
        >
          <Hammer size={13} color="#f59f00" />
        </button>

        {/* Run (Green Play) */}
        <button
          title="Run (Ctrl-F10)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "#2f9e44",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Play size={13} fill="#2f9e44" color="#2f9e44" />
        </button>

        {/* Build & Run */}
        <button
          title="Build and run (F9)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "1px",
          }}
        >
          <Hammer size={12} color="#f59f00" />
          <Play size={10} fill="#2f9e44" color="#2f9e44" />
        </button>

        {/* Rebuild */}
        <button
          title="Rebuild (Ctrl-F11)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "#f59f00",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RotateCw size={13} color="#f59f00" />
        </button>

        {/* Abort / Stop */}
        <button
          title="Abort"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            color: "#e03131",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <XCircle size={13} color="#e03131" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3e4451" : "#c8c8c8", margin: "0 4px" }} />

        {/* Build target dropdown */}
        <span style={{ fontSize: "11px", opacity: 0.7, marginRight: "4px" }}>Build target:</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: isDark ? "#1e2227" : "#ffffff",
            border: isDark ? "1px solid #3e4451" : "1px solid #b8b8b8",
            borderRadius: "2px",
            padding: "1px 8px",
            height: "20px",
            fontSize: "11px",
            cursor: "pointer",
            gap: "8px",
          }}
        >
          <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000" }}>Debug (TalkMan Pair)</span>
          <span style={{ fontSize: "9px", opacity: 0.7 }}>▾</span>
        </div>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3e4451" : "#c8c8c8", margin: "0 4px" }} />

        {/* Debug Controls */}
        <button
          title="Start / Continue debugger (F8)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <Bug size={13} color="#2f9e44" />
          <Play size={9} fill="#2f9e44" color="#2f9e44" />
        </button>

        <button
          title="Step over (F7)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <StepForward size={13} color="#4b8bf5" />
        </button>

        <button
          title="Step into (Shift-F7)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CornerDownRight size={13} color="#f59f00" />
        </button>

        <button
          title="Step out (Ctrl-Shift-F7)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CornerUpRight size={13} color="#f59f00" />
        </button>

        <button
          title="Toggle breakpoint (F5)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircleDot size={13} color="#e03131" />
        </button>

        <button
          title="Stop debugger (Shift-F8)"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Square size={12} fill="#e03131" color="#e03131" />
        </button>

        <div style={{ width: "1px", height: "16px", background: isDark ? "#3e4451" : "#c8c8c8", margin: "0 4px" }} />

        {/* Tools & wxSmith */}
        <button
          title="wxSmith GUI designer"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Code2 size={13} color="#9c36b5" />
        </button>

        <button
          title="Compiler settings"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Settings size={13} style={{ opacity: 0.7 }} />
        </button>

        <button
          title="Help"
          style={{
            background: "transparent",
            border: "1px solid transparent",
            padding: "2px 4px",
            cursor: "pointer",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HelpCircle size={13} color="#3875d7" />
        </button>
      </div>

      {/* 4. MAIN WORKSPACE (Management Left Panel + Editor Center + Logs Bottom) */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* LEFT PANEL: Management (Projects / Symbols / Files) */}
        <div
          style={{
            width: "230px",
            background: isDark ? "#21252b" : "#f5f5f5",
            borderRight: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              height: "22px",
              background: isDark ? "#282c34" : "#e4e2e6",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 8px",
              borderBottom: isDark ? "1px solid #353b45" : "1px solid #c8c8c8",
              fontSize: "11px",
              fontWeight: 600,
              color: isDark ? "#ffffff" : "#000000",
            }}
          >
            <span>Management</span>
            <button
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isDark ? "#848d9c" : "#555555",
                fontSize: "11px",
                padding: "0 2px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Sub-tabs: Projects / Symbols / Files */}
          <div
            style={{
              height: "22px",
              background: isDark ? "#1e2227" : "#ebe9ed",
              display: "flex",
              alignItems: "center",
              borderBottom: isDark ? "1px solid #333842" : "1px solid #c8c8c8",
              padding: "0 4px",
              gap: "2px",
            }}
          >
            <button
              onClick={() => setLeftTab("projects")}
              style={{
                background: leftTab === "projects" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                border: leftTab === "projects" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 8px",
                fontSize: "11px",
                fontWeight: leftTab === "projects" ? 600 : 400,
                color: leftTab === "projects" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              Projects
            </button>
            <button
              onClick={() => setLeftTab("symbols")}
              style={{
                background: leftTab === "symbols" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                border: leftTab === "symbols" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 8px",
                fontSize: "11px",
                fontWeight: leftTab === "symbols" ? 600 : 400,
                color: leftTab === "symbols" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              Symbols
            </button>
            <button
              onClick={() => setLeftTab("files")}
              style={{
                background: leftTab === "files" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                border: leftTab === "files" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 8px",
                fontSize: "11px",
                fontWeight: leftTab === "files" ? 600 : 400,
                color: leftTab === "files" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              Files
            </button>
          </div>

          {/* Tree View */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "6px 4px",
              fontSize: "11px",
              lineHeight: "18px",
              fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* Workspace Root */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px", fontWeight: 600 }}>
              <ChevronDown size={11} style={{ opacity: 0.6 }} />
              <Boxes size={12} color="#4b8bf5" />
              <span>Workspace</span>
            </div>

            {/* TalkMan Project */}
            <div style={{ paddingLeft: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "1px 4px",
                  fontWeight: 600,
                  color: isDark ? "#61afef" : "#1a5fb4",
                }}
              >
                <ChevronDown size={11} style={{ opacity: 0.6 }} />
                <FolderTree size={12} color="#f59f00" />
                <span>TalkManApp (Active)</span>
              </div>

              {/* Sources Folder */}
              <div style={{ paddingLeft: "14px" }}>
                <div
                  onClick={() => setSourcesOpen(!sourcesOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "1px 4px",
                    cursor: "pointer",
                  }}
                >
                  {sourcesOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} color="#f59f00" />
                  <span>Sources (2)</span>
                </div>

                {sourcesOpen && (
                  <div style={{ paddingLeft: "16px" }}>
                    <div
                      onClick={() => setActiveFile("main.cpp")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "1px 6px",
                        cursor: "pointer",
                        background: activeFile === "main.cpp" ? (isDark ? "#2c313c" : "#e0e8f5") : "transparent",
                        borderRadius: "2px",
                        fontWeight: activeFile === "main.cpp" ? 600 : 400,
                        color: activeFile === "main.cpp" ? (isDark ? "#98c379" : "#1e7e34") : "inherit",
                      }}
                    >
                      <FileCode size={12} color="#2f9e44" />
                      <span>main.cpp</span>
                    </div>

                    <div
                      onClick={() => setActiveFile("Session.cpp")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "1px 6px",
                        cursor: "pointer",
                        background: activeFile === "Session.cpp" ? (isDark ? "#2c313c" : "#e0e8f5") : "transparent",
                        borderRadius: "2px",
                        fontWeight: activeFile === "Session.cpp" ? 600 : 400,
                        color: activeFile === "Session.cpp" ? (isDark ? "#98c379" : "#1e7e34") : "inherit",
                      }}
                    >
                      <FileCode size={12} color="#2f9e44" />
                      <span>Session.cpp</span>
                    </div>
                  </div>
                )}

                {/* Headers Folder */}
                <div
                  onClick={() => setHeadersOpen(!headersOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "1px 4px",
                    cursor: "pointer",
                  }}
                >
                  {headersOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                  <Folder size={12} color="#f59f00" />
                  <span>Headers (1)</span>
                </div>

                {headersOpen && (
                  <div style={{ paddingLeft: "16px" }}>
                    <div
                      onClick={() => setActiveFile("Session.h")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "1px 6px",
                        cursor: "pointer",
                        background: activeFile === "Session.h" ? (isDark ? "#2c313c" : "#e0e8f5") : "transparent",
                        borderRadius: "2px",
                        fontWeight: activeFile === "Session.h" ? 600 : 400,
                        color: activeFile === "Session.h" ? (isDark ? "#61afef" : "#0d6efd") : "inherit",
                      }}
                    >
                      <FileText size={12} color="#4b8bf5" />
                      <span>Session.h</span>
                    </div>
                  </div>
                )}

                {/* Resources Folder */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", padding: "1px 4px" }}>
                  <ChevronRight size={11} style={{ opacity: 0.6 }} />
                  <Folder size={12} color="#f59f00" />
                  <span>Resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER + BOTTOM DOCK */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Editor Header Tab Bar */}
          <div
            style={{
              height: "26px",
              background: isDark ? "#1e2227" : "#ebe9ed",
              borderBottom: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
              display: "flex",
              alignItems: "center",
              padding: "0 4px",
              gap: "2px",
              flexShrink: 0,
            }}
          >
            {/* Start here Tab */}
            <div
              onClick={() => setActiveFile("Start here")}
              style={{
                height: "23px",
                background: activeFile === "Start here" ? (isDark ? "#282c34" : "#ffffff") : "transparent",
                border: activeFile === "Start here" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "3px 3px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 10px",
                fontSize: "11px",
                fontWeight: activeFile === "Start here" ? 600 : 400,
                color: activeFile === "Start here" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              <span>Start here</span>
              <X size={11} style={{ opacity: 0.6 }} />
            </div>

            {/* main.cpp Tab */}
            <div
              onClick={() => setActiveFile("main.cpp")}
              style={{
                height: "23px",
                background: activeFile === "main.cpp" ? (isDark ? "#282c34" : "#ffffff") : "transparent",
                border: activeFile === "main.cpp" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "3px 3px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 10px",
                fontSize: "11px",
                fontWeight: activeFile === "main.cpp" ? 600 : 400,
                color: activeFile === "main.cpp" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              <FileCode size={12} color="#2f9e44" />
              <span>main.cpp</span>
              <X size={11} style={{ opacity: 0.6 }} />
            </div>

            {/* Session.h Tab */}
            <div
              onClick={() => setActiveFile("Session.h")}
              style={{
                height: "23px",
                background: activeFile === "Session.h" ? (isDark ? "#282c34" : "#ffffff") : "transparent",
                border: activeFile === "Session.h" ? (isDark ? "1px solid #333842" : "1px solid #b8b8b8") : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "3px 3px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "0 10px",
                fontSize: "11px",
                fontWeight: activeFile === "Session.h" ? 600 : 400,
                color: activeFile === "Session.h" ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                cursor: "pointer",
              }}
            >
              <FileText size={12} color="#4b8bf5" />
              <span>Session.h</span>
              <X size={11} style={{ opacity: 0.6 }} />
            </div>

            {/* Tab navigation arrows */}
            <div style={{ marginLeft: "auto", display: "flex", gap: "2px", paddingRight: "4px" }}>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isDark ? "#848d9c" : "#555555",
                  padding: "0 2px",
                }}
              >
                ◀
              </button>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isDark ? "#848d9c" : "#555555",
                  padding: "0 2px",
                }}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Scope bar / Function selector */}
          {activeFile !== "Start here" && (
            <div
              style={{
                height: "20px",
                background: isDark ? "#21252b" : "#f3f3f3",
                borderBottom: isDark ? "1px solid #2c313c" : "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                padding: "0 10px",
                fontSize: "10px",
                color: isDark ? "#848d9c" : "#555555",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <span>Scope:</span>
              <span style={{ color: isDark ? "#61afef" : "#0d6efd", fontWeight: 600 }}>
                {activeFile === "main.cpp"
                  ? "main(int argc, char* argv[]) : int"
                  : activeFile === "Session.h"
                    ? "class Session { ... }"
                    : "Session::connect(const std::string& url)"}
              </span>
            </div>
          )}

          {/* 5. CENTER CONTENT: Either Start Here Splash or Code Canvas with Natural Stream & Bottom Input Form */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: isDark ? "#1e2227" : "#ffffff",
              overflow: "hidden",
            }}
          >
            {activeFile === "Start here" ? (
              /* Iconic Code::Blocks Start Here Screen */
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  background: isDark ? "#1e2227" : "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "30px 20px",
                }}
              >
                {/* Splash Logo Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                  {/* 4 3D Cubes */}
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px",
                      padding: "3px",
                      background: isDark ? "#282c34" : "#ffffff",
                      borderRadius: "6px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}
                  >
                    <div style={{ background: "#e03131", borderRadius: "2px" }} />
                    <div style={{ background: "#2f9e44", borderRadius: "2px" }} />
                    <div style={{ background: "#f59f00", borderRadius: "2px" }} />
                    <div style={{ background: "#9c36b5", borderRadius: "2px" }} />
                  </div>

                  <div>
                    <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px", color: isDark ? "#ffffff" : "#000000" }}>
                      Code::Blocks
                    </div>
                    <div style={{ fontSize: "12px", fontStyle: "italic", color: isDark ? "#848d9c" : "#555555" }}>
                      The open source, cross-platform IDE • http://www.codeblocks.org
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: isDark ? "#848d9c" : "#555555",
                    borderBottom: isDark ? "1px solid #333842" : "1px solid #e0e0e0",
                    paddingBottom: "12px",
                    width: "100%",
                    maxWidth: "550px",
                    textAlign: "center",
                    marginBottom: "24px",
                  }}
                >
                  Release 20.03 (GCC 13.2 MinGW-w64 / Unicode) • TalkMan Pair Session #{roomId}
                </div>

                {/* Action Links Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    width: "100%",
                    maxWidth: "550px",
                  }}
                >
                  {/* Left Column: Quick Actions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div
                      onClick={() => setActiveFile("main.cpp")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "6px 8px",
                        borderRadius: "4px",
                        transition: "background 0.1s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#282c34" : "#f0f4f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <PlusSquare size={18} color="#4b8bf5" />
                      <span style={{ color: isDark ? "#61afef" : "#0366d6", fontWeight: 600 }}>
                        Open main.cpp (Pair Editor)
                      </span>
                    </div>

                    <div
                      onClick={() => setActiveFile("Session.h")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "6px 8px",
                        borderRadius: "4px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#282c34" : "#f0f4f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <FolderOpen size={18} color="#f59f00" />
                      <span style={{ color: isDark ? "#61afef" : "#0366d6", fontWeight: 600 }}>
                        View Session.h
                      </span>
                    </div>

                    <div
                      onClick={() => setCodeblocksBottomTab("participants")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "6px 8px",
                        borderRadius: "4px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#282c34" : "#f0f4f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Globe size={18} color="#2f9e44" />
                      <span style={{ color: isDark ? "#61afef" : "#0366d6", fontWeight: 600 }}>
                        View Connected Participants ({messages.length} messages)
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Recent Projects */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: isDark ? "#848d9c" : "#555555", marginBottom: "4px" }}>
                      Recent projects
                    </div>
                    <div
                      onClick={() => setActiveFile("main.cpp")}
                      style={{
                        padding: "4px 8px",
                        background: isDark ? "#24282f" : "#f8f9fa",
                        border: isDark ? "1px solid #333842" : "1px solid #e0e0e0",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000" }}>TalkManApp.cbp</div>
                      <div style={{ fontSize: "10px", color: isDark ? "#848d9c" : "#555555" }}>Active Pair Session • Room #{roomId}</div>
                    </div>

                    <div style={{ fontSize: "11px", fontWeight: 700, color: isDark ? "#848d9c" : "#555555", marginTop: "8px", marginBottom: "4px" }}>
                      Recent files
                    </div>
                    <div
                      onClick={() => setActiveFile("main.cpp")}
                      style={{ fontSize: "11px", color: isDark ? "#61afef" : "#0366d6", cursor: "pointer", paddingLeft: "8px" }}
                    >
                      • main.cpp
                    </div>
                    <div
                      onClick={() => setActiveFile("Session.h")}
                      style={{ fontSize: "11px", color: isDark ? "#61afef" : "#0366d6", cursor: "pointer", paddingLeft: "8px" }}
                    >
                      • Session.h
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* C++ Code Canvas with Natural Message Stream */
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  background: isDark ? "#1e2227" : "#ffffff",
                  overflowY: "auto",
                  fontFamily: 'Consolas, "Fira Code", Monaco, monospace',
                  fontSize: "12px",
                  lineHeight: "19px",
                }}
              >
                {/* Gutter / Margin (Line numbers + Fold markers) */}
                <div
                  style={{
                    width: "48px",
                    background: isDark ? "#21252b" : "#f0f0f0",
                    borderRight: isDark ? "1px solid #282c34" : "1px solid #e0e0e0",
                    padding: "8px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    paddingRight: "8px",
                    color: isDark ? "#5c6370" : "#999999",
                    userSelect: "none",
                    flexShrink: 0,
                  }}
                >
                  {Array.from({ length: Math.max(25, 14 + messages.length * 3) }, (_, i) => i + 1).map((num) => (
                    <div key={num} style={{ height: "19px", display: "flex", alignItems: "center", gap: "4px" }}>
                      {(num === 8 || num === 14) && (
                        <span style={{ fontSize: "8px", color: isDark ? "#828997" : "#666666", cursor: "pointer" }}>
                          [-]
                        </span>
                      )}
                      {num === 5 && <span style={{ color: "#28a745", fontSize: "10px" }}>➔</span>}
                      {num === 9 && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#e03131", display: "inline-block" }} title="Breakpoint" />}
                      <span>{num}</span>
                    </div>
                  ))}
                </div>

                {/* Code Content Area */}
                <div
                  style={{
                    flex: 1,
                    padding: "8px 14px",
                    color: isDark ? "#abb2bf" : "#24292e",
                    overflowX: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {activeFile === "main.cpp" && (
                    <>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#include </span>
                        <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&lt;iostream&gt;</span>
                      </div>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#include </span>
                        <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&lt;string&gt;</span>
                      </div>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#include </span>
                        <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&quot;Session.h&quot;</span>
                      </div>
                      <div style={{ height: "6px" }} />
                      <div>
                        <span style={{ color: isDark ? "#c678dd" : "#6f42c1", fontWeight: 600 }}>using namespace </span>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std</span>;
                      </div>
                      <div style={{ height: "6px" }} />
                      <div>
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49", fontWeight: 600 }}>int </span>
                        <span style={{ color: isDark ? "#61afef" : "#005cc5", fontWeight: 600 }}>main</span>(
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>int </span>
                        <span style={{ color: isDark ? "#abb2bf" : "#24292e" }}>argc</span>,{" "}
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>char</span>*{" "}
                        <span style={{ color: isDark ? "#abb2bf" : "#24292e" }}>argv</span>[]) &#123;
                      </div>
                      <div style={{ paddingLeft: "18px" }}>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>cout </span>
                        &lt;&lt; <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&quot;[TalkMan] Connected to #{roomId} via Code::Blocks&quot; </span>
                        &lt;&lt; <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>endl</span>;
                      </div>

                      {/* Live Stream of Messages in Code Canvas (Natural code comments format without blue box) */}
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
                          <div style={{ color: isDark ? "#98c379" : "#22863a", fontSize: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontWeight: 600, color: msg.isSelf ? (isDark ? "#61afef" : "#0366d6") : (isDark ? "#e5c07b" : "#b26b00") }}>
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
                                : (isDark ? "#abb2bf" : "#24292e"),
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}

                      <div ref={messagesEndRef} />

                      <div style={{ paddingLeft: "18px", marginTop: "4px" }}>
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49", fontWeight: 600 }}>return </span>
                        <span style={{ color: isDark ? "#d19a66" : "#005cc5" }}>0</span>;
                      </div>
                      <div>&#125;</div>
                    </>
                  )}

                  {activeFile === "Session.h" && (
                    <>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#pragma once</span>
                      </div>
                      <div style={{ height: "6px" }} />
                      <div>
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49", fontWeight: 600 }}>class </span>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1", fontWeight: 600 }}>Session </span>&#123;
                      </div>
                      <div style={{ paddingLeft: "18px" }}>
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49", fontWeight: 600 }}>public</span>:
                      </div>
                      <div style={{ paddingLeft: "36px" }}>
                        <span style={{ color: isDark ? "#61afef" : "#005cc5" }}>Session</span>(
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>const </span>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std::string</span>&amp; roomId);
                      </div>
                      <div style={{ paddingLeft: "36px" }}>
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>void </span>
                        <span style={{ color: isDark ? "#61afef" : "#005cc5" }}>connect</span>(
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>const </span>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std::string</span>&amp; wsUrl);
                      </div>
                      <div>&#125;;</div>
                    </>
                  )}

                  {activeFile === "Session.cpp" && (
                    <>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#include </span>
                        <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&quot;Session.h&quot;</span>
                      </div>
                      <div>
                        <span style={{ color: isDark ? "#e06c75" : "#d73a49", fontWeight: 600 }}>#include </span>
                        <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&lt;iostream&gt;</span>
                      </div>
                      <div style={{ height: "6px" }} />
                      <div>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>Session</span>::
                        <span style={{ color: isDark ? "#61afef" : "#005cc5" }}>Session</span>(
                        <span style={{ color: isDark ? "#c678dd" : "#d73a49" }}>const </span>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std::string</span>&amp; roomId) &#123;
                      </div>
                      <div style={{ paddingLeft: "18px" }}>
                        <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std::cout </span>
                        &lt;&lt; <span style={{ color: isDark ? "#98c379" : "#22863a" }}>&quot;Initialized pair session for: &quot; </span>
                        &lt;&lt; roomId &lt;&lt; <span style={{ color: isDark ? "#e5c07b" : "#6f42c1" }}>std::endl</span>;
                      </div>
                      <div>&#125;</div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Code Editor Interactive Full-Width Input Box matching previous design */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: "6px 10px",
                borderTop: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
                background: isDark ? "#21252b" : "#ebe9ed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type message or C++ code to broadcast to room #${roomId} (Press Enter)...`}
                style={{
                  flex: 1,
                  background: isDark ? "#1e2227" : "#ffffff",
                  border: isDark ? "1px solid #3e4451" : "1px solid #b8b8b8",
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
                  background: isDark ? "#2f9e44" : "#28a745",
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

          {/* 6. BOTTOM PANEL: Logs & others (Code::Blocks, Participants, Build log, Build messages, Debugger) */}
          <div
            style={{
              height: "175px",
              background: isDark ? "#21252b" : "#f5f5f5",
              borderTop: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            {/* Panel Title Bar */}
            <div
              style={{
                height: "22px",
                background: isDark ? "#282c34" : "#e4e2e6",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
                borderBottom: isDark ? "1px solid #353b45" : "1px solid #c8c8c8",
                fontSize: "11px",
                fontWeight: 600,
                color: isDark ? "#ffffff" : "#000000",
              }}
            >
              <span>Logs &amp; others</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ cursor: "pointer", color: isDark ? "#848d9c" : "#555555" }}>_</span>
                <span style={{ cursor: "pointer", color: isDark ? "#848d9c" : "#555555" }}>✕</span>
              </div>
            </div>

            {/* Bottom Tabs */}
            <div
              style={{
                height: "22px",
                background: isDark ? "#1e2227" : "#ebe9ed",
                display: "flex",
                alignItems: "center",
                borderBottom: isDark ? "1px solid #333842" : "1px solid #c8c8c8",
                padding: "0 4px",
                gap: "2px",
              }}
            >
              {[
                { id: "codeblocks", label: "Code::Blocks", icon: <FileText size={11} color="#f59f00" /> },
                { id: "participants", label: `Participants (${messages.length > 0 ? 2 : 1})`, icon: <Users size={11} color="#4b8bf5" /> },
                { id: "buildlog", label: "Build log", icon: <Hammer size={11} color="#2f9e44" /> },
                { id: "buildmessages", label: "Build messages", icon: <AlertTriangle size={11} color="#f59f00" /> },
                { id: "debugger", label: "Debugger", icon: <Bug size={11} color="#e03131" /> },
                { id: "search", label: "Search results", icon: <Search size={11} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCodeblocksBottomTab(tab.id as any)}
                  style={{
                    background: codeblocksBottomTab === tab.id ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                    border:
                      codeblocksBottomTab === tab.id
                        ? isDark
                          ? "1px solid #333842"
                          : "1px solid #b8b8b8"
                        : "1px solid transparent",
                    borderBottom: "none",
                    borderRadius: "2px 2px 0 0",
                    padding: "1px 8px",
                    fontSize: "11px",
                    fontWeight: codeblocksBottomTab === tab.id ? 600 : 400,
                    color: codeblocksBottomTab === tab.id ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#848d9c" : "#555555"),
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Bottom Content Area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "6px 10px",
                fontFamily: 'Consolas, "Fira Code", Monaco, monospace',
                fontSize: "11px",
                lineHeight: "17px",
                background: isDark ? "#17191d" : "#ffffff",
                color: isDark ? "#abb2bf" : "#24292e",
              }}
            >
              {codeblocksBottomTab === "codeblocks" && (
                <div>
                  <div style={{ color: isDark ? "#848d9c" : "#666666" }}>WindowsXPLookNFeel</div>
                  <div style={{ color: isDark ? "#848d9c" : "#666666" }}>Running startup script</div>
                  <div style={{ color: isDark ? "#848d9c" : "#666666" }}>
                    Script/function &apos;edit_startup_script.script&apos; registered under menu &apos;&amp;Settings/-Edit startup script&apos;
                  </div>
                  <div style={{ color: "#2f9e44", fontWeight: 600, marginTop: "2px" }}>
                    TalkMan Pair Stream: {wsConnected ? "Connected (ws://localhost:8080)" : "Local Standalone Active"}
                  </div>
                  <div style={{ color: isDark ? "#61afef" : "#0366d6" }}>
                    Room ID: #{roomId} (Compiler: GNU GCC MinGW x64 Active)
                  </div>
                </div>
              )}

              {codeblocksBottomTab === "participants" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: isDark ? "1px solid #282c34" : "1px solid #e0e0e0", paddingBottom: "4px" }}>
                    <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000" }}>ACTIVE PAIR PARTICIPANTS</span>
                    <span style={{ color: "#2f9e44", fontWeight: 600 }}>● {wsConnected ? "CONNECTED" : "STANDALONE"}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "4px 8px",
                      background: isDark ? "#21252b" : "#f8f9fa",
                      border: isDark ? "1px solid #333842" : "1px solid #e0e0e0",
                      borderRadius: "3px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#2f9e44", display: "inline-block" }} />
                      <span style={{ fontWeight: 600, color: isDark ? "#ffffff" : "#000000" }}>You (Host)</span>
                      <span style={{ fontSize: "10px", color: isDark ? "#848d9c" : "#555555" }}>[Developer]</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", color: isDark ? "#848d9c" : "#555555" }}>
                      <span style={{ background: isDark ? "#282c34" : "#e9ecef", padding: "1px 6px", borderRadius: "2px", color: "#f59f00", fontWeight: 600 }}>Code::Blocks</span>
                      <span>Online • 0ms</span>
                    </div>
                  </div>

                  {/* Session Details + Copy Room Code */}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <div style={{ flex: 1, padding: "4px 8px", background: isDark ? "#21252b" : "#f8f9fa", border: isDark ? "1px solid #333842" : "1px solid #e0e0e0", borderRadius: "3px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", rowGap: "2px", fontSize: "10px" }}>
                        <span style={{ color: isDark ? "#848d9c" : "#555555" }}>Room ID:</span>
                        <span style={{ fontWeight: 600, color: isDark ? "#61afef" : "#0366d6" }}>#{roomId}</span>
                        <span style={{ color: isDark ? "#848d9c" : "#555555" }}>Compiler:</span>
                        <span>GNU GCC 13.2 / MinGW-w64</span>
                      </div>
                    </div>

                    <button
                      onClick={copyRoomCode}
                      style={{
                        background: isDark ? "#282c34" : "#e9ecef",
                        border: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
                        color: isDark ? "#ffffff" : "#000000",
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

              {codeblocksBottomTab === "buildlog" && (
                <div>
                  <div style={{ color: isDark ? "#61afef" : "#0366d6" }}>
                    -------------- Build: TalkMan Pair in TalkManApp (compiler: GNU GCC Compiler)---------------
                  </div>
                  <div>g++.exe -Wall -fexceptions -O2 -std=c++20 -c main.cpp -o obj/Release/main.o</div>
                  <div>g++.exe -o bin/Release/TalkManApp.exe obj/Release/main.o -s</div>
                  <div style={{ color: "#2f9e44" }}>Output file is bin/Release/TalkManApp.exe with size 48.50 KB</div>
                  <div style={{ color: "#2f9e44", fontWeight: 600 }}>
                    Process terminated with status 0 (0 minute(s), 0 second(s)) - 0 error(s), 0 warning(s)
                  </div>
                </div>
              )}

              {codeblocksBottomTab === "buildmessages" && (
                <div style={{ color: "#2f9e44" }}>
                  0 errors, 0 warnings (Build successful).
                </div>
              )}

              {codeblocksBottomTab === "debugger" && (
                <div style={{ color: isDark ? "#848d9c" : "#555555" }}>
                  GDB 12.1 active. Target process running in room #{roomId}.
                </div>
              )}

              {codeblocksBottomTab === "search" && (
                <div style={{ color: isDark ? "#848d9c" : "#555555" }}>
                  No active search results.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 7. BOTTOM STATUS BAR (Classic Sunken Multi-Segment Panels) */}
      <div
        style={{
          height: "22px",
          background: isDark ? "#1e2227" : "#ebe9ed",
          borderTop: isDark ? "1px solid #333842" : "1px solid #b8b8b8",
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          fontSize: "11px",
          flexShrink: 0,
          gap: "4px",
        }}
      >
        {/* Segment 1: Status */}
        <div
          style={{
            flex: 1,
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#abb2bf" : "#24292e",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Welcome to Code::Blocks! (TalkMan Pair Stream: {wsConnected ? "Online" : "Local Standalone"})
        </div>

        {/* Segment 2: Cursor */}
        <div
          style={{
            width: "85px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#848d9c" : "#555555",
            textAlign: "center",
          }}
        >
          Line 24, Col 1
        </div>

        {/* Segment 3: Mode */}
        <div
          style={{
            width: "55px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#848d9c" : "#555555",
            textAlign: "center",
          }}
        >
          Insert
        </div>

        {/* Segment 4: R/W */}
        <div
          style={{
            width: "70px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#848d9c" : "#555555",
            textAlign: "center",
          }}
        >
          Read/Write
        </div>

        {/* Segment 5: Encoding */}
        <div
          style={{
            width: "60px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#848d9c" : "#555555",
            textAlign: "center",
          }}
        >
          UTF-8
        </div>

        {/* Segment 6: Language */}
        <div
          style={{
            width: "45px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#98c379" : "#1e7e34",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          C++
        </div>

        {/* Segment 7: Room */}
        <div
          style={{
            width: "95px",
            padding: "1px 6px",
            background: isDark ? "#17191d" : "#e0dede",
            border: isDark ? "1px solid #2c313c" : "1px solid #b0b0b0",
            borderRadius: "1px",
            color: isDark ? "#61afef" : "#0366d6",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          #{roomId}
        </div>
      </div>
    </div>
  );
}
