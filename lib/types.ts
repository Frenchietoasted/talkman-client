import React from "react";

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  type?: "user" | "system" | "code" | "error" | "message" | "join";
  //editor?: string;
}

export type Mode = "light" | "dark";
export type Editor = "vscode" | "eclipse" | "vim"

export interface IDEProps {
  //webSocket: WebSocket;
  roomId: string;
  mode: Mode;
  setMode: (mode: Mode) => void;
  editor: string;
  setEditor: (editor: string) => void;
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: (e?: React.SubmitEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  wsConnected: boolean;
  copiedCode: boolean;
  copyRoomCode: () => void;
}
