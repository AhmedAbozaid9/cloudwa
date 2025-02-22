import { axios } from "@/lib/axios";

export interface ChatMessageTypes {
  body: string;
  caption: string | null;
  chat_id: string;
  from: string;
  id: string;
  is: {
    sender: boolean;
    receiver: boolean;
    ack: number;
    invisible: boolean;
    star: boolean;
    [key: string]: unknown;
  };
  quoted_message: string | null;
  row_id: number;
  sender: {
    id: string;
    names: Record<string, string>;
    images: Record<string, string>;
  };
  subtype: string | null;
  timestamp: number;
  to: string;
  type: string;
}

export async function getMessages(): Promise<ChatMessageTypes[]> {
  const response = await axios.get("/messages");
  return response.data;
}
