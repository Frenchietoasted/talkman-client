"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Message, Mode, Editor, IDEProps } from "@/lib/types";
import VSCodeView from "./components/VSCodeView";
import { getAllMessages, getCookie } from "@/lib/chat-services";

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

  function sendMessage(message: Message) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    wsRef.current.send(JSON.stringify(message));
  }

  // Connect to room
  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_WSS_SERVER_URL;
    if (!serverUrl) {
      console.error("WebSocket URL is not configured");
      return;
    }

    const socket = new WebSocket(serverUrl);
    wsRef.current = socket;

    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
      setWsConnected(true);

      const username = getCookie("username");
      const roomIdCookie = getCookie("roomId");

      if (!username || !roomIdCookie) {
        console.error("Username or roomId cookie missing");
        socket.close();
        return;
      }

      socket.send(
        JSON.stringify({
          type: "join",
          username,
          roomId: roomIdCookie,
        })
      );
      setWsConnected(true);
    });

    socket.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error("Failed to parse incoming message:", err);
      }
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket disconnected");
      setWsConnected(false);
    });

    socket.addEventListener("error", (err) => {
      console.error("WebSocket error:", err);
    });
    
    return () => {
      socket.close();
      wsRef.current = null;
    };
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

    if (wsConnected)
      poll();

    return () => {
      cancelled = false;
    }
  },[roomId,wsConnected])
  const handleSendMessage = (e?: React.FormEvent<HTMLFormElement>) => {
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

    const username = getCookie("username");
    if (!username) {
      console.error("No username cookie set");
      return;
    }

    const newMsg: Message = {
      id: "msg-" + Date.now(),
      sender: username,
      text,
      timestamp: time,
      type: isCodeBlock ? "code" : "user",
    };

    sendMessage(newMsg);
    setInputText("");
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
      {!loading && (
        <div>
          <VSCodeView {...ideProps} />
        </div>
      )}
    </div>
  );
}