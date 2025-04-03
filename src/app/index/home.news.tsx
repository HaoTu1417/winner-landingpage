import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NewsArticle from "@/components/News";
import { newsService } from "@/services/NewsService";
import Carousel from "react-multi-carousel";
import { Spin } from "antd";
import NewArticleCard from "@/components/ui/news/NewArticleCard";

const PAGE_SIZE = 12;

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const NewsComponent: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [carouselData, setCarouseData] = useState<NewsArticle[]>([]);
  const carouselRef = useRef<Carousel>(null);

  const getNews = async () => {
    try {
      setLoading(true);
      const res = await newsService.getNews({
        limit: PAGE_SIZE.toString(),
        page: "1",
        sort: "-date_created",
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const prevSlide = () => {
    carouselRef.current?.previous(1);
  };

  const nextSlide = () => {
    carouselRef.current?.next(1);
  };

  useEffect(() => {
    getNews().then((data) => {
      setCarouseData(data || []);
    });
  }, []);

  return (
    <div className="container mx-auto py-[4rem]">
      <div className="mb-8 flex w-full items-center justify-center">
        <h1 className="bg-[linear-gradient(89.95deg,#0D169E_0.08%,#1C8D54_105.53%)] bg-clip-text text-4xl font-bold leading-tight text-green-600 text-transparent">
          {t("news")}
        </h1>
      </div>

      {loading && (
        <div className="w-full text-center">
          <Spin spinning />
        </div>
      )}

      {!loading && (
        <>
          <Carousel
            ref={carouselRef}
            autoPlay={true}
            arrows={false}
            infinite={true}
            responsive={responsive}
          >
            {carouselData.map((item) => (
              <div className="mx-8 h-full" key={item.id}>
                <NewArticleCard article={item} />
              </div>
            ))}
          </Carousel>

          <div className="mt-[4rem] flex items-center justify-center space-x-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-700 bg-white hover:bg-[#0D169E]/[10%]"
              onClick={prevSlide}
            >
              <ChevronLeft className="text-[#0D169E]" />
            </button>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-700 bg-white hover:bg-[#0D169E]/[10%]"
              onClick={nextSlide}
            >
              <ChevronRight className="text-[#0D169E]" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsComponent;
