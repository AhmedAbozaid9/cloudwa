import Axios from "axios";

function authRequestInterceptor(config: {
  headers: { authorization: string; Accept: string };
  params?: Record<string, any>;
}) {
  config.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
  config.params = {
    ...(config.params || {}),
    session_uuid: "9b6fcf1c-efbe-4c3d-925c-cb3b24131c67",
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
