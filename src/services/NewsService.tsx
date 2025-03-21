"use client";

import NewsArticle from "@/components/News";
import HttpService from "@/lib/HttpService";
import { AxiosResponse } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_NEWS_ARTICLE_BACKEND || "http://localhost:8055";

interface NewsResponse {
  data: NewsArticle[];
  meta?: {
    total_count?: number;
  };
}

interface SingleNewsResponse {
  data: NewsArticle;
}

interface NewsTypeResponse {
  data: {
    meta: {
      options: {
        choices: {
          text: string;
          value: string;
        }[];
      };
    };
  };
}

class NewsService extends HttpService {
  async getNewsTypes(): Promise<{ text: string; value: string }[]> {
    const response: AxiosResponse<NewsTypeResponse> =
      await this.get<NewsTypeResponse>("/fields/articles/type", {});
    return response.data.data.meta.options.choices;
  }

  async getAllNews(): Promise<NewsResponse> {
    const response: AxiosResponse<NewsResponse> = await this.get<NewsResponse>(
      "items/articles",
      {}
    );
    return response.data;
  }

  async getNews(queries?: Record<string, string>): Promise<NewsResponse> {
    const queryString = new URLSearchParams(queries).toString();
    const response: AxiosResponse<NewsResponse> = await this.get<NewsResponse>(
      `items/articles?${queryString}`,
      {}
    );
    return response.data;
  }

  async getNewsById(id: string): Promise<SingleNewsResponse> {
    const response: AxiosResponse<SingleNewsResponse> =
      await this.get<SingleNewsResponse>("items/articles/" + id, {});
    return response.data;
  }

  getThumbnailUrl(thumbnail: string): string {
    return BASE_URL.concat("/assets/", thumbnail);
  }
}

export default NewsService;

export const newsService = Object.freeze(new NewsService(BASE_URL));
