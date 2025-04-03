import NewsArticle from "@/components/News";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { newsService } from "@/services/NewsService";
import { formatTimeAgo } from "@/utils/datetime";

interface NewArticleCardSmallProps {
  article: NewsArticle;
  className?: string;
}

export default function NewArticleCardSmall({
  article,
  className,
}: NewArticleCardSmallProps) {
  return (
    <a href={`/news/${article.id}`} title={article.title}>
      <Card
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-[32px] shadow-none sm:flex-row",
          className,
        )}
      >
        <img
          src={newsService.getThumbnailUrl(article.thumbnail)}
          alt={article.title}
          className="aspect-[538/338] h-full w-auto object-cover"
        />
        <CardContent className="flex flex-1 flex-col p-6">
          <h3 className="inter line-clamp-1 text-base font-bold hover:text-[#0D169E]">
            {article.title}
          </h3>
          <p className="mb-6 mt-2 line-clamp-1 text-sm text-gray-600">
            {article.shortDescription}
          </p>
          <div className="mb-0 mt-auto flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {formatTimeAgo(article.date_created || "")}
            </span>
            <span className="cursor-pointer text-sm text-[#0D169E]">
              Xem thêm →
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
