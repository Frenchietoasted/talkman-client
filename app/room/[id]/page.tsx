"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Message, Mode, Editor, IDEProps } from "@/lib/types";
import VSCodeView from "./components/VSCodeView";
import EclipseView from "./components/EclipseView";
import IntelliJView from "./components/IntelliJView";
import CodeBlocksView from "./components/CodeBlocksView";
import {
  connectToRoom,
  sendMessage,
  getAllMessages,
  getCookie,
} from "@/lib/chat-services";

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const roomId = (params?.id as string) || "unknown";
  const initialMode = (searchParams.get("mode") as Mode) || "dark";
  const initialEditor = (searchParams.get("editor") as Editor) || "vscode";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [editor, setEditor] = useState<string>(initialEditor);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const isDark = mode === "dark";
  
  // Connect to room
  useEffect(() => {
    let ws: WebSocket;

    try {
      ws = connectToRoom();
      wsRef.current = ws;
    } catch (error) {
      console.error("Failed to connect to room:", error);
    }
  }, [roomId]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const oldMessages = await getAllMessages(roomId);
        if (!cancelled) {
          setMessages(oldMessages);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    poll(); // initial fetch

    return () => {
      cancelled = true;
    };
  }, [roomId]);

  const handleSendMessage = (e?: React.SubmitEvent) => {
    e?.preventDefault();

    const text = inputText.trim();

    if (!text) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const isCodeBlock =
      text.startsWith("```") ||
      (text.includes("\n") &&
        (text.includes("const ") ||
          text.includes("function ") ||
          text.includes("import ")));

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg: Message = {
      id: "msg-" + Date.now(),
      sender: getCookie("username")!,
      text,
      timestamp: time,
      type: isCodeBlock ? "code" : "user",
    };

    // Send through WebSocket
    sendMessage(newMsg);

    setInputText("");
  };
  
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
    setCopiedCode(true);

    setTimeout(() => {
      setCopiedCode(false);
    }, 2000);
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
    <div
      className={`ide-root ide-${editor} ${
        isDark ? "theme-dark" : "theme-light"
      }`}
    >
      {!loading && (
        <div>
          <VSCodeView {...ideProps} />
        </div>
      )}
    </div>
  );
}
