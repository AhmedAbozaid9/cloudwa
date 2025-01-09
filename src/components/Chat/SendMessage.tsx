import { SendHorizonal } from "lucide-react";
import React from "react";

const SendMessage = () => {
  return (
    <form className="absolute bottom-8 left-0 right-0 flex items-center gap-3 bg-neutral-900 p-2 rounded-full shadow-md w-full max-w-lg mx-auto">
      <input
        type="text"
        className="flex-grow bg-neutral-800 text-white rounded-full outline-none px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        placeholder="Write a message..."
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 focus:ring-2 focus:ring-purple-400 transition-all"
      >
        <SendHorizonal size={20} />
      </button>
    </form>
  );
};

export default SendMessage;
