import NewsArticle from "@/components/News";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { newsService } from "@/services/NewsService";
import { formatTimeAgo } from "@/utils/datetime";

interface NewArticleCardProps {
  article: NewsArticle;
  className?: string;
}

export default function NewArticleCard({
  article,
  className,
}: NewArticleCardProps) {
  return (
    <a href={`/news/${article.id}`} title={article.title}>
      <Card
        className={cn(
          "w-full h-full flex flex-col rounded-[32px] overflow-hidden shadow-none",
          className
        )}
      >
        <img
          src={newsService.getThumbnailUrl(article.thumbnail)}
          alt={article.title}
          className="w-full h-auto aspect-[538/338] object-cover"
        />
        <CardContent className="flex-1 flex flex-col p-6">
          <h3 className="text-base font-bold inter line-clamp-2 hover:text-[#0D169E]">
            {article.title}
          </h3>
          <p className="mt-2 mb-6 text-sm text-gray-600 line-clamp-2">
            {article.shortDescription}
          </p>
          <div className="mt-auto mb-0 flex flex-wrap items-center justify-between text-sm">
            <span className="text-gray-400">
              {formatTimeAgo(article.date_created || "")}
            </span>
            <span className="text-[#0D169E] text-sm cursor-pointer">
              Xem thêm →
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
