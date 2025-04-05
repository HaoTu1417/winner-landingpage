"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Award {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

const awards: Award[] = [
  {
    id: 1,
    title: "Giải thưởng SSIAM",
    description: "Danh sách giải thưởng SSIAM đã được vinh danh",
    image: "/images/team/aboutus.png",
    link: "#",
  },
  {
    id: 2,
    title: '"Công ty Quản lý Quỹ của Năm" năm 2024 (4 năm liên tiếp)',
    description: "Được trao bởi Tạp chí The Asset",
    image: "/images/team/aboutus.png",
    link: "#",
  },
  {
    id: 3,
    title: '"Giải thưởng Thị trường – Việt Nam" năm 2024',
    description: "Được trao bởi Tạp chí Asian Investor",
    image: "/images/team/aboutus.png",
    link: "#",
  },
];

const AwardsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      <h2 className="mb-4 text-center text-3xl font-semibold text-green-600">
        Giải thưởng
      </h2>
      <p className="mb-8 text-center text-gray-600">
        SSIAM vinh dự đón nhận những giải thưởng danh giá từ nhiều tổ chức uy
        tín, khẳng định vị thế hàng đầu trong lĩnh vực quản lý tài sản ở Việt
        Nam.
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Award Slide */}
        <div className="relative col-span-2">
          <div className="relative h-64 w-full">
            <Image
              src={awards[currentIndex].image}
              alt={awards[currentIndex].title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-md"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-white bg-opacity-90 p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {awards[currentIndex].title}
            </h3>
            <p className="text-sm text-gray-600">
              {awards[currentIndex].description}
            </p>
            <Link
              href={awards[currentIndex].link}
              className="mt-2 inline-block font-medium text-green-600 hover:underline"
            >
              Xem thêm →
            </Link>
          </div>
        </div>

        {/* Award List */}
        <div className="space-y-4">
          {awards.map((award, index) => (
            <div
              key={award.id}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer rounded-lg p-6 shadow-md ${
                currentIndex === index
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <h4 className="text-sm font-semibold">{award.title}</h4>
              <p className="text-xs">{award.description}</p>
              <Link
                href={award.link}
                className={`mt-2 inline-block ${
                  currentIndex === index
                    ? "text-white"
                    : "text-green-600 hover:underline"
                }`}
              >
                Xem thêm →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
