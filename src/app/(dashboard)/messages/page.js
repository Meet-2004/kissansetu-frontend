"use client";
import { useEffect } from "react";
import { Search, Paperclip, Smile, Mic, Send, Bell } from "lucide-react";
import { useSearchParams } from "next/navigation";
import useChatSocket from "@/app/features/chat socket/useChatSocket";
import { useRef } from "react";
import { useState } from "react";

export default function MessagesUI() {
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");
  const participantName = searchParams.get("participantName") || "";
  const [message,setMessage]=useState("");
    

  const {
    sendMessage,
    chatUsers,
    messages,
    currentChat,
    getCurrentChat,
    loadConversation,
    handleMessageClick,
    connectWebSocket,
  } = useChatSocket();

  useEffect(() => {
    if (!conversationId) return;
    loadConversation(conversationId, participantName);
  }, [conversationId, loadConversation, participantName]);

  useEffect(()=>{
    const loggeduser=localStorage.getItem("persist:auth");
    const loggeduserId=JSON.parse(loggeduser);
    connectWebSocket(loggeduserId.id)
  },[])

  const displayName = currentChat?.participant_name || participantName || "Unknown User";
  const userId=currentChat?.owner_id || conversationId || " unknown id";
  console.log("this is current chat id ",userId);
  // const userId = getCurrentChat()?.id || conversationId;
  console.log("this is current chat ",currentChat);
  const displayInitials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

  console.log("Chat Users:", chatUsers);
  console.log("Messages:", messages);
  console.log("Current Chat:", currentChat);
  console.log("handleMessageClick:", handleMessageClick);
  console.log("sendMessage:", sendMessage);
  console.log("getCurrentChat():", getCurrentChat()); // Call the function, not the ref


 const handleMessage=async  ()=>{
      const sent = await sendMessage(userId,message); 
      if(sent){
        setMessage("");
      }
    }
  //  getCurrentChat();


  


  return (
    <div className="flex overflow-y-hidden bg-gray-100 min-h-[17.5cm] max-h-[17.6cm]">

      {/* LEFT SIDEBAR */}
      <div className="w-[320px] bg-white border-r flex flex-col overflow-hidden ">

        {/* Header */}
        {/* <div className="p-4 font-semibold text-lg border-b">
          Messages
        </div> */}

        {/* Search */}
        <div className="p-3 border-b">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={16} className="text-gray-400"/>
            <input
              className="bg-transparent outline-none ml-2 text-sm w-full text-gray-700"
              placeholder="Search messages..."
              
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-scroll">

          {chatUsers && chatUsers.length > 0  && chatUsers.map((chat,i)=>(
            <div key={i} className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-black" onClick={()=>{handleMessageClick(chat.user_id)}}>

              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold">
                {chat.name[0].toUpperCase()}
              </div>

              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <p className="font-medium text-sm">{chat.name}</p>
                  <span className="text-xs text-gray-400">{chat.last_message_time.slice(0,10)}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.last_message}</p>
              </div>

            </div>
          ))}

        </div>
      </div>


      {/* RIGHT CHAT SECTION */}
      { chatUsers && chatUsers.length > 0 && currentChat!==null ? (
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="bg-white border-b p-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
              {displayInitials}
            </div>

            <div>
              <p className="font-semibold text-black">{displayName}</p>
              <p className="text-xs text_lime">● Verified Buyer</p>
            </div>

          </div>

         

        </div>


        {/* CHAT MESSAGES */}
        <div className="flex-1  p-6 space-y-4 bg-gray-50 overflow-y-scroll">
        {messages && messages.length > 0 && messages.map((msg,i)=>{

          const isMe = msg.sender_id == userId ;
  
        return(
      
          <div
      key={i}
      className={`flex mb-2 ${!isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          px-4 py-2 rounded-2xl max-w-xs break-words
          ${!isMe
            ? "bg-green-200 text-black rounded-br-none" 
            : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        {msg.content}
      </div>
    </div>
          
 ) }  )}
        </div>


        {/* MESSAGE INPUT */}
        <div className="bg-white border-t p-3 flex items-center gap-3">

          <button className="text-gray-500 text-xl">+</button>

          <input
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 px-4 py-2 rounded-lg outline-none text-black"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}

          />

          <Paperclip size={18} className="text-gray-500"/>
          <Smile size={18} className="text-gray-500"/>
          <Mic size={18} className="text-gray-500"/>

          <button className="bg-lime-500 p-2 rounded-lg text-white" onClick={handleMessage} onEnter={handleMessage}>
            <Send size={18}/>
          </button> 

        </div>

      </div>
     )
     :(<div className="bg-white"></div>) }
    </div>
  );
}
