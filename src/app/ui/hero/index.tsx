import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-20 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-5xl">
          Giải pháp tài chính đột phá cho nhà đầu tư chứng khoán Việt Nam
        </h1>
        <p className="mb-8 text-lg md:text-xl">
          Cung cấp các dịch vụ vay vốn linh hoạt, giúp bạn hiện thực hóa mục
          tiêu đầu tư nhanh chóng và dễ dàng.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#learn-more"
            className="rounded-md bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-gray-100"
          >
            Tìm hiểu thêm
          </a>
          <a
            href="#contact"
            className="rounded-md border-2 border-white bg-blue-700 px-6 py-3 font-semibold transition hover:bg-blue-800"
          >
            Liên hệ chúng tôi
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
