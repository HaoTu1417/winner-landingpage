import { API_BASE_URL } from "@/configs";
import eventBus, { EventType } from "@/utils/eventBus";
import { getLocalStorage, STORAGE_KEYS } from "@/utils/localStorageHelper";
import axios, {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from "axios";

export interface ExtraOptions {
  withAuth?: boolean;
  isRedirected?: boolean;
}

const axiosConfig: CreateAxiosDefaults = {
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
};

const axiosInstance: AxiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & ExtraOptions) => {
    const token = getLocalStorage(STORAGE_KEYS.AUTH_TOKEN, null);
    if (config.withAuth && token) {
      config.headers["Token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (
    response: AxiosResponse & {
      config: InternalAxiosRequestConfig & ExtraOptions;
    },
  ) => {
    if (response.data?.status === 1250 || response.data?.status === 1260) {
      eventBus.emit(EventType.UNAUTHORIZED);
    }
    return response;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
