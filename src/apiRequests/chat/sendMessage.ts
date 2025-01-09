import { axios } from "@/lib/axios";

export interface ReturnedMessageTypes {
  w_a_session_id: number;
  user_id: number;
  message_template_id: number | null;
  reply_to_message_id: number | null;
  contact_id: number | null;
  campaign_id: number | null;
  data: unknown[];
  schedule_at: string;
  urgency: string;
  status: string;
  type: string;
  template_parameters: unknown | null;
  message: string;
  phone: string;
  image: string | null;
  updated_at: string;
  created_at: string;
  id: number;
}

export const sendMessage = async (
  message: string
): Promise<ReturnedMessageTypes> => {
  const schedule_at = new Date().toISOString();
  const response = await axios.post(
    "messages/send-message",
    {},
    { params: { message, schedule_at } }
  );
  return response.data;
};
