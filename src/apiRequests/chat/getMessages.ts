import { axios } from "@/lib/axios";

export async function getMessages() {
  const response = await axios.get("/messages");
  return response.data;
}
