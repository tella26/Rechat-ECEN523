"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./ui/chat";
import Dropdown from "./ui/chat/chat-dropdown"; // Import the Dropdown component

export default function ChatSection() {
  const [selectedSection, setSelectedSection] = useState("Introduction");
  const [chatData, setChatData] = useState<{ [key: string]: any }>({
    Introduction: { messages: [], input: "" },
    Review: { messages: [], input: "" },
    Methodology: { messages: [], input: "" },
    Results: { messages: [], input: "" },
    Conclusion: { messages: [], input: "" },
  });

  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
  } = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      const message = JSON.parse(error.message);
      alert(message.detail);
    },
  });

  const handleSelect = (section: string) => {
    setSelectedSection(section);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
    setChatData((prev) => ({
      ...prev,
      [selectedSection]: { messages: messages, input: "" },
    }));
  };

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
    setChatData((prev) => ({
      ...prev,
      [selectedSection]: { messages: messages, input: e.target.value },
    }));
  };

  return (
    <div className="space-y-4 max-w-5xl w-full">
      <Dropdown onSelect={handleSelect} />
      <div>
        <h2 className="text-xl font-bold mb-4">{selectedSection}</h2>
        <div className="mb-4">
          <ChatMessages
            messages={chatData[selectedSection].messages}
            isLoading={isLoading}
            reload={reload}
            stop={stop}
          />
        </div>
        <ChatInput
          input={chatData[selectedSection].input}
          handleSubmit={handleChatSubmit}
          handleInputChange={handleChatInputChange}
          isLoading={isLoading}
          multiModal={true}
        />
      </div>
    </div>
  );
}
