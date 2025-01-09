import Axios from "axios";

function authRequestInterceptor(config: {
  headers: { authorization: string; Accept: string };
}) {
  config.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;

  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
