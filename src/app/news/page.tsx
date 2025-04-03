"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/header";
import NewsArticle from "@/components/News";
import { newsService } from "@/services/NewsService";
import {
  Breadcrumb,
  Col,
  Empty,
  Input,
  notification,
  Pagination,
  Row,
  Spin,
} from "antd";
import NewArticleCard from "@/components/ui/news/NewArticleCard";
import { debounce } from "@/utils/debounce";
import NewsFilters from "./news.filters";
import Link from "next/link";

const PAGE_SIZE = 12;

interface Filters {
  type: string;
}

export default function Index() {
  const [notify, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(true);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [totalNews, setTotalNews] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsTypes, setNewsTypes] = useState<{ text: string; value: string }[]>(
    [],
  );
  const [filters, setFilters] = useState<Filters>({ type: "" });
  const [search, setSearch] = useState<string>("");

  const fetchNewsTypes = async () => {
    try {
      const types = await newsService.getNewsTypes();
      setNewsTypes(types);
    } catch (err) {
      notify.error({
        message: "Tải danh sách loại bài viết lỗi",
        description: (err as Error).message,
      });
    }
  };

  const fetchNews = async (search: string, filters: Filters, page: number) => {
    try {
      setLoading(true);
      const filterObj = Object.keys(filters).reduce<Record<string, string>>(
        (obj, key) => {
          const filterKey = key as keyof Filters;
          if (filters[filterKey]) {
            obj[`filter[${key}][_eq]`] = filters[filterKey];
          }
          return obj;
        },
        {},
      );

      const res = await newsService.getNews({
        page: page.toString(),
        limit: PAGE_SIZE.toString(),
        sort: "-date_created",
        meta: "total_count",
        search,
        ...filterObj,
      });
      setNewsList(res.data);
      setTotalNews(res.meta?.total_count || 0);
    } catch (err) {
      notify.error({
        message: "Tải danh sách bài viết lỗi",
        description: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }),
    [],
  );

  useEffect(() => {
    fetchNewsTypes();
  }, []);

  useEffect(() => {
    fetchNews(search, filters, currentPage);
  }, [search, filters, currentPage]);

  return (
    <>
      {contextHolder}
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-4">
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Trang chủ</Link>,
              },
              {
                title: "Tin tức",
              },
            ]}
          />
          <div className="w-[240px] max-w-full">
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="my-6 min-h-[60vh]">
          <Row gutter={[24, 24]}>
            <Col span={24} order={2} md={{ span: 18, order: 1 }}>
              {loading && (
                <div className="my-16 text-center">
                  <Spin spinning />
                </div>
              )}
              {!loading && (
                <>
                  {!newsList.length ? (
                    <Empty description="Không có bài viết nào" />
                  ) : (
                    <>
                      <Row gutter={[24, 24]}>
                        {newsList.map((news) => (
                          <Col key={news.id} span={24} md={12} lg={8}>
                            <NewArticleCard
                              className="rounded-xl"
                              article={news}
                            />
                          </Col>
                        ))}
                      </Row>
                      <div className="mt-8 flex justify-center">
                        <Pagination
                          current={currentPage}
                          pageSize={PAGE_SIZE}
                          defaultCurrent={1}
                          total={totalNews}
                          onChange={(page) => setCurrentPage(page)}
                        />
                      </div>
                    </>
                  )}
                </>
              )}
            </Col>
            <Col span={24} order={1} md={{ span: 6, order: 2 }}>
              <NewsFilters
                title="Phân loại"
                value={filters.type}
                options={newsTypes}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, type: value }))
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
