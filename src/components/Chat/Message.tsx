import { motion } from "framer-motion";
import React from "react";

interface MessageProps {
  message: string;
  user: string;
}

const Message = ({ message, user }: MessageProps) => {
  const isMe = user === "me";

  return (
    <motion.div
      className={`flex items-center ${
        isMe ? "justify-end" : "justify-start"
      } my-3`}
      initial={{ opacity: 0, x: isMe ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`px-6 py-4 rounded-2xl shadow-lg ${
          isMe
            ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-br-none"
            : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 rounded-bl-none"
        } max-w-2xl w-3/4 md:w-1/2 lg:w-1/3`}
      >
        {message}
      </motion.div>
    </motion.div>
  );
};

export default Message;
