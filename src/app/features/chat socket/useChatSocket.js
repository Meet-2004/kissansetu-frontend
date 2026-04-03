"use client";
import { useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useChatSocket = () => {
  const socketRef = useRef(null);
  const isConnectingRef = useRef(false);
  const router = useRouter();
  const [chatUsers, setChatUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const currentChatRef = useRef(null);

  const mergeUniqueMessages = useCallback((incomingMessages) => {
    const seen = new Set();

    return incomingMessages.filter((message) => {
      const key = message?.id ?? `${message?.sender_id}-${message?.content}-${message?.timestamp}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const appendUniqueMessage = useCallback((previousMessages, nextMessage) => {
    const nextKey =
      nextMessage?.id ??
      `${nextMessage?.sender_id}-${nextMessage?.content}-${nextMessage?.timestamp}`;

    const alreadyExists = previousMessages.some((message) => {
      const messageKey =
        message?.id ?? `${message?.sender_id}-${message?.content}-${message?.timestamp}`;
      return messageKey === nextKey;
    });

    if (alreadyExists) {
      return previousMessages;
    }

    return [...previousMessages, nextMessage];
  }, []);

  //  Get userId
  const getUserId = () => {
    try {
      const userData = localStorage.getItem("persist:auth");
      if (!userData) return null;
      const parsed = JSON.parse(userData);
      return parsed?.id || null;
    } catch {
      return null;
    }
  };

  const getParticipantName = useCallback((conversation) => {
    return (
      conversation?.participant_name ||
      conversation?.participants_name ||
      conversation?.conversation_name ||
      ""
    );
  }, []);

  const requestConversationMessages = useCallback((conversationId,name) => {
    if (!conversationId || socketRef.current?.readyState !== WebSocket.OPEN) {
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "get_messages",
        conversation_id: conversationId,
        conversation_name:name,
      })
    );
  }, []);

  //  Handle backend events
  const handleIncomingMessage = useCallback((data) => {
    console.log("Handling message type:", data.type);
    
    switch (data.type) {
      case "connection_established":
        console.log("Socket ready");
        break;

      case "chat_users":
        console.log("Sidebar users:", data.data);
        setChatUsers(data.data);
        break;

      case "conversation":
        console.log("Conversation received:", data.data);
        // Store in ref for immediate access
        currentChatRef.current = data.data;
        setCurrentChat(currentChatRef.current);

        //  After getting conversation → load messages
        requestConversationMessages(data.data.id, getParticipantName(data.data));
        
        // Navigate with state to pass data
        const participantName = getParticipantName(data.data);
        const query = participantName
          ? `?conversationId=${data.data.participant_id}&participantName=${encodeURIComponent(participantName)}`
          : `?conversationId=${data.data.id}`;
        router.push(`/messages${query}`);
        break;

      case "messages":
        console.log("Chat history:", data.data);
        setMessages(mergeUniqueMessages(data.data));
        
        // Extract conversation info from messages response if not already set
        if (!currentChatRef.current && data.conversation_id) {
          const conversationData = {
            id: data.conversation_id,
            participant_name:
              currentChatRef.current?.participant_name ||
              currentChatRef.current?.participants_name ||
              currentChatRef.current?.conversation_name ||
              "",
            // You can add more fields here if backend provides them
            messages_count: data.data?.length || 0,
          };
          currentChatRef.current = conversationData;
          setCurrentChat(conversationData);
          console.log("Conversation set from messages:", conversationData);
        }
        break;

      case "new_message":
        console.log("Live message:", data.message);
        setMessages((prev) => appendUniqueMessage(prev, data.message));
        break;

      case "error":
        console.error("Error:", data.message);
        break;

      default:
        console.log("Unknown message type:", data);
    }
  }, [getParticipantName, requestConversationMessages, router]);

  const connectWebSocket = useCallback((userId, onOpenCallback, name) => {
  if (socketRef.current?.readyState === WebSocket.OPEN) {
    onOpenCallback?.();
    return;
  }

  if (socketRef.current?.readyState === WebSocket.CONNECTING || isConnectingRef.current) {
    return;
  }

  isConnectingRef.current = true;

  socketRef.current = new WebSocket(
    `ws://192.168.2.152:8000/ws/chat/${userId}`
  );

  socketRef.current.onopen = () => {
    isConnectingRef.current = false;
    console.log("Connected");
    socketRef.current.send(
      JSON.stringify({
        type: "get_chat_users",
      })
    );
    onOpenCallback?.();
  };

  socketRef.current.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Message received:", data.type, data);
    handleIncomingMessage(data);
  };

  socketRef.current.onclose = () => {
    isConnectingRef.current = false;
    console.log("WebSocket closed");
    socketRef.current = null;
  };

  socketRef.current.onerror = (error) => {
    isConnectingRef.current = false;
    console.error("WebSocket error:", error);
  };
}, [handleIncomingMessage]);

  useEffect(() => {
    return () => {
      isConnectingRef.current = false;
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  //  Start chat (button click)
  const handleMessageClick = (receiverId) => {
  const senderId = getUserId();
  console.log("Sender ID:", senderId, "Receiver ID:", receiverId);
  if (!senderId) return;

  connectWebSocket(senderId, () => {
    // Send ONLY after connection is open
    socketRef.current.send(
      JSON.stringify({
        type: "get_or_create_conversation",
        participant_id: receiverId,
        
      })
    );
  });
};

  const loadConversation = useCallback((conversationId, participantName = "") => {
    const senderId = getUserId();
    if (!senderId || !conversationId) return;

    const syncConversation = () => {
      const conversationData = {
        id: conversationId,
        participant_name: participantName,
      };
      currentChatRef.current = conversationData;
      setCurrentChat(conversationData);
      requestConversationMessages(conversationId, participantName);
    };

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      syncConversation();
      return;
    }

    connectWebSocket(senderId, syncConversation);
  }, [connectWebSocket, requestConversationMessages]);
  //  Send message
 const sendMessage =(receiverId, content) => {
    console.log("Sending message to:", receiverId, "Content:", content);

   socketRef.current?.send(
      JSON.stringify({
        type: "send_message",
        receiver_id: receiverId,
        content,
      })

    );
    return true;

  };

  // Get current chat immediately (for sync access)
  const getCurrentChat = () => {
    return currentChatRef.current;
  };

console.log("this is chat", currentChatRef.current);
  return {
    handleMessageClick,
    sendMessage,
    chatUsers,
    messages,
    currentChat,
    getCurrentChat,
    currentChatRef,
    loadConversation,
    connectWebSocket,
   
  };
};

export default useChatSocket;
