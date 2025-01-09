import { axios } from "@/lib/axios";

export const sendMessage = async (message: string) => {
  const schedule_at = new Date().toISOString();
  const response = await axios.post(
    "messages/send-message",
    {},
    { params: { message, schedule_at } }
  );
  return response.data;
};
