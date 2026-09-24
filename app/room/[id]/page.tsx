"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Message, Notif, Mode, Editor, IDEProps } from "@/lib/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VSCodeView from "./components/VSCodeView";
import IntelliJView from "./components/IntelliJView";
import EclipseView from "./components/EclipseView";
import CodeBlocksView from "./components/CodeBlocksView";
import { getAllMessages, getCookie } from "@/lib/chat-services";

export default function RoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const notify = (notif: Notif) => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification(notif.sender, {
        body: notif.text,
      });
      setTimeout(() => {
        notification.close();
      }, 1500);
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification(notif.text);
          setTimeout(() => {
            notification.close();
          }, 6000);
        }
      });
    }
    const message = `${notif.sender}: ${notif.text}`;
    toast.success(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
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
        }),
      );
      setWsConnected(true);
      notify({ sender: "system", text: `Joined room ${roomId}` });
    });

    socket.addEventListener("message", (event) => {
      try {
        const username = getCookie("username");
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
        const textContent = data.text || data.message || "";
        if (data.sender != username && textContent) {
          const trimmedMessage =
            textContent.length > 35
              ? textContent.substring(0, 35) + "..."
              : textContent;
          const message = {
            sender: data.sender || "system",
            text: trimmedMessage,
          };
          notify(message);
        }
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

    if (wsConnected) poll();

    return () => {
      cancelled = false;
    };
  }, [roomId, wsConnected]);
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
      timeStamp: time,
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
    <div
      className={`ide-root ide-${editor} ${isDark ? "theme-dark" : "theme-light"}`}
    >
        <div style={{ width: "100%", height: "100%" }}>
          {editor === "codeblocks" && <CodeBlocksView {...ideProps} />}
          {editor === "intellij" && <IntelliJView {...ideProps} />}
          {editor === "eclipse" && <EclipseView {...ideProps} />}
          {editor === "vscode" && <VSCodeView {...ideProps} />}
          {!["codeblocks", "intellij", "eclipse", "vscode"].includes(editor) && (
            <VSCodeView {...ideProps} />
          )}
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
    </div>
  );
}
