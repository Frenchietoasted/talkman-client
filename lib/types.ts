import React from "react";

export interface Message {
  id: string;
  sender: string;
  text: string;
  timeStamp: string;
  type?: "user" | "system" | "code" | "error" | "message" | "join";
  //editor?: string;
}

export interface Notif {
  sender: string;
  text: string;
}

export type Mode = "light" | "dark";
export type Editor = "vscode" | "eclipse" | "intellij" | "codeblocks";

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
  handleSendMessage: (e?: React.FormEvent<HTMLFormElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  wsConnected: boolean;
  copiedCode: boolean;
  copyRoomCode: () => void;
}
