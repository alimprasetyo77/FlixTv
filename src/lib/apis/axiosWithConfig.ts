import { getCookie } from "cookies-next";
import axios from "axios";

interface Queries {
  api_key?: string;
  language: string;
  session_id?: string;
}

let session_id = getCookie("sessionID") ?? "";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  session_id = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  let queries: Queries = {
    api_key: process.env.NEXT_PUBLIC_API_KEY,
    language: "en-US",
  };

  if (session_id !== "") {
    queries["session_id"] = session_id;
  }

  axiosConfig.baseURL = "https://api.themoviedb.org/3/";
  axiosConfig.params = {
    ...axiosConfig.params,
    ...queries,
  };

  return axiosConfig;
});

export default axiosWithConfig;
