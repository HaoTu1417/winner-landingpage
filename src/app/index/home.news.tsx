import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const News: React.FC = () => {
  const { t } = useTranslation();
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const carouselData = [
    {
      id: 1,
      img: "/images/homepage/news/news1.webp",
      title:
        "Thêm nhiều doanh nghiệp chốt quyền tham dự ĐHĐCĐ thường niên, Vietcombank mời cổ đông sang Hưng Yên họp",
      description:
        "Ngày 21/3 tới đây, Vincom Retail (VRE) sẽ chốt danh sách cổ đông dự họp ĐHĐCĐ thường niên.",
    },
    {
      id: 2,
      img: "/images/homepage/news/news2.webp",
      title:
        "Hỏi Grok 3 khi “kẹp hàng” cổ phiếu: Câu trả lời mách nước đảo ngược tình thế khiến dân đầu tư sừng sờ!",
      description:
        "Thực tế, ở một thị trường nhiều biến động như chứng khoán Việt Nam, ...",
    },
    {
      id: 3,
      img: "/images/homepage/news/news3.webp",
      title: "Một chỉ báo quan trọng báo hiệu VN-Index đang ở \"chân sóng lớn\"",
      description:
        "Xu hướng lãi suất tiền gửi hạ sẽ báo hiệu những chu kỳ tăng lớn, ví dụ như năm 2015 đến 2017, tháng 6/2020 đến tháng 3/2022 và tháng 12/2022 đến tháng 9/2023..",
    },
    {
      id: 4,
      img: "/images/homepage/news/news4.png",
      title: "Toàn bộ ban kiểm soát công ty bất động sản từ nhiệm",
      description:
        "Cả 3 thành viên Ban kiểm soát nhiệm kỳ 2021 - 2026 của TNT Group đồng loạt từ nhiệm vì lý do cá nhân. Việc từ nhiệm này sẽ có hiệu lực sau khi được đại hội cổ đông thường niên...",
    }
  ];

  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [index, setIndex] = useState(0);

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
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[20rem] object-cover rounded-t-xl"
                  />
                  <CardContent className="p-4 flex flex-col h-[138]">
                    <h3 className="text-base font-bold inter ">{item.title}</h3>
                    <p className="text-sm text-gray-600 flex-grow">
                      {truncateText(item.description, 100)}
                    </p>
                    <a className="text-blue-500 text-sm">
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

export default News;
