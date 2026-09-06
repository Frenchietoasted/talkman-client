"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Message, Mode, Editor, IDEProps } from "./components/types";
import VSCodeView from "./components/VSCodeView";
import EclipseView from "./components/EclipseView";
import IntelliJView from "./components/IntelliJView";
import CodeBlocksView from "./components/CodeBlocksView";

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const roomId = (params?.id as string) || "unknown";
  const initialMode = (searchParams.get("mode") as Mode) || "dark";
  const initialEditor = (searchParams.get("editor") as Editor) || "vscode";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [editor, setEditor] = useState<Editor>(initialEditor);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const isDark = mode === "dark";

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect to WebSocket Server
  useEffect(() => {
    let socket: WebSocket | null = null;
    try {
      socket = new WebSocket("ws://localhost:8080");
      wsRef.current = socket;

      socket.onopen = () => {
        setWsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "system") return;
          if (!data.roomId || data.roomId === roomId) {
            setMessages((prev) => [
              ...prev,
              {
                id: data.id || "msg-" + Date.now() + Math.random(),
                sender: data.sender || "Peer",
                text: data.text || "",
                timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                type: data.type || "user",
                isSelf: false,
                editor: data.editor,
              },
            ]);
          }
        } catch {
          // ignore non-json messages
        }
      };

      socket.onclose = () => setWsConnected(false);
      socket.onerror = () => setWsConnected(false);
    } catch {
      setWsConnected(false);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [roomId, editor]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const isCodeBlock =
      text.startsWith("```") ||
      (text.includes("\n") && (text.includes("const ") || text.includes("function ") || text.includes("import ")));
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "You",
      text,
      timestamp: time,
      isSelf: true,
      type: isCodeBlock ? "code" : "user",
      editor,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          id: newMsg.id,
          roomId,
          sender: `Pair Partner (${editor})`,
          text,
          timestamp: time,
          type: newMsg.type,
          editor,
        })
      );
    }
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const ideProps: IDEProps = {
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
  };

  return (
    <div className={`ide-root ide-${editor} ${isDark ? "theme-dark" : "theme-light"}`}>
      <style>{`
        /* ========================================================
           GLOBAL RESETS & IDE FONT DEFINITIONS
        ======================================================== */
        .ide-root {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          user-select: none;
          box-sizing: border-box;
        }
        .ide-root * { box-sizing: border-box; }

        /* ========================================================
           THEME 1: VISUAL STUDIO CODE (VS CODE)
        ======================================================== */
        .ide-vscode.theme-dark {
          --ide-bg: #1e1e1e;
          --ide-sidebar: #252526;
          --ide-activity: #333333;
          --ide-activity-fg: #ffffff;
          --ide-activity-badge: #007acc;
          --ide-status: #007acc;
          --ide-status-fg: #ffffff;
          --ide-titlebar: #323233;
          --ide-tab-active: #1e1e1e;
          --ide-tab-inactive: #2d2d2d;
          --ide-tab-border: #252526;
          --ide-border: #3c3c3c;
          --ide-text: #cccccc;
          --ide-text-dim: #858585;
          --ide-text-bright: #ffffff;
          --ide-input-bg: #3c3c3c;
          --ide-input-border: #3c3c3c;
          --ide-ctrl-bg: #1e1e1e;
          --ide-accent: #007acc;
          --ide-accent-hover: #0098ff;
          --ide-gutter: #858585;
          --ide-line-num: #5c6370;
          --ide-code-bg: #141414;
          --ide-self-msg: #094771;
          --ide-other-msg: #262c33;
        }
        .ide-vscode.theme-light {
          --ide-bg: #ffffff;
          --ide-sidebar: #f3f3f3;
          --ide-activity: #2c2c2c;
          --ide-activity-fg: #ffffff;
          --ide-activity-badge: #007acc;
          --ide-status: #007acc;
          --ide-status-fg: #ffffff;
          --ide-titlebar: #dddddd;
          --ide-tab-active: #ffffff;
          --ide-tab-inactive: #ececec;
          --ide-tab-border: #f3f3f3;
          --ide-border: #e4e4e4;
          --ide-text: #333333;
          --ide-text-dim: #717171;
          --ide-text-bright: #000000;
          --ide-input-bg: #ffffff;
          --ide-input-border: #cecece;
          --ide-ctrl-bg: #ffffff;
          --ide-accent: #007acc;
          --ide-accent-hover: #005a9e;
          --ide-gutter: #a6a6a6;
          --ide-line-num: #888888;
          --ide-code-bg: #f8f8f8;
          --ide-self-msg: #dbeafe;
          --ide-other-msg: #f1f5f9;
        }

        /* ========================================================
           THEME 2: ECLIPSE IDE (Authentic Eclipse GTK / Dark Theme)
        ======================================================== */
        .ide-eclipse.theme-dark {
          --ide-bg: #1e1e1e;
          --ide-sidebar: #252525;
          --ide-activity: #303030;
          --ide-activity-fg: #ffffff;
          --ide-activity-badge: #3875d7;
          --ide-titlebar: #333333;
          --ide-tab-active: #1e1e1e;
          --ide-tab-inactive: #2b2b2b;
          --ide-border: #3c3c3c;
          --ide-text: #cccccc;
          --ide-text-dim: #888888;
          --ide-text-bright: #ffffff;
          --ide-input-bg: #1e1e1e;
          --ide-input-border: #4a4a4a;
          --ide-ctrl-bg: #2d2d2d;
          --ide-accent: #3875d7;
          --ide-accent-hover: #4e88e6;
          --ide-status: #2c2c2c;
          --ide-status-fg: #aaaaaa;
          --ide-code-bg: #1e1e1e;
          --ide-self-msg: #20354b;
          --ide-other-msg: #272727;
        }
        .ide-eclipse.theme-light {
          --ide-bg: #ffffff;
          --ide-sidebar: #fafafa;
          --ide-activity: #e8e8e8;
          --ide-activity-fg: #24292e;
          --ide-activity-badge: #0366d6;
          --ide-titlebar: #e8e8e8;
          --ide-tab-active: #ffffff;
          --ide-tab-inactive: #e8e8e8;
          --ide-border: #d0d7de;
          --ide-text: #24292e;
          --ide-text-dim: #57606a;
          --ide-text-bright: #000000;
          --ide-input-bg: #ffffff;
          --ide-input-border: #d0d7de;
          --ide-ctrl-bg: #ffffff;
          --ide-accent: #0366d6;
          --ide-accent-hover: #0969da;
          --ide-status: #e8e8e8;
          --ide-status-fg: #24292e;
          --ide-code-bg: #ffffff;
          --ide-self-msg: #ddf4ff;
          --ide-other-msg: #f6f8fa;
        }

        /* ========================================================
           THEME 3: INTELLIJ IDEA (JETBRAINS)
        ======================================================== */
        .ide-intellij.theme-dark {
          --ide-bg: #1e1f22;
          --ide-sidebar: #2b2d30;
          --ide-activity: #1e1f22;
          --ide-activity-fg: #ffffff;
          --ide-activity-badge: #3574f0;
          --ide-titlebar: #2b2d30;
          --ide-tab-active: #1e1f22;
          --ide-tab-inactive: #2b2d30;
          --ide-border: #393b40;
          --ide-text: #bcbec4;
          --ide-text-dim: #767a85;
          --ide-text-bright: #ffffff;
          --ide-input-bg: #1e1f22;
          --ide-input-border: #4e5157;
          --ide-ctrl-bg: #1e1f22;
          --ide-accent: #3574f0;
          --ide-accent-hover: #4e85f3;
          --ide-status: #2b2d30;
          --ide-status-fg: #868a91;
          --ide-code-bg: #141517;
          --ide-self-msg: #21324e;
          --ide-other-msg: #282a2e;
        }
        .ide-intellij.theme-light {
          --ide-bg: #ffffff;
          --ide-sidebar: #f7f8fa;
          --ide-activity: #ebecf0;
          --ide-activity-fg: #27282e;
          --ide-activity-badge: #3574f0;
          --ide-titlebar: #ebecf0;
          --ide-tab-active: #ffffff;
          --ide-tab-inactive: #f7f8fa;
          --ide-border: #dfe1e5;
          --ide-text: #27282e;
          --ide-text-dim: #818594;
          --ide-text-bright: #000000;
          --ide-input-bg: #ffffff;
          --ide-input-border: #c4c7cc;
          --ide-ctrl-bg: #ffffff;
          --ide-accent: #3574f0;
          --ide-accent-hover: #2663e0;
          --ide-status: #f7f8fa;
          --ide-status-fg: #6c707e;
          --ide-code-bg: #f4f5f7;
          --ide-self-msg: #e8f0fe;
          --ide-other-msg: #f0f2f5;
        }

        /* ========================================================
           THEME 4: CODE::BLOCKS (wxWidgets / wxAUI)
        ======================================================== */
        .ide-codeblocks.theme-dark {
          --ide-bg: #1e2227;
          --ide-sidebar: #21252b;
          --ide-activity: #282c34;
          --ide-activity-fg: #ffffff;
          --ide-activity-badge: #2f9e44;
          --ide-titlebar: #24282f;
          --ide-tab-active: #282c34;
          --ide-tab-inactive: #1e2227;
          --ide-border: #333842;
          --ide-text: #abb2bf;
          --ide-text-dim: #5c6370;
          --ide-text-bright: #ffffff;
          --ide-input-bg: #17191d;
          --ide-input-border: #3e4451;
          --ide-ctrl-bg: #21252b;
          --ide-accent: #2f9e44;
          --ide-accent-hover: #37b24d;
          --ide-status: #1e2227;
          --ide-status-fg: #abb2bf;
          --ide-code-bg: #1e2227;
          --ide-self-msg: #21324e;
          --ide-other-msg: #282c34;
        }
        .ide-codeblocks.theme-light {
          --ide-bg: #ffffff;
          --ide-sidebar: #f5f5f5;
          --ide-activity: #ebe9ed;
          --ide-activity-fg: #333333;
          --ide-activity-badge: #2f9e44;
          --ide-titlebar: #e0dfdf;
          --ide-tab-active: #ffffff;
          --ide-tab-inactive: #ebe9ed;
          --ide-border: #b8b8b8;
          --ide-text: #24292e;
          --ide-text-dim: #6a737d;
          --ide-text-bright: #000000;
          --ide-input-bg: #ffffff;
          --ide-input-border: #b8b8b8;
          --ide-ctrl-bg: #ebe9ed;
          --ide-accent: #2f9e44;
          --ide-accent-hover: #2b8a3e;
          --ide-status: #ebe9ed;
          --ide-status-fg: #24292e;
          --ide-code-bg: #ffffff;
          --ide-self-msg: #e8f5e9;
          --ide-other-msg: #f8f9fa;
        }
      `}</style>

      {editor === "vscode" && <VSCodeView {...ideProps} />}
      {editor === "eclipse" && <EclipseView {...ideProps} />}
      {editor === "intellij" && <IntelliJView {...ideProps} />}
      {editor === "codeblocks" && <CodeBlocksView {...ideProps} />}
    </div>
  );
}
