import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NewsService from "@/services/NewsService";
import NewsArticle from "@/components/News";
import { useRouter } from "next/navigation";
// Inside the map function where "Xem thêm" button exists
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from '@/../redux/counterSlice';



const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength
    ? text.substring(0, maxLength) + "..."
    : text;
};

function timeAgo(timestamp: string): string {
  


  const createdDate = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

  const intervals = [
      { label: "năm", seconds: 31536000 },
      { label: "tháng", seconds: 2592000 },
      { label: "tuần", seconds: 604800 },
      { label: "ngày", seconds: 86400 },
      { label: "tiếng", seconds: 3600 },
      { label: "phút", seconds: 60 },
      { label: "giây", seconds: 1 }
  ];

  for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
          return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
      }
  }
  return "Just now";
}


const NewsComponent: React.FC = () => {
  const { t } = useTranslation();
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const newSBackend = process.env.NEXT_PUBLIC_NEWS_ARTICLE_BACKEND;
  const [carouselData, setCarouseData] = useState<NewsArticle[]>( [
    {
      id: 1,
      thumbnail: "/images/homepage/news/news1.webp",
      title:
        "Thêm nhiều doanh nghiệp chốt quyền tham dự ĐHĐCĐ thường niên, Vietcombank mời cổ đông sang Hưng Yên họp",
      shortDescription:
        "Ngày 21/3 tới đây, Vincom Retail (VRE) sẽ chốt danh sách cổ đông dự họp ĐHĐCĐ thường niên.",
        content:"",
        date_created:"",
    
    },
    {
      id: 2,
      thumbnail: "/images/homepage/news/news2.webp",
      title:
        "Hỏi Grok 3 khi “kẹp hàng” cổ phiếu: Câu trả lời mách nước đảo ngược tình thế khiến dân đầu tư sừng sờ!",
      shortDescription:
        "Thực tế, ở một thị trường nhiều biến động như chứng khoán Việt Nam, ...",
        content:"",
        date_created:"",
    },
    {
      id: 3,
      thumbnail: "/images/homepage/news/news3.webp",
      title: "Một chỉ báo quan trọng báo hiệu VN-Index đang ở \"chân sóng lớn\"",
      shortDescription:
        "Xu hướng lãi suất tiền gửi hạ sẽ báo hiệu những chu kỳ tăng lớn, ví dụ như năm 2015 đến 2017, tháng 6/2020 đến tháng 3/2022 và tháng 12/2022 đến tháng 9/2023..",
        content:"",
        date_created:"",
      },
    {
      id: 4,
      thumbnail: "/images/homepage/news/news4.png",
      title: "Toàn bộ ban kiểm soát công ty bất động sản từ nhiệm",
      shortDescription:
        "Cả 3 thành viên Ban kiểm soát nhiệm kỳ 2021 - 2026 của TNT Group đồng loạt từ nhiệm vì lý do cá nhân. Việc từ nhiệm này sẽ có hiệu lực sau khi được đại hội cổ đông thường niên...",
        content:"",
        date_created:"",
      }
  ]);

  const newsService = new NewsService(
    process.env.NEXT_PUBLIC_NEWS_ARTICLE_BACKEND || "https://jsonplaceholder.typicode.com/"
  );
  // const count = useSelector((state:NewsArticle) => state);
  // const dispatch = useDispatch();

  
  const handleReadMore = (newsItem: NewsArticle) => {
    //sessionStorage.setItem("newsData", JSON.stringify(newsItem));
    router.push("/news/".concat(newsItem.id.toString()));
    //console.log('newsItem',newsItem);
  };

  const fetchNews = async () => {
    try {
      const newsData = await newsService.getAllNews();
      
      console.log("News Data:", newsData,  newsData.data[1].content);
      setCarouseData(newsData.data);
      // news = newsData.data;
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };


  // const [news, setNews] = useState([]);

  useEffect(() => {
    // Call the function
    fetchNews();

    
  }, []);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(carouselData.length / itemsPerPage);
  const hasMultipleSlides = carouselData.length > itemsPerPage; // Check if more elements exist

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div className="w-full flex items-center justify-center mb-8 mt-5">
        <h1 className="text-green-600 text-4xl font-bold leading-tight bg-[linear-gradient(89.95deg,#0D169E_0.08%,#1C8D54_105.53%)] bg-clip-text text-transparent">
          {t("news")}
        </h1>
      </div>
      <div className="relative flex items-center justify-center w-full py-6">
        <div className="w-full flex items-center justify-center">
          <div className="flex transition-transform ease-in-out duration-300 min-h-[30rem]">
            {carouselData
              .slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage)
              .map((item) => (
                <Card key={item.id} className="w-[25rem] shrink-0 mx-2">
                  <img
                    src={newSBackend?.concat("/assets/",item.thumbnail)}
                    alt={item.title}
                    className="w-full h-[20rem] object-cover rounded-t-xl"
                  />
                  <CardContent className="p-4 flex flex-col h-[138]">
                    <h3 className="text-base font-bold inter ">{item.title}</h3>
                    <p className="text-sm text-gray-600 flex-grow">
                      {truncateText(item.shortDescription, 100)}
                    </p>
                    <p>{timeAgo(item.date_created || "")}</p>
                    <a className="text-green-500 text-sm"  onClick={() => handleReadMore(item)}>
                      Xem thêm →
                    </a>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
      {hasMultipleSlides && (
        <div className="flex items-center justify-center space-x-4 p-[4rem]">
          <button
            className="w-10 h-10 bg-white border border-blue-700 rounded-full flex items-center justify-center"
            onClick={prevSlide}
          >
            <ChevronLeft className="text-blue-700" />
          </button>
          <button
            className="w-10 h-10 bg-white border border-blue-700 rounded-full flex items-center justify-center"
            onClick={nextSlide}
          >
            <ChevronRight className="text-blue-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
