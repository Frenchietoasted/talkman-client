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
  Globe,
  Bug,
  Boxes,
  Send,
  Sparkles,
} from "lucide-react";
import TopControls from "./TopControls";
import { IDEProps } from "../../../../lib/types";

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
  const [activeBottomTab, setActiveBottomTab] = useState<
    | "codeblocks"
    | "search_results"
    | "cccc"
    | "build_log"
    | "build_messages"
    | "cppcheck"
    | "debugger"
    | "participants"
  >("codeblocks");

  const [managementTab, setManagementTab] = useState<"projects" | "files" | "fsy">("projects");
  const [activeFile, setActiveFile] = useState<"Start here" | "HelloWorld.c" | "Session.h">("HelloWorld.c");
  const [sourcesOpen, setSourcesOpen] = useState(true);
  const [headersOpen, setHeadersOpen] = useState(true);
  const [selectedTarget, setSelectedTarget] = useState("Debug");
  const [activeBreakpoint, setActiveBreakpoint] = useState<number | null>(null);

  const isDark = mode === "dark";

  // Code::Blocks unified color tokens
  const uiBg = isDark ? "#21252b" : "#f0f0f0";
  const barBg = isDark ? "#24282f" : "#ebe9ed";
  const borderCol = isDark ? "#333842" : "#b8b8b8";
  const editorBg = isDark ? "#1e2227" : "#ffffff";
  const gutterBg = isDark ? "#21252b" : "#f0f0f0";
  const gutterBorder = isDark ? "#2d333b" : "#d0d0d0";
  const gutterText = isDark ? "#636d83" : "#808080";
  const textCol = isDark ? "#e6edf3" : "#000000";
  const logBg = isDark ? "#1e2227" : "#ffffff";

  React.useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, messagesEndRef]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        height: "100dvh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: uiBg,
        color: textCol,
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        fontSize: "12px",
        overflow: "hidden",
        userSelect: "none",
        ["--ide-ctrl-bg" as any]: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
        ["--ide-border" as any]: borderCol,
        ["--ide-accent" as any]: "#2b6cb0",
        ["--ide-text-dim" as any]: isDark ? "#9da5b4" : "#666666",
        ["--ide-text" as any]: textCol,
      }}
    >
      {/* ========================================================================= */}
      {/* 1. WINDOW TITLE BAR                                                       */}
      {/* ========================================================================= */}
      <div
        style={{
          height: "38px",
          background: isDark ? "#1e2227" : "#f5f5f5",
          borderBottom: `1px solid ${borderCol}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        {/* Left: Code::Blocks 4-cube logo & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Authentic 4-color 3D cube icon */}
          <div
            style={{
              width: "18px",
              height: "18px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2px",
              padding: "1px",
              background: isDark ? "#2d3139" : "#ffffff",
              borderRadius: "2px",
              border: "1px solid #999",
              flexShrink: 0,
            }}
          >
            <div style={{ background: "#e03131", borderRadius: "1px" }} />
            <div style={{ background: "#2f9e44", borderRadius: "1px" }} />
            <div style={{ background: "#f59f00", borderRadius: "1px" }} />
            <div style={{ background: "#9c36b5", borderRadius: "1px" }} />
          </div>

          <span style={{ fontWeight: 600, fontSize: "12px", color: textCol }}>
            {activeFile} - Code::Blocks 20.03
          </span>
          <span
            style={{
              fontSize: "11px",
              color: isDark ? "#848d9c" : "#555555",
              background: isDark ? "#2b313a" : "#e8e8e8",
              padding: "2px 8px",
              borderRadius: "3px",
              border: `1px solid ${borderCol}`,
            }}
          >
            Room #{roomId}
          </span>
        </div>

        {/* Right: Global IDE Top Controls (Switcher + Dark Mode + Leave) */}
        <TopControls
          currentTheme="codeblocks"
          setEditor={setEditor}
          mode={mode}
          setMode={setMode}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. CLASSIC MENU BAR                                                       */}
      {/* ========================================================================= */}
      <div
        style={{
          height: "22px",
          background: isDark ? "#282c34" : "#f0f0f0",
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          fontSize: "12px",
          borderBottom: `1px solid ${borderCol}`,
          gap: "2px",
          flexShrink: 0,
        }}
      >
        {[
          "File",
          "Edit",
          "View",
          "Search",
          "Project",
          "Build",
          "Debug",
          "Fortran",
          "wxSmith",
          "Tools",
          "Tools+",
          "Plugins",
          "DoxyBlocks",
          "Settings",
          "Help",
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: "2px 6px",
              cursor: "pointer",
              borderRadius: "2px",
              color: textCol,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = isDark ? "#3e4451" : "#dcdcdc")
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {item}
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. MULTI-ROW DENSE WXAUI TOOLBARS (ROWS 1, 2, 3 MATCHING SCREENSHOT)       */}
      {/* ========================================================================= */}
      {/* TOOLBAR ROW 1: File, Edit, Cut/Copy/Paste, Find, Build & Run, Debug, Help */}
      <div
        style={{
          height: "26px",
          background: barBg,
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          borderBottom: `1px solid ${borderCol}`,
          gap: "2px",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", paddingRight: "3px", cursor: "grab" }}>⋮⋮</span>

        {/* 1. New File (White/Yellow document with folded corner + small dropdown arrow) */}
        <button
          title="New file / project"
          style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer", display: "flex", alignItems: "center", gap: "1px" }}
        >
          <svg width="15" height="15" viewBox="0 0 16 16">
            {/* Document sheet */}
            <path d="M3 1H10L14 5V15H3V1Z" fill="#ffffff" stroke="#5a6a85" strokeWidth="1"/>
            {/* Folded corner */}
            <path d="M10 1V5H14" fill="#d1d9e6" stroke="#5a6a85" strokeWidth="1"/>
            {/* Text lines */}
            <line x1="5" y1="7" x2="11" y2="7" stroke="#94a3b8" strokeWidth="1"/>
            <line x1="5" y1="10" x2="11" y2="10" stroke="#94a3b8" strokeWidth="1"/>
            {/* Small green plus badge */}
            <circle cx="12.5" cy="12.5" r="3" fill="#2f9e44"/>
            <path d="M12.5 11V14M11 12.5H14" stroke="#ffffff" strokeWidth="1"/>
          </svg>
          <span style={{ fontSize: "7px", opacity: 0.7 }}>▾</span>
        </button>

        {/* 2. Open Folder (Yellow Manila folder with blue insert) */}
        <button title="Open (Ctrl+O)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            {/* Back folder flap */}
            <path d="M2 3H6L8 5H14V13H2V3Z" fill="#f59f00" stroke="#d97706" strokeWidth="0.8"/>
            {/* Document inside */}
            <rect x="4" y="4" width="8" height="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6"/>
            {/* Front folder flap */}
            <path d="M1 7H13L15 13H3L1 7Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* 3. Save (Classic Blue Floppy Disk) */}
        <button title="Save (Ctrl+S)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            {/* Floppy casing */}
            <rect x="2" y="2" width="12" height="12" rx="1" fill="#1e40af" stroke="#172554" strokeWidth="0.8"/>
            {/* Metal shutter */}
            <rect x="4" y="2" width="8" height="5" fill="#e2e8f0"/>
            <rect x="6" y="3" width="2" height="3" fill="#1e40af"/>
            {/* White paper label */}
            <rect x="4" y="9" width="8" height="4" fill="#ffffff"/>
            <line x1="5" y1="10" x2="11" y2="10" stroke="#94a3b8" strokeWidth="0.8"/>
            <line x1="5" y1="12" x2="10" y2="12" stroke="#94a3b8" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* 4. Save All (Double Floppy Disks) */}
        <button title="Save all files" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="16" height="15" viewBox="0 0 18 16">
            {/* Back floppy (Red/Orange) */}
            <rect x="4" y="1" width="11" height="11" rx="1" fill="#ea580c" stroke="#9a3412" strokeWidth="0.7"/>
            <rect x="6" y="1" width="6" height="4" fill="#e2e8f0"/>
            {/* Front floppy (Blue) */}
            <rect x="1" y="4" width="12" height="11" rx="1" fill="#1e40af" stroke="#172554" strokeWidth="0.8"/>
            <rect x="3" y="4" width="7" height="4" fill="#e2e8f0"/>
            <rect x="5" y="5" width="2" height="2.5" fill="#1e40af"/>
            <rect x="3" y="10" width="7" height="4" fill="#ffffff"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 5. Undo (Green curved arrow) */}
        <button title="Undo (Ctrl+Z)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <path d="M5 4L1 8L5 12V9C9 9 13 10 14 14C14 8 10 6 5 6V4Z" fill="#2f9e44" stroke="#237834" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* 6. Redo (Green curved arrow) */}
        <button title="Redo (Ctrl+Y)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <path d="M11 4L15 8L11 12V9C7 9 3 10 2 14C2 8 6 6 11 6V4Z" fill="#2f9e44" stroke="#237834" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 7. Cut (Scissors) */}
        <button title="Cut (Ctrl+X)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <circle cx="4" cy="12" r="2.5" fill="none" stroke="#475569" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="2.5" fill="none" stroke="#475569" strokeWidth="1.5"/>
            <line x1="5.5" y1="10" x2="13" y2="2" stroke="#64748b" strokeWidth="1.5"/>
            <line x1="10.5" y1="10" x2="3" y2="2" stroke="#64748b" strokeWidth="1.5"/>
            <circle cx="8" cy="6.5" r="1" fill="#334155"/>
          </svg>
        </button>

        {/* 8. Copy (Two Documents) */}
        <button title="Copy (Ctrl+C)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <rect x="5" y="1" width="9" height="11" fill="#ffffff" stroke="#64748b" strokeWidth="1"/>
            <rect x="2" y="4" width="9" height="11" fill="#ffffff" stroke="#3b82f6" strokeWidth="1"/>
            <line x1="4" y1="7" x2="8" y2="7" stroke="#94a3b8" strokeWidth="0.8"/>
            <line x1="4" y1="10" x2="9" y2="10" stroke="#94a3b8" strokeWidth="0.8"/>
            <line x1="4" y1="12" x2="7" y2="12" stroke="#94a3b8" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* 9. Paste (Clipboard) */}
        <button title="Paste (Ctrl+V)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            {/* Clipboard board */}
            <rect x="2" y="3" width="12" height="12" rx="1" fill="#b45309" stroke="#78350f" strokeWidth="0.8"/>
            {/* White paper */}
            <rect x="4" y="5" width="8" height="9" fill="#ffffff"/>
            {/* Top metallic clip */}
            <rect x="6" y="1" width="4" height="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" rx="0.5"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 10. Find (Magnifier with blue glass) */}
        <button title="Find (Ctrl+F)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="#334155" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 11. Replace (Magnifier with red bookmark ribbon) */}
        <button title="Replace (Ctrl+R)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="5" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="#334155" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M5 2V8L7 6.5L9 8V2H5Z" fill="#e11d48"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 12. Build (Golden Mechanical Gear) */}
        <button title="Build (Ctrl+F9)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <path d="M7 1H9L9.5 3.2L11.2 3.9L13.1 2.6L14.5 4L13.2 5.9L13.9 7.6L16 8.1V10.1L13.9 10.6L13.2 12.3L14.5 14.2L13.1 15.6L11.2 14.3L9.5 15L9 17.2H7L6.5 15L4.8 14.3L2.9 15.6L1.5 14.2L2.8 12.3L2.1 10.6L0 10.1V8.1L2.1 7.6L2.8 5.9L1.5 4L2.9 2.6L4.8 3.9L6.5 3.2L7 1Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
            <circle cx="8" cy="9.1" r="2.8" fill="#ffffff" stroke="#b45309" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* 13. Run (Green 3D Play Triangle) */}
        <button title="Run (Ctrl+F10)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <path d="M3 2L14 8.5L3 15V2Z" fill="#22c55e" stroke="#15803d" strokeWidth="1"/>
            <path d="M4 4L12 8.5L4 13V4Z" fill="#4ade80" opacity="0.6"/>
          </svg>
        </button>

        {/* 14. Build and Run (Golden Gear with Green Play Triangle superimposed) */}
        <button title="Build and run (F9)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="16" height="15" viewBox="0 0 18 16">
            {/* Gear in back */}
            <circle cx="7" cy="7" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
            <circle cx="7" cy="7" r="2" fill="#ffffff"/>
            {/* Play in front */}
            <path d="M8 6L16 11L8 16V6Z" fill="#22c55e" stroke="#15803d" strokeWidth="1"/>
          </svg>
        </button>

        {/* 15. Rebuild (Gear with Circular Refresh Arrows) */}
        <button title="Rebuild (Ctrl+F11)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="4.5" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
            <path d="M3 8A5 5 0 0 1 13 8" stroke="#15803d" strokeWidth="1.8" fill="none"/>
            <polygon points="12,5 15,8 11,8" fill="#15803d"/>
            <path d="M13 8A5 5 0 0 1 3 8" stroke="#15803d" strokeWidth="1.8" fill="none"/>
            <polygon points="4,11 1,8 5,8" fill="#15803d"/>
          </svg>
        </button>

        {/* 16. Abort (Stop Build X in Box) */}
        <button title="Abort" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <rect x="2" y="2" width="12" height="12" rx="2" fill="#ef4444" stroke="#b91c1c" strokeWidth="1"/>
            <path d="M5 5L11 11M11 5L5 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Target Dropdown */}
        <div style={{ marginLeft: "2px", display: "flex", alignItems: "center" }}>
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            style={{
              background: isDark ? "#1e2227" : "#ffffff",
              border: `1px solid ${borderCol}`,
              borderRadius: "2px",
              padding: "1px 6px",
              fontSize: "11px",
              height: "19px",
              width: "110px",
              color: textCol,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="Debug">Debug</option>
            <option value="Release">Release</option>
          </select>
        </div>

        {/* 17. Target Properties */}
        <button title="Target properties" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <rect x="2" y="1" width="12" height="14" fill="#ffffff" stroke="#64748b" strokeWidth="1"/>
            <line x1="5" y1="4" x2="11" y2="4" stroke="#0284c7" strokeWidth="1.2"/>
            <line x1="5" y1="7" x2="11" y2="7" stroke="#64748b" strokeWidth="1"/>
            <line x1="5" y1="10" x2="11" y2="10" stroke="#64748b" strokeWidth="1"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 18. Debugger Controls */}
        {/* Debug / Continue (Green Play with Red Dot) */}
        <button title="Debug / Continue (F8)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="15" viewBox="0 0 16 16">
            <path d="M3 2L13 8L3 14V2Z" fill="#22c55e" stroke="#15803d" strokeWidth="0.8"/>
            <circle cx="12" cy="12" r="3" fill="#ef4444"/>
          </svg>
        </button>
        {/* Step into (Shift+F7) */}
        <button title="Step into (Shift+F7)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="12" width="10" height="2" fill="#64748b"/>
          </svg>
        </button>
        {/* Step over (F7) */}
        <button title="Step over (F7)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M3 8C3 4 11 4 11 9M11 9L8 7M11 9L13 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <rect x="2" y="12" width="12" height="2" fill="#64748b"/>
          </svg>
        </button>
        {/* Step out (Shift+F8) */}
        <button title="Step out (Shift+F8)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M8 12V4M8 4L5 7M8 4L11 7" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="3" y="13" width="10" height="2" fill="#64748b"/>
          </svg>
        </button>
        {/* Pause debugger */}
        <button title="Pause debugger" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 14 14">
            <rect x="2" y="2" width="3.5" height="10" fill="#475569"/>
            <rect x="8.5" y="2" width="3.5" height="10" fill="#475569"/>
          </svg>
        </button>
        {/* Stop debugger */}
        <button title="Stop debugger" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 14 14">
            <rect x="2" y="2" width="10" height="10" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8" rx="1"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 19. DoxyBlocks & Help */}
        <button title="DoxyBlocks" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <div style={{ background: "#ea580c", borderRadius: "2px", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "9px", fontWeight: "bold" }}>
            D
          </div>
        </button>
        <button title="Information / About" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <div style={{ background: "#0284c7", borderRadius: "2px", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontStyle: "italic", fontWeight: "bold" }}>
            i
          </div>
        </button>
      </div>

      {/* TOOLBAR ROW 2: Scope Selectors, Bookmarks, C++ Code Tools */}
      <div
        style={{
          height: "26px",
          background: barBg,
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          borderBottom: `1px solid ${borderCol}`,
          gap: "2px",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", paddingRight: "3px", cursor: "grab" }}>⋮⋮</span>

        {/* Scope Dropdown 1 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            style={{
              background: isDark ? "#1e2227" : "#ffffff",
              border: `1px solid ${borderCol}`,
              borderRadius: "2px",
              padding: "1px 6px",
              fontSize: "11px",
              height: "19px",
              width: "180px",
              color: textCol,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>main() : int</option>
            <option>TalkManSession</option>
          </select>
        </div>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 3px", cursor: "grab" }}>⋮⋮</span>

        {/* Scope Dropdown 2 */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <select
            style={{
              background: isDark ? "#1e2227" : "#ffffff",
              border: `1px solid ${borderCol}`,
              borderRadius: "2px",
              padding: "1px 6px",
              fontSize: "11px",
              height: "19px",
              width: "220px",
              color: textCol,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>Global namespace</option>
            <option>Session.h</option>
          </select>
        </div>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 3px", cursor: "grab" }}>⋮⋮</span>

        {/* Back / Forward arrows */}
        <button title="Browse Tracker Backward" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M12 8H3M7 4L3 8L7 12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
        <button title="Browse Tracker Forward" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M4 8H13M9 4L13 8L9 12" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        {/* Bookmarks */}
        {/* Toggle bookmark (Red Flag) */}
        <button title="Toggle bookmark" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <line x1="3" y1="1" x2="3" y2="15" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M3 2H12L9 6L12 10H3V2Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.8"/>
          </svg>
        </button>
        {/* Previous bookmark */}
        <button title="Previous bookmark" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <line x1="13" y1="1" x2="13" y2="15" stroke="#475569" strokeWidth="1.5"/>
            <path d="M13 2H5L8 6L5 10H13V2Z" fill="#94a3b8"/>
            <polygon points="3,6 1,8 3,10" fill="#334155"/>
          </svg>
        </button>
        {/* Next bookmark */}
        <button title="Next bookmark" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <line x1="3" y1="1" x2="3" y2="15" stroke="#475569" strokeWidth="1.5"/>
            <path d="M3 2H11L8 6L11 10H3V2Z" fill="#94a3b8"/>
            <polygon points="13,6 15,8 13,10" fill="#334155"/>
          </svg>
        </button>
        {/* Clear all bookmarks */}
        <button title="Clear all bookmarks" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="none" stroke="#ef4444" strokeWidth="1.5"/>
            <line x1="3.5" y1="3.5" x2="12.5" y2="12.5" stroke="#ef4444" strokeWidth="1.5"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* C++ Code tools */}
        {/* Swap Header / Source */}
        <button title="Swap header / source (F11)" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="15" height="13" viewBox="0 0 18 14">
            <rect x="1" y="1" width="7" height="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="0.8"/>
            <rect x="10" y="3" width="7" height="10" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8"/>
            <path d="M8 2L10 4M10 11L8 13" stroke="#16a34a" strokeWidth="1.2"/>
          </svg>
        </button>

        {/* Comment block /** */}
        <button title="Comment block (/**)" style={{ background: "transparent", border: "none", padding: "1px 3px", cursor: "pointer", fontSize: "11px", fontWeight: 700, color: "#2f9e44", fontFamily: "monospace" }}>
          /**
        </button>

        {/* Uncomment block *< */}
        <button title="Uncomment block (*<)" style={{ background: "transparent", border: "none", padding: "1px 3px", cursor: "pointer", fontSize: "11px", fontWeight: 700, color: "#2f9e44", fontFamily: "monospace" }}>
          *&lt;
        </button>

        {/* Online Search / Help Globe */}
        <button title="Search online docs" style={{ background: "transparent", border: "none", padding: "1px 3px", cursor: "pointer" }}>
          <Globe size={13} color="#2b6cb0" />
        </button>
        {/* Help ? in box */}
        <button title="Context Help" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <div style={{ width: "13px", height: "13px", border: "1px solid #777", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "bold", color: "#333", background: "#f0f0f0" }}>
            ?
          </div>
        </button>
        {/* Settings Wrench */}
        <button title="Environment Settings" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M14.5 10.5L10 6L11 4.5C11.3 4 11 3 10.2 2.8L9 2.5L8 4L6.5 3L5.5 1.5L4.3 1.8C3.5 2 3.2 3 3.5 3.5L5 5L0.5 9.5C-0.2 10.2 -0.2 11.3 0.5 12L3.5 15C4.2 15.7 5.3 15.7 6 15L10.5 10.5L12 12C12.5 12.3 13.5 12 13.7 11.2L14 10L12.5 9L14 8L14.3 6.8C14.5 6 14.2 5 13.7 4.5L12 6L14.5 10.5Z" fill="#718096" stroke="#4a5568" strokeWidth="0.8"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 3px", cursor: "grab" }}>⋮⋮</span>

        {/* Stepping controls */}
        {/* Step into cursor (Arrow pointing to vertical line) */}
        <button title="Step into cursor" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <line x1="2" y1="2" x2="2" y2="14" stroke="#4a5568" strokeWidth="2" />
            <path d="M4 8H13M10 5L13 8L10 11" stroke="#2f9e44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
        {/* Toggle Breakpoint (Red circle) */}
        <button title="Toggle Breakpoint" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e03131", display: "inline-block", boxShadow: "inset 0 0 2px rgba(0,0,0,0.4)" }} />
        </button>
        {/* Run to cursor */}
        <button title="Run to cursor" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <line x1="14" y1="2" x2="14" y2="14" stroke="#4a5568" strokeWidth="2" />
            <path d="M3 8H12M9 5L12 8L9 11" stroke="#2f9e44" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      {/* TOOLBAR ROW 3 (EXACT MATCH FOR USER SCREENSHOT): Window Layouts, Zoom, S / C, Search Symbols, Replace, Regex */}
      <div
        style={{
          height: "26px",
          background: barBg,
          display: "flex",
          alignItems: "center",
          padding: "0 4px",
          borderBottom: `1px solid ${borderCol}`,
          gap: "2px",
          fontSize: "11px",
          flexShrink: 0,
        }}
      >
        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", paddingRight: "3px", cursor: "grab" }}>⋮⋮</span>

        {/* 1. Pointer / Selection Arrow Tool */}
        <button title="Pointer / Select" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M2 1L2 14L5.5 10.5L9 15L11 14L7.5 9.5L12 9.5L2 1Z" fill={textCol} stroke={isDark ? "#ffffff" : "#000000"} strokeWidth="0.5"/>
          </svg>
        </button>

        {/* 2. Window Layout Icons (6 authentic layout boxes from screenshot) */}
        {/* Layout 1: Single full pane */}
        <button title="Single pane" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <rect x="1" y="1" width="14" height="3" fill="#cbd5e0"/>
          </svg>
        </button>
        {/* Layout 2: Split Left/Right */}
        <button title="Split Vertical (Left/Right)" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <rect x="1" y="1" width="14" height="3" fill="#cbd5e0"/>
            <line x1="8" y1="1" x2="8" y2="13" stroke="#718096" strokeWidth="1"/>
          </svg>
        </button>
        {/* Layout 3: 4-Grid Quad Panes */}
        <button title="4-Grid Layout" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <line x1="8" y1="1" x2="8" y2="13" stroke="#718096" strokeWidth="1"/>
            <line x1="1" y1="7" x2="15" y2="7" stroke="#718096" strokeWidth="1"/>
          </svg>
        </button>
        {/* Layout 4: Split Top/Bottom */}
        <button title="Split Horizontal (Top/Bottom)" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <rect x="1" y="1" width="14" height="3" fill="#cbd5e0"/>
            <line x1="1" y1="7" x2="15" y2="7" stroke="#718096" strokeWidth="1"/>
          </svg>
        </button>
        {/* Layout 5: Multi-tab bottom pane */}
        <button title="Bottom Pane Layout" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <rect x="1" y="9" width="14" height="4" fill="#cbd5e0"/>
            <line x1="1" y1="9" x2="15" y2="9" stroke="#718096" strokeWidth="1"/>
          </svg>
        </button>
        {/* Layout 6: Dual Window Split */}
        <button title="Dual Tabbed Layout" style={{ background: "transparent", border: "none", padding: "1px 1px", cursor: "pointer" }}>
          <svg width="14" height="13" viewBox="0 0 16 14">
            <rect x="1" y="1" width="14" height="12" fill={isDark ? "#2d3139" : "#ffffff"} stroke="#718096" strokeWidth="1.2" rx="1"/>
            <rect x="1" y="1" width="7" height="3" fill="#3182ce"/>
            <rect x="8" y="1" width="7" height="3" fill="#cbd5e0"/>
            <line x1="8" y1="1" x2="8" y2="13" stroke="#718096" strokeWidth="1"/>
          </svg>
        </button>

        {/* 3. Zoom Controls (Zoom In +, Zoom Out -) */}
        <button title="Zoom in" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="#2b6cb0" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="#2b6cb0" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6.5" y1="4" x2="6.5" y2="9" stroke="#2b6cb0" strokeWidth="1.2"/>
            <line x1="4" y1="6.5" x2="9" y2="6.5" stroke="#2b6cb0" strokeWidth="1.2"/>
          </svg>
        </button>
        <button title="Zoom out" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="#2b6cb0" strokeWidth="1.5"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="#2b6cb0" strokeWidth="2" strokeLinecap="round"/>
            <line x1="4" y1="6.5" x2="9" y2="6.5" stroke="#2b6cb0" strokeWidth="1.2"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 4. S and C Serif Buttons */}
        <button title="Search symbols (S)" style={{ background: "transparent", border: "none", padding: "0 3px", cursor: "pointer", fontWeight: 900, fontSize: "13px", fontFamily: '"Times New Roman", Georgia, serif', color: textCol }}>
          S
        </button>
        <button title="Search classes (C)" style={{ background: "transparent", border: "none", padding: "0 3px", cursor: "pointer", fontWeight: 900, fontSize: "13px", fontFamily: '"Times New Roman", Georgia, serif', color: textCol }}>
          C
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 5. Symbol Search Input Box with Dropdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: isDark ? "#1e2227" : "#ffffff",
            border: `1px solid ${borderCol}`,
            borderRadius: "2px",
            padding: "0 4px",
            height: "19px",
            width: "130px",
          }}
        >
          <input
            placeholder=""
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: textCol,
              fontSize: "11px",
              width: "100%",
            }}
          />
          <span style={{ fontSize: "7px", opacity: 0.7, cursor: "pointer" }}>▾</span>
        </div>
        {/* Symbol Search (Blue Magnifier) */}
        <button title="Find Symbol" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <circle cx="6.5" cy="6.5" r="5" fill="none" stroke="#3182ce" strokeWidth="1.8"/>
            <line x1="10.5" y1="10.5" x2="15" y2="15" stroke="#3182ce" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Symbol Settings Wrench */}
        <button title="Symbol Search Settings" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M14 10.5L9.5 6L10.5 4.5C10.8 4 10.5 3 9.7 2.8L8.5 2.5L7.5 4L6 3L5 1.5L3.8 1.8C3 2 2.7 3 3 3.5L4.5 5L0.5 9C-0.2 9.7 -0.2 10.8 0.5 11.5L3.5 14.5C4.2 15.2 5.3 15.2 6 14.5L10 10.5L11.5 12C12 12.3 13 12 13.2 11.2L13.5 10L12 9L13.5 8L13.8 6.8C14 6 13.7 5 13.2 4.5L11.5 6L14 10.5Z" fill="#e53e3e" stroke="#c53030" strokeWidth="0.5"/>
          </svg>
        </button>

        {/* Grip Handle */}
        <span style={{ color: "#999", fontSize: "14px", padding: "0 2px", cursor: "grab" }}>⋮⋮</span>

        {/* 6. Clear Search Red X Button */}
        <button title="Clear search" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="12" height="12" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="6" fill="#e53e3e"/>
            <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 7. Replace / Find in Files Input Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: isDark ? "#1e2227" : "#ffffff",
            border: `1px solid ${borderCol}`,
            borderRadius: "2px",
            padding: "0 4px",
            height: "19px",
            width: "140px",
          }}
        >
          <input
            placeholder=""
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: textCol,
              fontSize: "11px",
              width: "100%",
            }}
          />
          <span style={{ fontSize: "7px", opacity: 0.7, cursor: "pointer" }}>▾</span>
        </div>

        {/* 8. Navigation Match Arrows (Green Left & Right) */}
        <button title="Find previous match" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M12 8H3M7 4L3 8L7 12" stroke="#2f9e44" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
        <button title="Find next match" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 16 16">
            <path d="M4 8H13M9 4L13 8L9 12" stroke="#2f9e44" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        {/* 9. Highlight / Marker Icon (Pencil with underline) */}
        <button title="Highlight all matches" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path d="M10 2L14 6L6 14H2V10L10 2Z" fill="#ecc94b" stroke="#d69e2e" strokeWidth="0.8"/>
            <line x1="1" y1="15" x2="15" y2="15" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* 10. Whole Word match / Aa with highlighter marker */}
        <button title="Match whole word" style={{ background: "transparent", border: "none", padding: "1px 2px", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <span style={{ fontWeight: 800, fontSize: "11px", color: isDark ? "#63b3ed" : "#2b6cb0", letterSpacing: "-0.5px" }}>Aa</span>
            <div style={{ position: "absolute", bottom: "-1px", left: 0, right: 0, height: "2px", background: "#f6e05e" }} />
          </div>
        </button>

        {/* 11. Aa (Match Case) */}
        <button title="Match case" style={{ background: "transparent", border: "none", padding: "1px 3px", cursor: "pointer", fontWeight: 800, fontSize: "12px", color: isDark ? "#63b3ed" : "#2b6cb0" }}>
          Aa
        </button>

        {/* 12. .* (Regular Expression) */}
        <button title="Regular expression search" style={{ background: "transparent", border: "none", padding: "1px 3px", cursor: "pointer", fontWeight: 800, fontSize: "12px", color: isDark ? "#63b3ed" : "#2b6cb0", fontFamily: "monospace" }}>
          .*
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN WORKSPACE (LEFT MANAGEMENT + CENTER EDITOR)                        */}
      {/* ========================================================================= */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* --------------------------------------------------------------------- */}
        {/* LEFT PANE: Management (Projects / Files / FSy)                         */}
        {/* --------------------------------------------------------------------- */}
        <div
          style={{
            width: "210px",
            background: uiBg,
            borderRight: `1px solid ${borderCol}`,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* Management Titlebar with minimize & close */}
          <div
            style={{
              height: "20px",
              background: isDark ? "#282c34" : "#e0dfdf",
              borderBottom: `1px solid ${borderCol}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 6px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            <span>Management</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <span style={{ cursor: "pointer", fontSize: "9px" }}>▼</span>
              <span style={{ cursor: "pointer", fontSize: "10px" }}>✕</span>
            </div>
          </div>

          {/* Management Beveled Tabs: ◄ Projects | Files | FSy ► */}
          <div
            style={{
              height: "22px",
              background: barBg,
              borderBottom: `1px solid ${borderCol}`,
              display: "flex",
              alignItems: "center",
              padding: "0 2px",
              gap: "2px",
            }}
          >
            <span style={{ fontSize: "9px", opacity: 0.6, padding: "0 2px" }}>◄</span>
            <button
              onClick={() => setManagementTab("projects")}
              style={{
                background: managementTab === "projects" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: managementTab === "projects" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: managementTab === "projects" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: managementTab === "projects" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 6px",
                fontSize: "11px",
                fontWeight: managementTab === "projects" ? 600 : 400,
                color: textCol,
                cursor: "pointer",
              }}
            >
              Projects
            </button>
            <button
              onClick={() => setManagementTab("files")}
              style={{
                background: managementTab === "files" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: managementTab === "files" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: managementTab === "files" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: managementTab === "files" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 6px",
                fontSize: "11px",
                fontWeight: managementTab === "files" ? 600 : 400,
                color: textCol,
                cursor: "pointer",
              }}
            >
              Files
            </button>
            <button
              onClick={() => setManagementTab("fsy")}
              style={{
                background: managementTab === "fsy" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: managementTab === "fsy" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: managementTab === "fsy" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: managementTab === "fsy" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 6px",
                fontSize: "11px",
                fontWeight: managementTab === "fsy" ? 600 : 400,
                color: textCol,
                cursor: "pointer",
              }}
            >
              FSy
            </button>
            <span style={{ fontSize: "9px", opacity: 0.6, padding: "0 2px", marginLeft: "auto" }}>
              ►
            </span>
          </div>

          {/* Tree View */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "4px 2px",
              fontSize: "11px",
              lineHeight: "18px",
            }}
          >
            {/* Workspace Root with classic blue globe */}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "1px 4px" }}>
              <svg width="14" height="14" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="0.8"/>
                <ellipse cx="8" cy="8" rx="3.2" ry="6.5" fill="none" stroke="#ffffff" strokeWidth="0.8"/>
                <line x1="1.5" y1="8" x2="14.5" y2="8" stroke="#ffffff" strokeWidth="0.8"/>
                <line x1="3.5" y1="4.5" x2="12.5" y2="4.5" stroke="#ffffff" strokeWidth="0.6"/>
                <line x1="3.5" y1="11.5" x2="12.5" y2="11.5" stroke="#ffffff" strokeWidth="0.6"/>
              </svg>
              <span style={{ fontWeight: 600 }}>Workspace</span>
            </div>

            {/* TalkManApp Project */}
            <div style={{ paddingLeft: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "1px 4px",
                  color: isDark ? "#61afef" : "#005cc5",
                  fontWeight: 600,
                }}
              >
                <ChevronDown size={11} />
                {/* Authentic 4-cube icon */}
                <div
                  style={{
                    width: "13px",
                    height: "13px",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1px",
                    padding: "1px",
                    background: isDark ? "#2d3139" : "#ffffff",
                    borderRadius: "2px",
                    border: "1px solid #718096",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ background: "#ef4444", borderRadius: "1px" }} />
                  <div style={{ background: "#22c55e", borderRadius: "1px" }} />
                  <div style={{ background: "#f59e0b", borderRadius: "1px" }} />
                  <div style={{ background: "#a855f7", borderRadius: "1px" }} />
                </div>
                <span>TalkManApp</span>
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
                  {sourcesOpen ? (
                    <svg width="14" height="13" viewBox="0 0 16 14">
                      <path d="M1 2H6L8 4H15V12H1V2Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
                      <rect x="3" y="3" width="9" height="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6"/>
                      <path d="M1 6H13L15 12H3L1 6Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
                    </svg>
                  ) : (
                    <svg width="14" height="13" viewBox="0 0 16 14">
                      <path d="M1 2H6L8 4H15V12H1V2Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
                      <path d="M1 5H15V12H1V5Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
                    </svg>
                  )}
                  <span>Sources (2)</span>
                </div>

                {sourcesOpen && (
                  <div style={{ paddingLeft: "16px" }}>
                    <div
                      onClick={() => setActiveFile("HelloWorld.c")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "1px 4px",
                        cursor: "pointer",
                        background:
                          activeFile === "HelloWorld.c"
                            ? isDark
                              ? "#2c313c"
                              : "#e0e8f5"
                            : "transparent",
                        fontWeight: activeFile === "HelloWorld.c" ? 600 : 400,
                      }}
                    >
                      {/* Code::Blocks C file icon */}
                      <svg width="13" height="14" viewBox="0 0 14 16">
                        <path d="M2 1H8.5L12 4.5V15H2V1Z" fill="#ffffff" stroke="#64748b" strokeWidth="0.8"/>
                        <path d="M8.5 1V4.5H12" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8"/>
                        <rect x="3" y="6" width="8" height="7" rx="1" fill="#22c55e"/>
                        <text x="7" y="12" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">c</text>
                      </svg>
                      <span>HelloWorld.c</span>
                    </div>

                    <div
                      onClick={() => setActiveFile("Session.h")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "1px 4px",
                        cursor: "pointer",
                        background:
                          activeFile === "Session.h"
                            ? isDark
                              ? "#2c313c"
                              : "#e0e8f5"
                            : "transparent",
                        fontWeight: activeFile === "Session.h" ? 600 : 400,
                      }}
                    >
                      {/* Code::Blocks H file icon */}
                      <svg width="13" height="14" viewBox="0 0 14 16">
                        <path d="M2 1H8.5L12 4.5V15H2V1Z" fill="#ffffff" stroke="#64748b" strokeWidth="0.8"/>
                        <path d="M8.5 1V4.5H12" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8"/>
                        <rect x="3" y="6" width="8" height="7" rx="1" fill="#3b82f6"/>
                        <text x="7" y="12" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">h</text>
                      </svg>
                      <span>Session.h</span>
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
                  {headersOpen ? (
                    <svg width="14" height="13" viewBox="0 0 16 14">
                      <path d="M1 2H6L8 4H15V12H1V2Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
                      <rect x="3" y="3" width="9" height="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.6"/>
                      <path d="M1 6H13L15 12H3L1 6Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
                    </svg>
                  ) : (
                    <svg width="14" height="13" viewBox="0 0 16 14">
                      <path d="M1 2H6L8 4H15V12H1V2Z" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8"/>
                      <path d="M1 5H15V12H1V5Z" fill="#fbbf24" stroke="#b45309" strokeWidth="0.8"/>
                    </svg>
                  )}
                  <span>Headers (1)</span>
                </div>

                {headersOpen && (
                  <div style={{ paddingLeft: "16px" }}>
                    <div
                      onClick={() => setActiveFile("Session.h")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "1px 4px",
                        cursor: "pointer",
                      }}
                    >
                      <svg width="13" height="14" viewBox="0 0 14 16">
                        <path d="M2 1H8.5L12 4.5V15H2V1Z" fill="#ffffff" stroke="#64748b" strokeWidth="0.8"/>
                        <path d="M8.5 1V4.5H12" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8"/>
                        <rect x="3" y="6" width="8" height="7" rx="1" fill="#3b82f6"/>
                        <text x="7" y="12" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">h</text>
                      </svg>
                      <span>Session.h</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------------------------------- */}
        {/* CENTER PANE: Editor Tabs & Scintilla Code Canvas                      */}
        {/* --------------------------------------------------------------------- */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Editor Tabs Bar with individual ✕ buttons */}
          <div
            style={{
              height: "25px",
              background: barBg,
              borderBottom: `1px solid ${borderCol}`,
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
                height: "22px",
                background: activeFile === "Start here" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: activeFile === "Start here" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: activeFile === "Start here" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: activeFile === "Start here" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "0 8px",
                fontSize: "11px",
                cursor: "pointer",
                color: activeFile === "Start here" ? textCol : isDark ? "#848d9c" : "#666",
              }}
            >
              <span>Start here</span>
              <span style={{ fontSize: "10px", opacity: 0.6 }}>✕</span>
            </div>

            {/* HelloWorld.c Tab */}
            <div
              onClick={() => setActiveFile("HelloWorld.c")}
              style={{
                height: "22px",
                background: activeFile === "HelloWorld.c" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: activeFile === "HelloWorld.c" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: activeFile === "HelloWorld.c" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: activeFile === "HelloWorld.c" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "0 8px",
                fontSize: "11px",
                fontWeight: activeFile === "HelloWorld.c" ? 600 : 400,
                cursor: "pointer",
                color: activeFile === "HelloWorld.c" ? textCol : isDark ? "#848d9c" : "#666",
              }}
            >
              <svg width="12" height="13" viewBox="0 0 14 16">
                <path d="M2 1H8.5L12 4.5V15H2V1Z" fill="#ffffff" stroke="#64748b" strokeWidth="0.8"/>
                <path d="M8.5 1V4.5H12" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8"/>
                <rect x="3" y="6" width="8" height="7" rx="1" fill="#22c55e"/>
                <text x="7" y="12" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">c</text>
              </svg>
              <span>HelloWorld.c</span>
              <span style={{ fontSize: "10px", opacity: 0.6 }}>✕</span>
            </div>

            {/* Session.h Tab */}
            <div
              onClick={() => setActiveFile("Session.h")}
              style={{
                height: "22px",
                background: activeFile === "Session.h" ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: activeFile === "Session.h" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: activeFile === "Session.h" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: activeFile === "Session.h" ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "0 8px",
                fontSize: "11px",
                cursor: "pointer",
                color: activeFile === "Session.h" ? textCol : isDark ? "#848d9c" : "#666",
              }}
            >
              <svg width="12" height="13" viewBox="0 0 14 16">
                <path d="M2 1H8.5L12 4.5V15H2V1Z" fill="#ffffff" stroke="#64748b" strokeWidth="0.8"/>
                <path d="M8.5 1V4.5H12" fill="#cbd5e1" stroke="#64748b" strokeWidth="0.8"/>
                <rect x="3" y="6" width="8" height="7" rx="1" fill="#3b82f6"/>
                <text x="7" y="12" fill="#ffffff" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">h</text>
              </svg>
              <span>Session.h</span>
              <span style={{ fontSize: "10px", opacity: 0.6 }}>✕</span>
            </div>
          </div>

          {/* Code Canvas (Exact Scintilla C syntax coloring) */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
              background: editorBg,
            }}
          >
            <div
              style={{
                display: "flex",
                minHeight: "100%",
                width: "100%",
                fontFamily: '"Courier New", Consolas, Monaco, monospace',
                fontSize: "13px",
                lineHeight: "20px",
              }}
            >
              {/* Gutter (Line Numbers + Breakpoints) */}
              <div
                style={{
                  width: "44px",
                  background: gutterBg,
                  borderRight: `1px solid ${gutterBorder}`,
                  padding: "6px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  paddingRight: "8px",
                  color: gutterText,
                  userSelect: "none",
                  flexShrink: 0,
                }}
              >
              {Array.from(
                {
                  length: Math.max(
                    40,
                    10 +
                      messages.reduce(
                        (acc, m) => acc + (m.text ? m.text.split("\n").length + 2 : 2),
                        8
                      )
                  ),
                },
                (_, i) => i + 1
              ).map((num) => (
                <div
                  key={num}
                  onClick={() => setActiveBreakpoint(activeBreakpoint === num ? null : num)}
                  style={{
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                  title="Click to toggle breakpoint"
                >
                  {activeBreakpoint === num && (
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#e03131",
                        display: "inline-block",
                      }}
                    />
                  )}
                  <span>{num}</span>
                </div>
              ))}
            </div>

            {/* Code Content Area */}
            <div
              style={{
                flex: 1,
                padding: "6px 14px",
                background: editorBg,
                color: textCol,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              {activeFile === "HelloWorld.c" && (
                <>
                  {/* Line 1: #include <stdio.h> in Green */}
                  <div>
                    <span style={{ color: isDark ? "#7ee787" : "#008000", fontWeight: 700 }}>#include</span>{" "}
                    <span style={{ color: isDark ? "#7ee787" : "#008000" }}>&lt;stdio.h&gt;</span>
                  </div>

                  {/* Line 2: int main() */}
                  <div>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>int </span>
                    <span style={{ color: isDark ? "#ffffff" : "#000000" }}>main()</span>
                  </div>

                  {/* Line 3: { (with light cyan active brace highlight) */}
                  <div style={{ display: "inline-block", width: "fit-content", background: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(0, 255, 255, 0.15)", padding: "0 2px" }}>
                    <span>&#123;</span>
                  </div>

                  {/* Line 4: printf("Hello World!"); */}
                  <div style={{ paddingLeft: "24px" }}>
                    <span>printf(</span>
                    <span style={{ color: isDark ? "#ff7b72" : "#a000a0" }}>&quot;Hello World!&quot;</span>
                    <span>);</span>
                  </div>

                  {/* Line 5: return 0; */}
                  <div style={{ paddingLeft: "24px" }}>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>return </span>
                    <span style={{ color: isDark ? "#f39c12" : "#000000" }}>0</span>;
                  </div>

                  {/* Line 6: } */}
                  <div style={{ display: "inline-block", width: "fit-content", background: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(0, 255, 255, 0.15)", padding: "0 2px" }}>
                    <span>&#125;</span>
                  </div>

                  {/* Live Stream of Chat Messages Formatted as in VS Code */}
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        paddingLeft: "24px",
                        marginTop: "6px",
                        marginBottom: "6px",
                        lineHeight: "1.5",
                        fontFamily: '"JetBrains Mono", Consolas, "Fira Code", monospace',
                      }}
                    >
                      <div
                        style={{
                          color: isDark ? "#6a9955" : "#008000",
                          fontSize: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            color: msg.sender
                              ? isDark
                                ? "#4ec9b0"
                                : "#0070c1"
                              : isDark
                                ? "#e5c07b"
                                : "#b26b00",
                          }}
                        >
                          @{msg.sender}:
                        </span>
                        <span style={{ opacity: 0.6, fontSize: "11px" }}>
                          {msg.timeStamp}
                        </span>
                      </div>
                      <div
                        style={{
                          paddingLeft: "16px",
                          fontSize: "13px",
                          whiteSpace: "pre-wrap",
                          lineHeight: "1.4",
                          color:
                            msg.type === "code"
                              ? isDark
                                ? "#ffffff"
                                : "#000000"
                              : msg.sender
                                ? isDark
                                  ? "#98c379"
                                  : "#2e7d32"
                                : isDark
                                  ? "#abb2bf"
                                  : "#24292e",
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {activeFile === "Session.h" && (
                <>
                  <div>
                    <span style={{ color: isDark ? "#7ee787" : "#008000", fontWeight: 700 }}>#ifndef </span>
                    <span style={{ color: isDark ? "#7ee787" : "#008000" }}>SESSION_H</span>
                  </div>
                  <div>
                    <span style={{ color: isDark ? "#7ee787" : "#008000", fontWeight: 700 }}>#define </span>
                    <span style={{ color: isDark ? "#7ee787" : "#008000" }}>SESSION_H</span>
                  </div>
                  <div style={{ height: "8px" }} />
                  <div>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>class </span>
                    <span style={{ color: isDark ? "#61afef" : "#005cc5", fontWeight: 700 }}>TalkManSession </span>
                    <span>&#123;</span>
                  </div>
                  <div style={{ paddingLeft: "24px" }}>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>public:</span>
                  </div>
                  <div style={{ paddingLeft: "36px" }}>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>const char</span>* roomId ={" "}
                    <span style={{ color: isDark ? "#ff7b72" : "#a000a0" }}>&quot;{roomId}&quot;</span>;
                  </div>
                  <div style={{ paddingLeft: "36px" }}>
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>bool </span>connected ={" "}
                    <span style={{ color: isDark ? "#79b8ff" : "#0000a0", fontWeight: 700 }}>{wsConnected ? "true" : "false"}</span>;
                  </div>
                  <div><span>&#125;;</span></div>
                  <div>
                    <span style={{ color: isDark ? "#7ee787" : "#008000", fontWeight: 700 }}>#endif</span>
                  </div>
                </>
              )}

              {activeFile === "Start here" && (
                <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Code::Blocks 20.03</div>
                  <div style={{ color: isDark ? "#848d9c" : "#666", fontSize: "12px", marginBottom: "16px" }}>
                    The open source, cross-platform IDE • Room #{roomId}
                  </div>
                  <button
                    onClick={() => setActiveFile("HelloWorld.c")}
                    style={{
                      background: isDark ? "#2d3139" : "#ffffff",
                      border: `1px solid ${borderCol}`,
                      color: isDark ? "#ffffff" : "#000000",
                      padding: "6px 14px",
                      cursor: "pointer",
                      borderRadius: "3px",
                      fontWeight: 600,
                    }}
                  >
                    Open HelloWorld.c
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Integrated Input / Action Bar */}
          <form
            onSubmit={handleSendMessage}
            style={{
              height: "36px",
              background: isDark ? "#1f2329" : barBg,
              borderTop: isDark ? "1px solid #333842" : `1px solid ${borderCol}`,
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type message to room #${roomId} (Press Enter to Send)...`}
              style={{
                flex: 1,
                background: isDark ? "#14161a" : "#ffffff",
                border: isDark ? "1px solid #3e4451" : `1px solid ${borderCol}`,
                borderRadius: "3px",
                padding: "4px 10px",
                height: "26px",
                fontSize: "12px",
                fontFamily: '"JetBrains Mono", Consolas, monospace',
                color: isDark ? "#e6edf3" : "#000000",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              style={{
                background: isDark ? "#2d3139" : "#ffffff",
                border: isDark ? "1px solid #3e4451" : `1px solid ${borderCol}`,
                borderRadius: "3px",
                padding: "3px 12px",
                height: "26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "11px",
                fontWeight: 600,
                color: isDark ? "#e6edf3" : textCol,
                opacity: inputText.trim() ? 1 : 0.6,
              }}
            >
              <Play size={11} fill="#2f9e44" color="#2f9e44" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM PANEL: Logs & others (Matching screenshot exactly)              */}
      {/* ========================================================================= */}
      <div
        style={{
          height: "145px",
          background: uiBg,
          borderTop: `1px solid ${borderCol}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        {/* Logs & others Header */}
        <div
          style={{
            height: "18px",
            background: isDark ? "#282c34" : "#e0dfdf",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 6px",
            borderBottom: `1px solid ${borderCol}`,
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          <span>Logs &amp; others</span>
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ cursor: "pointer", fontSize: "10px" }}>_</span>
            <span style={{ cursor: "pointer", fontSize: "10px" }}>✕</span>
          </div>
        </div>

        {/* Tab Strip with Exact Names and Icons from Screenshot */}
        <div
          style={{
            height: "22px",
            background: barBg,
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${borderCol}`,
            padding: "0 2px",
            overflowX: "auto",
            gap: "2px",
          }}
        >
          {[
            { id: "codeblocks", label: "Code::Blocks", icon: "📋" },
            { id: "search_results", label: "Search results", icon: "🔍" },
            { id: "cccc", label: "Cccc", icon: "📜" },
            { id: "build_log", label: "Build log", icon: "⚙️" },
            { id: "build_messages", label: "Build messages", icon: "🚩" },
            { id: "cppcheck", label: "CppCheck/Vera++", icon: "🛡️" },
            { id: "debugger", label: "Debugger", icon: "🪲" },
            { id: "participants", label: `Participants (${messages.length > 0 ? 2 : 1})`, icon: "👥" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveBottomTab(tab.id as typeof activeBottomTab)}
              style={{
                background: activeBottomTab === tab.id ? (isDark ? "#21252b" : "#ffffff") : "transparent",
                borderTop: activeBottomTab === tab.id ? `1px solid ${borderCol}` : "1px solid transparent",
                borderLeft: activeBottomTab === tab.id ? `1px solid ${borderCol}` : "1px solid transparent",
                borderRight: activeBottomTab === tab.id ? `1px solid ${borderCol}` : "1px solid transparent",
                borderBottom: "none",
                borderRadius: "2px 2px 0 0",
                padding: "1px 6px",
                fontSize: "11px",
                fontWeight: activeBottomTab === tab.id ? 600 : 400,
                color: textCol,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "11px" }}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span style={{ fontSize: "9px", opacity: 0.6 }}>✕</span>
            </button>
          ))}
        </div>

        {/* Log Text Content (Authentic Startup / Build Log Output) */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "4px 8px",
            fontFamily: '"Courier New", Consolas, monospace',
            fontSize: "11px",
            lineHeight: "16px",
            background: logBg,
            color: textCol,
          }}
        >
          {activeBottomTab === "codeblocks" && (
            <div>
              <div style={{ color: "#0000a0" }}>Preserving older key bindings failed.</div>
              <div style={{ color: "#0000a0" }}>Will create key bindings from current menu structure.</div>
              <div>SpellChecker: Thesaurus files &apos;C:\Program Files\CodeBlocks\share\codeblocks\SpellChecker\th_en_US.idx&apos; not found!</div>
              <div>ToDoList: Warning: No to-do types or comment symbols selected to search for, nothing to do.</div>
              <div style={{ color: "#2f9e44", fontWeight: 600 }}>
                TalkMan Live Socket: {wsConnected ? "Connected (ws://localhost:8080)" : "Listening"}
              </div>
              <div style={{ color: isDark ? "#61afef" : "#005cc5" }}>
                C:\Users\gs202\OneDrive\Desktop\HelloWorld.c
              </div>
            </div>
          )}

          {activeBottomTab === "build_log" && (
            <div>
              <div style={{ color: isDark ? "#61afef" : "#005cc5" }}>
                -------------- Build: Debug in TalkManApp (compiler: GNU GCC Compiler)---------------
              </div>
              <div>gcc.exe -Wall -g -c HelloWorld.c -o obj\Debug\HelloWorld.o</div>
              <div>gcc.exe -o bin\Debug\HelloWorld.exe obj\Debug\HelloWorld.o</div>
              <div style={{ color: "#2f9e44" }}>Output file is bin\Debug\HelloWorld.exe with size 34.20 KB</div>
              <div style={{ color: "#2f9e44", fontWeight: 700 }}>
                Process terminated with status 0 (0 minute(s), 0 second(s)) - 0 error(s), 0 warning(s)
              </div>
            </div>
          )}

          {activeBottomTab === "participants" && (
            <div>
              <div style={{ fontWeight: 700, marginBottom: "4px" }}>
                ROOM #{roomId} PARTICIPANTS ({wsConnected ? "ONLINE" : "STANDALONE"})
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span>• You (Host / Developer) [Code::Blocks 20.03]</span>
                <button
                  onClick={copyRoomCode}
                  style={{
                    background: isDark ? "#2d3139" : "#e8e8e8",
                    border: `1px solid ${borderCol}`,
                    padding: "1px 6px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontSize: "10px",
                  }}
                >
                  {copiedCode ? "Copied Code!" : "Copy Room Code"}
                </button>
              </div>
            </div>
          )}

          {activeBottomTab === "debugger" && (
            <div>GDB 12.1 active. GNU Debugger ready for target HelloWorld.exe.</div>
          )}

          {!["codeblocks", "build_log", "participants", "debugger"].includes(activeBottomTab) && (
            <div style={{ opacity: 0.6 }}>No output messages currently logged.</div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SUNKEN WINDOWS STATUS BAR (8 Distinct Panels from Screenshot)          */}
      {/* ========================================================================= */}
      <div
        style={{
          height: "22px",
          background: barBg,
          borderTop: `1px solid ${borderCol}`,
          display: "flex",
          alignItems: "center",
          fontSize: "11px",
          color: textCol,
          padding: "0 2px",
          gap: "2px",
          flexShrink: 0,
        }}
      >
        {/* Panel 1: Full File Path */}
        <div
          style={{
            flex: 1,
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          C:\Users\gs202\OneDrive\Desktop\HelloWorld.c
        </div>

        {/* Panel 2: Language */}
        <div
          style={{
            width: "60px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          C/C++
        </div>

        {/* Panel 3: Line Ending */}
        <div
          style={{
            width: "115px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          Windows (CR+LF)
        </div>

        {/* Panel 4: Encoding */}
        <div
          style={{
            width: "100px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          WINDOWS-1252
        </div>

        {/* Panel 5: Cursor Position */}
        <div
          style={{
            width: "120px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          Line 6, Col 2, Pos 79
        </div>

        {/* Panel 6: Mode */}
        <div
          style={{
            width: "50px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          Insert
        </div>

        {/* Panel 7: Read/Write */}
        <div
          style={{
            width: "70px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          Read/Write
        </div>

        {/* Panel 8: Target */}
        <div
          style={{
            width: "55px",
            border: `1px solid ${borderCol}`,
            padding: "0 6px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          default
        </div>

        {/* Panel 9: Keyboard Flag */}
        <div
          style={{
            width: "30px",
            border: `1px solid ${borderCol}`,
            padding: "0 4px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: isDark ? "#1e2227" : "#ffffff",
          }}
        >
          🇺🇸
        </div>
      </div>
    </div>
  );
}
