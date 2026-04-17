"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Paperclip, Smile, Mic, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useChatSocket from "@/app/features/chat socket/useChatSocket";

const getInitials = (name = "") => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "?";
};

const formatMessageDate = (value) => {
  if (!value) return "";

  if (Array.isArray(value) && value.length >= 3) {
    return `${value[2]}-${value[1]}-${value[0]}`;
  }

  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return "";
};

export default function MessagesUI() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const participantId = searchParams.get("participantId");
  const participantName = searchParams.get("participantName") || "";

  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  const {
    sendMessage,
    chatUsers,
    messages,
    currentChat,
    currentUserId,
    connectionStatus,
    loadConversation,
    handleSidebarClick,
  } = useChatSocket();

  useEffect(() => {
    if (!conversationId) return;

    loadConversation(conversationId, participantName, participantId);
  }, [conversationId, loadConversation, participantId, participantName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredChatUsers = chatUsers.filter((chat) => {
    const name = chat?.participant_name || chat?.name || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayName = currentChat?.participant_name || participantName || "Select a chat";
  const displayInitials = getInitials(displayName);
  const hasSelectedChat = Boolean(currentChat?.id);

  const handleSendMessage = () => {
    const sent = sendMessage(message);
    if (sent) {
      setMessage("");
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex min-h-screen max-h-screen flex-col overflow-hidden bg-gray-100 lg:flex-row">
      <div className="flex w-full flex-col border-r bg-white lg:w-[340px]">
        <div className="border-b p-3">
          <div className="flex items-center rounded-lg bg-gray-100 px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              className="ml-2 w-full bg-transparent text-sm text-gray-700 outline-none"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChatUsers.length > 0 ? (
            filteredChatUsers.map((chat) => {
              const chatName = chat?.participant_name || chat?.name || "Unknown User";
              const chatConversationId = chat?.conversation_id || chat?.id;
              const isActive =
                hasSelectedChat && String(chatConversationId) === String(currentChat?.id);

              return (
                <button
                  key={chatConversationId || chat?.participant_id || chat?.user_id || chatName}
                  type="button"
                  className={`flex w-full items-center px-4 py-3 text-left text-black transition ${
                    isActive ? "bg-lime-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleSidebarClick(chat)}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold">
                    {getInitials(chatName)}
                  </span>

                  <span className="ml-3 min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium">{chatName}</span>
                      <span className="shrink-0 text-xs text-gray-400">
                        {formatMessageDate(chat?.last_message_time)}
                      </span>
                    </span>
                    <span className="block truncate text-xs text-gray-500">
                      {chat?.last_message || "No messages yet"}
                    </span>
                  </span>
                </button>
              );
            })
          ) : (
            <div className="flex min-h-[320px] flex-col items-center justify-center px-4 text-center">
              <div className="text-5xl">💬</div>
              <p className="mt-3 font-semibold text-gray-700">No conversations yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Start a conversation to see messages here
              </p>
            </div>
          )}
        </div>
      </div>

      {hasSelectedChat ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b bg-white p-3 sm:p-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                {displayInitials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black sm:text-base">
                  {displayName}
                </p>
                <p className="text-xs text_lime">
                  {connectionStatus === "connected" ? "● Online" : "Connecting..."}
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 sm:p-6">
            {messages.length > 0 ? (
              messages.map((msg, index) => {
                const isMe = String(msg?.sender_id) === String(currentUserId);

                return (
                  <div
                    key={msg?.id || msg?.message_id || index}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[78%] break-words rounded-2xl px-4 py-2 text-sm text-black sm:max-w-md ${
                        isMe
                          ? "rounded-br-none bg-green-200"
                          : "rounded-bl-none bg-gray-200"
                      }`}
                    >
                      {msg?.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="text-5xl">📩</div>
                <p className="mt-3 font-semibold text-gray-700">No messages yet</p>
                <p className="text-sm text-gray-500">Start the conversation below</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t bg-white p-2 sm:gap-3 sm:p-3">
            <button type="button" className="text-lg text-gray-500 sm:text-xl">
              +
            </button>

            <input
              placeholder="Type your message..."
              className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-black outline-none sm:px-4"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />

            <div className="hidden items-center gap-2 sm:flex">
              <Paperclip size={18} className="text-gray-500" />
              <Smile size={18} className="text-gray-500" />
              <Mic size={18} className="text-gray-500" />
            </div>

            <button
              type="button"
              className="rounded-lg bg-lime-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={!message.trim() || connectionStatus !== "connected"}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden flex-1 items-center justify-center bg-white lg:flex">
          <div className="text-center">
            <div className="text-6xl">💬</div>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Select a chat to start messaging
            </p>
            <p className="text-sm text-gray-500">Your conversations will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
}
