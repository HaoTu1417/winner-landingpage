import axiosInstance, { ExtraOptions } from "@/network/axios-instance";
import { AxiosError, AxiosRequestConfig } from "axios";
import _get from "lodash/get";

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

export class ApiService {
  static async request<TResponse, TRequest>(
    method: string,
    url: string,
    data?: TRequest,
    extraOptions: ExtraOptions = {},
  ): Promise<ApiResponse<TResponse>> {
    try {
      const response = await axiosInstance.request<TResponse>({
        method,
        url,
        data,
        withAuth: true,
        isRedirected: true,
        ...extraOptions,
      } as AxiosRequestConfig & ExtraOptions);

      return {
        data: _get(response.data, "data", response.data), // depend on api response format
        error: _get(response.data, "message", null),
        status: _get(response.data, "status", 200),
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        return {
          data: null,
          error: error.response?.data?.message || error.message,
          status: error.response?.status || 500,
        };
      }

      return {
        data: null,
        error: "Unexpected error occurred",
        status: 500,
      };
    }
  }

  static async get<TResponse>(
    url: string,
    options?: AxiosRequestConfig & ExtraOptions,
  ) {
    return this.request<TResponse, undefined>("GET", url, undefined, options);
  }

  static async post<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: Partial<AxiosRequestConfig & ExtraOptions>,
  ) {
    return this.request<TResponse, TRequest>("POST", url, data, options);
  }

  static async put<TResponse, TRequest>(
    url: string,
    data: TRequest,
    options?: AxiosRequestConfig & ExtraOptions,
  ) {
    return this.request<TResponse, TRequest>("PUT", url, data, options);
  }

  static async delete<TResponse>(
    url: string,
    options?: AxiosRequestConfig & ExtraOptions,
  ) {
    return this.request<TResponse, undefined>(
      "DELETE",
      url,
      undefined,
      options,
    );
  }
}
