"use client";
import { ChatMessageTypes, getMessages } from "@/apiRequests/chat/getMessages";
import {
  ReturnedMessageTypes,
  sendMessage,
} from "@/apiRequests/chat/sendMessage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Pusher from "pusher-js";
import React, { useEffect } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const MainChat = () => {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialData: [],
  });

  const queryClient = useQueryClient();

  const handleSendMessage = async (message: string) => {
    try {
      const sentMessage = await sendMessage(message);
      console.log("sent message", sentMessage);
      await queryClient.setQueryData(
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
    });

    const channel = pusher.subscribe(
      "private-session.9b6fcf1c-efbe-4c3d-925c-cb3b24131c67"
    );

    // Listen for the "wa_message" event
    channel.bind("wa_message", (data: any) => {
      // Invalidate or update the React Query cache
      queryClient.setQueryData(["messages"], (oldMessages: any) => [
        ...oldMessages,
        data,
      ]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [queryClient]);

  return (
    <div>
      <div className="h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide">
        {messages
          ?.slice(1)
          .map(
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

      <SendMessage handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default MainChat;
