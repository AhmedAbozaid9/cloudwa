"use client";
import { getMessages } from "@/apiRequests/chat/getMessages";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

const MainChat = () => {
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
  });
  const fakeMessages = [
    { user: "me", message: "Hello, world!" },
    { user: "you", message: "Hi there!" },
    { user: "me", message: "How are you doing today?" },
    { user: "you", message: "I'm good, thanks! What about you?" },
    { user: "me", message: "I'm doing great. Just working on some code." },
    { user: "you", message: "Nice! What are you building?" },
    { user: "me", message: "A chat app, actually!" },
    { user: "you", message: "That's awesome. Need any help?" },
    { user: "me", message: "Not yet, but thanks for offering!" },
    { user: "you", message: "No problem! Let me know if you do." },
  ];
  return (
    <div>
      <div>
        {fakeMessages.map((message, index) => (
          <Message key={index} message={message.message} user={message.user} />
        ))}
      </div>
      <SendMessage />
    </div>
  );
};

export default MainChat;
