"use client";

import NewsArticle from "@/components/News";
import HttpService from "@/lib/HttpService";
import { AxiosResponse } from "axios";

interface NewsResponse {
  data: NewsArticle[];
}

interface SingleNewsResponse{
  data: NewsArticle
}



class NewsService extends HttpService {
  async getAllNews(): Promise<NewsResponse> {
    const response: AxiosResponse<NewsResponse> = await this.get<NewsResponse>(
      "items/articles",
      {}
    );
    return response.data;
  }

  async getNewsById(id: string): Promise<SingleNewsResponse> {
    const response: AxiosResponse<SingleNewsResponse> = await this.get<SingleNewsResponse>(
      "items/articles/"+id,
      {}
    );
    console.log("getNewsById",response);
    return response.data;
  }
}

export default NewsService;
