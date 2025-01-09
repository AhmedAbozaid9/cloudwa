"use client";
import { ChatMessageTypes, getMessages } from "@/apiRequests/chat/getMessages";
import {
  ReturnedMessageTypes,
  sendMessage,
} from "@/apiRequests/chat/sendMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import Pusher from "pusher-js";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const MainChat = () => {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialData: [],
  });
  const queryClient = useQueryClient();

  const [didReceiveNewMessage, setDidReceiveNewMessage] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for the chat container

  const handleSendMessage = async (message: string) => {
    try {
      const sentMessage = await sendMessage(message);
      scrollToBottom();
      queryClient.setQueryData(
        ["messages"],
        (oldMessages: ChatMessageTypes[]) => [...oldMessages, sentMessage]
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      authEndpoint: "https://cloudwa.net/api/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      },
    });

    const channel = pusher.subscribe(
      "private-session.9b6fcf1c-efbe-4c3d-925c-cb3b24131c67"
    );

    channel.bind("wa_message", (data: any) => {
      queryClient.setQueryData(["messages"], (oldMessages: any) => [
        ...oldMessages,
        data.payload,
      ]);
      setDidReceiveNewMessage(true);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [queryClient]);

  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;

      if (scrollHeight - scrollTop !== clientHeight) {
        setIsAtBottom(false);
      } else {
        setIsAtBottom(true);
      }

      chatContainerRef.current.scrollTop = scrollHeight;
      setDidReceiveNewMessage(false);
    }
  };

  return (
    <div>
      <div
        ref={chatContainerRef}
        className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide"
      >
        {messages.length > 0 &&
          messages.map(
            (
              message: ChatMessageTypes | ReturnedMessageTypes,
              index: number
            ) => (
              <Message
                key={index}
                message={"body" in message ? message.body : message.message}
                isSender={
                  "is" in message
                    ? message.is.sender
                    : message.phone === "201028814701@c.us"
                }
              />
            )
          )}
      </div>
      {/* This div will trigger scroll to the bottom */}
      <div ref={messagesEndRef} />

      <SendMessage handleSendMessage={handleSendMessage} />

      {/* Show scroll-to-bottom button if a new message has been received and the user is not at the bottom */}
      {didReceiveNewMessage && !isAtBottom && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 right-5 p-3 bg-purple-700 text-white rounded-full"
        >
          <ChevronDown />
        </button>
      )}
    </div>
  );
};

export default MainChat;
