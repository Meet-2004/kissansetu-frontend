"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const getLoggedInUserId = () => {
  if (typeof window === "undefined") return null;

  try {
    const userData = localStorage.getItem("persist:auth");
    if (!userData) return null;

    const parsed = JSON.parse(userData);
    return parsed?.id || null;
  } catch {
    return null;
  }
};
// ws://192.168.29.218:8000/ws/chat/${userId}`
const getSocketUrl = (userId) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_PYTHON || "ws://192.168.29.218:8000";
  const wsUrl = apiUrl.replace(/^http/, "ws").replace(/\/$/, "");

  return `${wsUrl}/ws/chat/${userId}`;
};

const getParticipantId = (chat) => {
  return chat?.participant_id || chat?.user_id || chat?.receiver_id || chat?.buyerId || null;
};

const getParticipantName = (chat) => {
  return chat?.participant_name || chat?.name || chat?.conversation_name || "";
};

const getConversationId = (chat) => {
  return chat?.conversation_id || chat?.id || null;
};

const getMessageKey = (message) => {
  return (
    message?.id ||
    message?.message_id ||
    `${message?.conversation_id || ""}-${message?.sender_id || ""}-${message?.content || ""}-${
      message?.timestamp || message?.created_at || ""
    }`
  );
};

const uniqueMessages = (incomingMessages = []) => {
  const seen = new Set();

  return incomingMessages.filter((message) => {
    const key = getMessageKey(message);
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const appendUniqueMessage = (previousMessages, nextMessage) => {
  if (!nextMessage) return previousMessages;

  const nextKey = getMessageKey(nextMessage);
  const alreadyExists = previousMessages.some((message) => getMessageKey(message) === nextKey);

  return alreadyExists ? previousMessages : [...previousMessages, nextMessage];
};

const useChatSocket = () => {
  const router = useRouter();
  const socketRef = useRef(null);
  const pendingOpenCallbacksRef = useRef([]);
  const currentChatRef = useRef(null);
  const selectedConversationIdRef = useRef(null);

  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("idle");

  const syncCurrentChat = useCallback((chat) => {
    currentChatRef.current = chat;
    selectedConversationIdRef.current = chat?.id || null;
    setCurrentChat(chat);
  }, []);

  const sendSocketPayload = useCallback((payload) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) return false;

    socketRef.current.send(JSON.stringify(payload));
    return true;
  }, []);

  const requestChatUsers = useCallback(() => {
    sendSocketPayload({ type: "get_chat_users" });
  }, [sendSocketPayload]);

  const requestConversationMessages = useCallback(
    (conversationId) => {
      if (!conversationId) return false;

      return sendSocketPayload({
        type: "get_messages",
        conversation_id: conversationId,
      });
    },
    [sendSocketPayload],
  );

  const handleIncomingMessage = useCallback(
    (data) => {
      switch (data?.type) {
        case "connection_established":
          break;

        case "chat_users":
          setChatUsers(Array.isArray(data.data) ? data.data : []);
          break;

        case "conversation": {
          const conversation = data.data || {};
          const nextChat = {
            id: getConversationId(conversation),
            participant_id: getParticipantId(conversation),
            participant_name: getParticipantName(conversation),
          };

          syncCurrentChat(nextChat);
          setMessages([]);
          requestConversationMessages(nextChat.id);

          const params = new URLSearchParams();
          params.set("conversationId", nextChat.id);
          if (nextChat.participant_id) params.set("participantId", nextChat.participant_id);
          if (nextChat.participant_name) params.set("participantName", nextChat.participant_name);

          router.push(`/messages?${params.toString()}`);
          break;
        }

        case "messages": {
          const responseConversationId = data.conversation_id || data.conversationId;

          if (
            responseConversationId &&
            selectedConversationIdRef.current &&
            String(responseConversationId) !== String(selectedConversationIdRef.current)
          ) {
            return;
          }

          setMessages(uniqueMessages(Array.isArray(data.data) ? data.data : []));
          break;
        }

        case "new_message": {
          const incomingConversationId =
            data.message?.conversation_id || data.conversation_id || data.conversationId;

          if (
            incomingConversationId &&
            selectedConversationIdRef.current &&
            String(incomingConversationId) !== String(selectedConversationIdRef.current)
          ) {
            requestChatUsers();
            return;
          }

          setMessages((prev) => appendUniqueMessage(prev, data.message));
          requestChatUsers();
          break;
        }

        case "error":
          console.error("Chat socket error:", data.message || data);
          break;

        default:
          break;
      }
    },
    [requestChatUsers, requestConversationMessages, router, syncCurrentChat],
  );

  const flushOpenCallbacks = useCallback(() => {
    const callbacks = pendingOpenCallbacksRef.current;
    pendingOpenCallbacksRef.current = [];
    callbacks.forEach((callback) => callback?.());
  }, []);

  const connectWebSocket = useCallback(
    (userId = getLoggedInUserId(), onOpenCallback) => {
      if (!userId) return false;

      if (onOpenCallback) {
        pendingOpenCallbacksRef.current.push(onOpenCallback);
      }

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        flushOpenCallbacks();
        return true;
      }

      if (socketRef.current?.readyState === WebSocket.CONNECTING) {
        return true;
      }

      setConnectionStatus("connecting");
      socketRef.current = new WebSocket(getSocketUrl(userId));

      socketRef.current.onopen = () => {
        setConnectionStatus("connected");
        requestChatUsers();
        flushOpenCallbacks();
      };

      socketRef.current.onmessage = (event) => {
        try {
          handleIncomingMessage(JSON.parse(event.data));
        } catch (error) {
          console.error("Invalid chat socket message:", error);
        }
      };

      socketRef.current.onclose = () => {
        setConnectionStatus("closed");
        socketRef.current = null;
      };

      socketRef.current.onerror = (error) => {
        setConnectionStatus("error");
        console.error("Chat socket connection failed:", error);
      };

      return true;
    },
    [flushOpenCallbacks, handleIncomingMessage, requestChatUsers],
  );

  const handleMessageClick = useCallback(
    (participantId, participantName = "") => {
      if (!participantId) return false;

      return connectWebSocket(getLoggedInUserId(), () => {
        sendSocketPayload({
          type: "get_or_create_conversation",
          participant_id: participantId,
          participant_name: participantName,
        });
      });
    },
    [connectWebSocket, sendSocketPayload],
  );

  const loadConversation = useCallback(
    (conversationId, participantName = "", participantId = null) => {
      if (!conversationId) return false;

      const nextChat = {
        id: conversationId,
        participant_id: participantId,
        participant_name: participantName,
      };

      syncCurrentChat(nextChat);
      setMessages([]);

      return connectWebSocket(getLoggedInUserId(), () => {
        requestConversationMessages(conversationId);
      });
    },
    [connectWebSocket, requestConversationMessages, syncCurrentChat],
  );

  const handleSidebarClick = useCallback(
    (chatUser) => {
      const conversationId = getConversationId(chatUser);
      const participantId = getParticipantId(chatUser);
      const participantName = getParticipantName(chatUser);

      if (conversationId) {
        loadConversation(conversationId, participantName, participantId);

        const params = new URLSearchParams();
        params.set("conversationId", conversationId);
        if (participantId) params.set("participantId", participantId);
        if (participantName) params.set("participantName", participantName);
        router.push(`/messages?${params.toString()}`);

        return true;
      }

      return handleMessageClick(participantId, participantName);
    },
    [handleMessageClick, loadConversation, router],
  );

  const sendMessage = useCallback(
    (content) => {
      const trimmedContent = content?.trim();
      const receiverId = currentChatRef.current?.participant_id;

      if (!receiverId || !trimmedContent) return false;

      return sendSocketPayload({
        type: "send_message",
        receiver_id: receiverId,
        conversation_id: currentChatRef.current?.id,
        content: trimmedContent,
      });
    },
    [sendSocketPayload],
  );

  useEffect(() => {
    connectWebSocket();

    return () => {
      pendingOpenCallbacksRef.current = [];
      socketRef.current?.close();
    };
  }, [connectWebSocket]);

  return {
    chatUsers,
    messages,
    currentChat,
    currentUserId: getLoggedInUserId(),
    connectionStatus,
    handleSidebarClick,
    handleMessageClick,
    loadConversation,
    sendMessage,
    connectWebSocket,
  };
};

export default useChatSocket;
