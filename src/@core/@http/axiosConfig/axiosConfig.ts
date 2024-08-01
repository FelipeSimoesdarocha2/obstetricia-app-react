import axios from "axios";

import Cookie from "universal-cookie";

export const getAxios = () => {
  const cookie = new Cookie();

  const tokenApi = cookie.get("token_api" || "token_api_admin");

  const api = axios.create({
    headers: { Authorization: `Bearer ${tokenApi}` },
  });

  api.interceptors.response.use((response) => {
    if (response.status === 403) {
      if (response.data?.message) {
        // Só tera mensagem quando for token expirado

        window.location.pathname = "/upgrade";
      }
    }

    return Promise.resolve(response);
  });

  return api;
};
