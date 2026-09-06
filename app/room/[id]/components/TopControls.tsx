"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { Editor, Mode } from "./types";

interface TopControlsProps {
  currentTheme: Editor;
  setEditor: (editor: Editor) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

export default function TopControls({
  currentTheme,
  setEditor,
  mode,
  setMode,
}: TopControlsProps) {
  const router = useRouter();
  const isDark = mode === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
      {/* Segmented IDE Switcher */}
      <div
        style={{
          height: "26px",
          display: "inline-flex",
          alignItems: "center",
          background: "var(--ide-ctrl-bg)",
          border: "1px solid var(--ide-border)",
          borderRadius: "5px",
          padding: "2px",
        }}
      >
        <button
          onClick={() => setEditor("vscode")}
          style={{
            height: "20px",
            padding: "0 9px",
            background: currentTheme === "vscode" ? "var(--ide-accent)" : "transparent",
            color: currentTheme === "vscode" ? "#ffffff" : "var(--ide-text-dim)",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          VSCode
        </button>
        <button
          onClick={() => setEditor("eclipse")}
          style={{
            height: "20px",
            padding: "0 9px",
            background: currentTheme === "eclipse" ? "var(--ide-accent)" : "transparent",
            color: currentTheme === "eclipse" ? "#ffffff" : "var(--ide-text-dim)",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          Eclipse
        </button>
        <button
          onClick={() => setEditor("intellij")}
          style={{
            height: "20px",
            padding: "0 9px",
            background: currentTheme === "intellij" ? "var(--ide-accent)" : "transparent",
            color: currentTheme === "intellij" ? "#ffffff" : "var(--ide-text-dim)",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          IntelliJ
        </button>
        <button
          onClick={() => setEditor("codeblocks")}
          style={{
            height: "20px",
            padding: "0 9px",
            background: currentTheme === "codeblocks" ? "var(--ide-accent)" : "transparent",
            color: currentTheme === "codeblocks" ? "#ffffff" : "var(--ide-text-dim)",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          Code::Blocks
        </button>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setMode(isDark ? "light" : "dark")}
        style={{
          height: "26px",
          width: "28px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--ide-ctrl-bg)",
          border: "1px solid var(--ide-border)",
          borderRadius: "5px",
          color: "var(--ide-text)",
          cursor: "pointer",
          fontSize: "13px",
          padding: 0,
          transition: "all 0.15s ease",
        }}
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>

      {/* Leave Room Button */}
      <button
        onClick={() => router.push("/")}
        style={{
          height: "26px",
          padding: "0 12px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(242, 90, 90, 0.15)",
          border: "1px solid rgba(242, 90, 90, 0.35)",
          color: "#ff6b6b",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: 600,
          transition: "all 0.15s ease",
        }}
      >
        Leave
      </button>
    </div>
  );
}
