import React from "react";

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isSelf?: boolean;
  type?: "user" | "system" | "code";
  editor?: string;
}

export type Mode = "light" | "dark";
export type Editor = "vscode" | "eclipse" | "intellij" | "codeblocks";

export interface IDEProps {
  roomId: string;
  mode: Mode;
  setMode: (mode: Mode) => void;
  editor: Editor;
  setEditor: (editor: Editor) => void;
  messages: Message[];
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  wsConnected: boolean;
  copiedCode: boolean;
  copyRoomCode: () => void;
}
