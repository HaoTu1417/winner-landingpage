import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpCore {
  private instance: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...config,
    });

    // Intercept request to add common headers
    this.instance.interceptors.request.use(
      (request) => {
        // Add Authorization token or other common headers here if needed
        // Example: request.headers['Authorization'] = `Bearer ${yourToken}`;
        return request;
      },
      (error) => Promise.reject(error)
    );

    // Intercept response to handle errors globally
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle errors globally (e.g., log them, show notifications)
        console.error('HTTP Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  // POST request (fix any -> T)
  public async post<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  // PUT request (fix any -> T)
  public async put<T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  // DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default HttpCore;
