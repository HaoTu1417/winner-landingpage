"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import NewsArticle from "@/components/News";
import { newsService } from "@/services/NewsService";
import { Breadcrumb, Col, Empty, notification, Row, Spin } from "antd";
import { useParams } from "next/navigation";
import RelatedNews from "./news.relatedNews";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { formatDateTime } from "@/utils/datetime";

export default function Index() {
  const [notify, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(true);
  const [newsDetails, setNewsDetails] = useState<NewsArticle>();

  const params = useParams();
  const id = params.id as string;

  const fetchNewsDetails = async (newsId: string) => {
    try {
      setLoading(true);
      const res = await newsService.getNewsById(newsId);
      setNewsDetails(res.data);
    } catch (err) {
      notify.error({
        message: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNewsDetails(id);
    }
  }, [id]);

  return (
    <>
      {contextHolder}
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap gap-4">
          <Breadcrumb
            items={[
              {
                title: <a href="/">Trang chủ</a>,
              },
              {
                title: <a href="/news">Tin tức</a>,
              },
              ...(newsDetails ? [{ title: newsDetails.title }] : []),
            ]}
          />
        </div>
        <div className="min-h-[60vh] my-6">
          <Row gutter={[24, 24]}>
            <Col span={24} xl={{ span: 16, offset: 4 }}>
              {loading && (
                <div className="my-16 text-center">
                  <Spin spinning />
                </div>
              )}
              {!loading && (
                <>
                  {!newsDetails ? (
                    <Empty description="Không tìm thấy nội dung" />
                  ) : (
                    <>
                      <h1 className="text-4xl font-bold">
                        {newsDetails.title}
                      </h1>
                      <div className="text-gray-400 mt-2">
                        {formatDateTime(newsDetails.date_created)}
                      </div>
                      <div className="mt-6">
                        <img
                          src={newsService.getThumbnailUrl(
                            newsDetails.thumbnail
                          )}
                          alt={newsDetails.title}
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="mt-6 text-lg font-semibold">
                        {newsDetails.shortDescription}
                      </p>
                      <div className="mt-6 text-lg">
                        <MarkdownRenderer content={newsDetails.content} />
                      </div>
                    </>
                  )}
                </>
              )}
            </Col>
            <Col span={24} xl={{ span: 16, offset: 4 }}>
              <RelatedNews article={newsDetails} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
