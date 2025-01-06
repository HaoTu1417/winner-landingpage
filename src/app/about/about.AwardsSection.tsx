'use client'
import { useState } from 'react';

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
    title: 'Giải thưởng SSIAM',
    description: 'Danh sách giải thưởng SSIAM đã được vinh danh',
    image: '/about us desktop vn@3x.png',
    link: '#',
  },
  {
    id: 2,
    title: '"Công ty Quản lý Quỹ của Năm" năm 2024 (4 năm liên tiếp)',
    description: 'Được trao bởi Tạp chí The Asset',
    image: '/about us desktop vn@3x.png',
    link: '#',
  },
  {
    id: 3,
    title: '"Giải thưởng Thị trường – Việt Nam" năm 2024',
    description: 'Được trao bởi Tạp chí Asian Investor',
    image: '/about us desktop vn@3x.png',
    link: '#',
  },
];

const AwardsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handler for moving to the next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % awards.length);
  };

  // Handler for moving to the previous slide
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? awards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-semibold text-center mb-4 text-green-600">Giải thưởng</h2>
      <p className="text-center text-gray-600 mb-8">
        SSIAM vinh dự đón nhận những giải thưởng danh giá từ nhiều tổ chức uy tín, khẳng định vị thế
        hàng đầu trong lĩnh vực quản lý tài sản ở Việt Nam.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Award Slide */}
        <div className="relative col-span-2">
          <img
            src={awards[currentIndex].image}
            alt={awards[currentIndex].title}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 left-0 p-6 bg-white bg-opacity-90 rounded-b-lg w-full">
            <h3 className="text-lg font-semibold text-gray-800">
              {awards[currentIndex].title}
            </h3>
            <p className="text-sm text-gray-600">
              {awards[currentIndex].description}
            </p>
            <a
              href={awards[currentIndex].link}
              className="mt-2 inline-block text-green-600 font-medium hover:underline"
            >
              Xem thêm →
            </a>
          </div>
        
        </div>

        {/* Award List */}
        <div className="space-y-4">
          {awards.map((award, index) => (
            <div
              key={award.id}
              onClick={() => setCurrentIndex(index)}
              className={`p-6 rounded-lg shadow-md cursor-pointer ${
                currentIndex === index
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <h4 className="text-sm font-semibold">{award.title}</h4>
              <p className="text-xs">{award.description}</p>
              <a
                href={award.link}
                className={`mt-2 inline-block ${
                  currentIndex === index
                    ? 'text-white'
                    : 'text-green-600 hover:underline'
                }`}
              >
                Xem thêm →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;
