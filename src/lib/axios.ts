import Axios from "axios";

function authRequestInterceptor(config: {
  headers: { authorization: string; Accept: string };
  params?: Record<string, any>;
}) {
  config.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
  config.params = {
    ...(config.params || {}),
    session_uuid: process.env.NEXT_PUBLIC_SESSION_UUID,
    chat_id: process.env.NEXT_PUBLIC_CHAT_ID,
  };
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: "https://cloudwa.net/api/v2/",
});

axios.interceptors.request.use(authRequestInterceptor as any);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
