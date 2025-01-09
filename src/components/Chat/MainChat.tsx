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
  console.log(messages);
  return (
    <div>
      <Message />
      <SendMessage />
    </div>
  );
};

export default MainChat;
