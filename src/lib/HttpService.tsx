import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class HttpService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Unauthorized, logging out...");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, params: object = {}): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, { params, withCredentials: false });
  }

  post<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  put<T>(url: string, data: object): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }
}

export default HttpService;
