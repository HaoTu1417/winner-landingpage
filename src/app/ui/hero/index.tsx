import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20 px-5">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Giải pháp tài chính đột phá cho nhà đầu tư chứng khoán Việt Nam
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Cung cấp các dịch vụ vay vốn linh hoạt, giúp bạn hiện thực hóa mục tiêu đầu tư nhanh chóng và dễ dàng.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#learn-more"
            className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition"
          >
            Tìm hiểu thêm
          </a>
          <a
            href="#contact"
            className="bg-blue-700 border-2 border-white font-semibold py-3 px-6 rounded-md hover:bg-blue-800 transition"
          >
            Liên hệ chúng tôi
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
