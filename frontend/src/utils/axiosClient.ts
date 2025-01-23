import axios from "axios";
import { BASE_API_URL } from "../constants";
import {
  ACCESS_TOKEN,
  getLocalStorageItem,
  removeLocalStorageItem,
  USER_DATA,
} from "./localStorageManager";

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (request) => {
    const accessToken = getLocalStorageItem(ACCESS_TOKEN);
    if (accessToken) {
      request.headers = request.headers || {};
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      removeLocalStorageItem(ACCESS_TOKEN, USER_DATA);
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
