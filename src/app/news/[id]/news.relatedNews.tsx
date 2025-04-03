import NewsArticle from "@/components/News";
import NewArticleCardSmall from "@/components/ui/news/NewArticleCardSmall";
import { newsService } from "@/services/NewsService";
import { notification, Spin } from "antd";
import { useEffect, useState } from "react";

const PAGE_SIZE = 12;

interface RelatedNewsProps {
  article?: NewsArticle;
}

export default function RelatedNews({ article }: RelatedNewsProps) {
  const [notify, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedNews, setRelatedNews] = useState<NewsArticle[]>([]);

  const fetchRelatedNews = async (id: number, type?: string) => {
    try {
      setLoading(true);
      const res = await newsService.getNews({
        page: "1",
        limit: PAGE_SIZE.toString(),
        sort: "-date_created",
        ...(type ? { [`filter[type][_eq]`]: type } : {}),
        ["filter[id][_neq]"]: id.toString(),
      });
      setRelatedNews(res.data);
    } catch (err) {
      notify.error({
        message: (err as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (article) {
      fetchRelatedNews(article.id, article.type);
    }
  }, [article]);

  if (!relatedNews.length) {
    return null;
  }

  return (
    <div>
      {contextHolder}
      <h2 className="mb-6 text-3xl font-bold text-[#0D169E]">Tin liên quan</h2>
      {loading && (
        <div className="my-16 text-center">
          <Spin spinning />
        </div>
      )}
      {!loading && (
        <div className="flex flex-col gap-4">
          {relatedNews.map((news) => (
            <NewArticleCardSmall
              className="h-[140px] rounded-xl"
              key={news.id}
              article={news}
            />
          ))}
        </div>
      )}
    </div>
  );
}
