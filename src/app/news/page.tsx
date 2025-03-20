"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Fix: Next.js App Router doesn't support useRouter().query well
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Header from "../../components/header";
import NewsArticle from "@/components/News";
import NewsService from "@/services/NewsService"


// interface PaginatedResponse {
//   items: NewsArticle[];
// }

export default function Index() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get "id" dynamically from the URL
  const newSBackend = process.env.NEXT_PUBLIC_NEWS_ARTICLE_BACKEND || "http://localhost:8055";
  const newsService = new NewsService(newSBackend);
  const [newsData, setNewsData] = useState<NewsArticle | null>(null);
  // const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [page, setPage] = useState<number>(1);
  // const pageSize = 5; // Define articles per page

  console.log("hello mother fucker");
  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
     
      try {
        if (id) {
          // Fetch single news article by ID
          //const response = await fetch(`http://localhost:8055/collections/news/${id}`);

          const result = await newsService.getNewsById(id);
          console.log("result",result);

          //if (!response.ok) throw new Error("Failed to fetch news article");
          //const data: NewsArticle = await response.json();
          setNewsData(result.data);
        } else {
          // Fetch all news articles with pagination
          // const response = await fetch(`http://localhost:8055/collections/news?page=${page}&limit=${pageSize}`);
          // if (!response.ok) throw new Error("Failed to fetch news list");
          // const data: PaginatedResponse = await response.json();
          // setNewsList(data.items);


          const result = await newsService.getAllNews();
          console.log("result",result);

          //if (!response.ok) throw new Error("Failed to fetch news article");
          //const data: NewsArticle = await response.json();
          setNewsList(result.data);

        }
      } catch (err) {
        setError((err as Error).message);
      }

      setLoading(false);
    }

    fetchNews();
  }, [id, page]); // Re-fetch when id or page changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="w-full">
        \
        <div
          className="flex flex-row b-[2rem] bg-gray-100 p-4 ml-[10%]"
          style={{ width: "80%" }}
        >
          <p>Trang chủ/Tin Tức</p>
        </div>
      </div>
      <div className="flex justify-center p-4 w-full">
        {/* Main Content and Related News */}
        <div className="flex flex-row b-[2rem ]" style={{ width: "80%" }}>
          {/* Left Column - Main Article */}
          <div
            className="flex-1 rounded-lg shadow-mdl p-6"
            style={{ width: "75%", marginRight: "1rem" }}
          >
            {/* Nội dung bài viết */}
            <div className="ml-6 bg-gray-200 rounded-lg shadow-md mb-10">
              <h1 className="font-bold mt-4 text-4xl mb-6">{newsData.title}</h1>

              {/* <p className="text-gray-700 mt-2 text-xl">
              Dòng tiền nhập cuộc giúp thị trường có 6 tuần tăng điểm liên tiếp
              để giữ vững mốc 1.300 điểm. So với mức đáy hồi tháng 11 năm ngoái,
              VN-Index đã tăng xấp xỉ 100 điểm (tương đương gần 8%) để lên 1.311
              điểm – cao nhất kể từ tháng 5/2022.
            </p> */}
              <div></div>
              <div className="container mx-auto p-6">
                <MarkdownRenderer content={newsData.content} />
              </div>
            </div>
            {/* Tin tức liên quan */}
            <div className="ml-6 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col h-auto">
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                📌 Bài viết liên quan
              </h2>

              <div className="mb-4 flex items-center border-b pb-4">
                <div className="flex-1">
                  <p className="text-sm text-red-500 font-semibold">
                    #Quản trị danh mục
                  </p>
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    Cổ phiếu ngành xây dựng: +6 mã xây dựng triển vọng năm 2022
                  </a>
                  <p className="text-sm text-gray-600">26/06/2022</p>
                </div>
                <img
                  src="/path-to-image1.jpg"
                  alt="News Thumbnail"
                  className="w-24 h-16 rounded-md object-cover ml-4"
                />
              </div>

              <div className="mb-4 flex items-center border-b pb-4">
                <div className="flex-1">
                  <p className="text-sm text-red-500 font-semibold">
                    #Quản trị danh mục
                  </p>
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    Cổ phiếu đầu tư công: 6 mã cổ phiếu tiềm năng nhất
                  </a>
                  <p className="text-sm text-gray-600">30/07/2022</p>
                </div>
                <img
                  src="/path-to-image2.jpg"
                  alt="News Thumbnail"
                  className="w-24 h-16 rounded-md object-cover ml-4"
                />
              </div>

              <div className="mb-4 flex items-center border-b pb-4">
                <div className="flex-1">
                  <p className="text-sm text-red-500 font-semibold">
                    #Chứng khoán #Tiêu điểm
                  </p>
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    Lộ trình đầu tư: Kiến thức cơ bản về chứng khoán
                  </a>
                  <p className="text-sm text-gray-600">08/08/2024</p>
                </div>
                <img
                  src="/path-to-image3.jpg"
                  alt="News Thumbnail"
                  className="w-24 h-16 rounded-md object-cover ml-4"
                />
              </div>

              <div className="mb-4 flex items-center border-b pb-4">
                <div className="flex-1">
                  <p className="text-sm text-red-500 font-semibold">
                    #Quản trị danh mục
                  </p>
                  <a
                    href="#"
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                  >
                    Danh sách mã cổ phiếu theo ngành được quan tâm nhiều nhất
                  </a>
                  <p className="text-sm text-gray-600">27/07/2022</p>
                </div>
                <img
                  src="/path-to-image4.jpg"
                  alt="News Thumbnail"
                  className="w-24 h-16 rounded-md object-cover ml-4"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Related News */}
          {/* <div style={{ width: "20%" }}>
            <div className=" bg-gray-100 " style={{ width: "100%" }}>
              <h2 className="text-xl font-semibold mb-4">Tin liên quan</h2>

              <div className="mb-4 flex items-center">
                <img
                  src="/path-to-image1.jpg"
                  alt="News Thumbnail"
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    🔥 Thị trường chứng khoán có thể chạm ngưỡng 1.350 điểm?
                  </a>
                  <p className="text-sm text-gray-600">10 phút trước</p>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <img
                  src="/path-to-image2.jpg"
                  alt="News Thumbnail"
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    📈 Chuyên gia dự báo lợi suất đầu tư tiếp tục tăng
                  </a>
                  <p className="text-sm text-gray-600">30 phút trước</p>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <img
                  src="/path-to-image3.jpg"
                  alt="News Thumbnail"
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    💰 Lãi suất tiết kiệm có thể giảm thêm trong tháng tới
                  </a>
                  <p className="text-sm text-gray-600">1 giờ trước</p>
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <img
                  src="/path-to-image4.jpg"
                  alt="News Thumbnail"
                  className="w-16 h-16 rounded-md object-cover mr-4"
                />
                <div>
                  <a
                    href="#"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    📊 Những ngành nào đang hưởng lợi từ sự hồi phục thị trường?
                  </a>
                  <p className="text-sm text-gray-600">2 giờ trước</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
