
'use client'
import React, { useState } from "react";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

  
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg font-bold">AGRIBANK</div>

          {/* Menu Toggle (Mobile) */}
          <button
            className="block lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Desktop Menu */}
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:space-x-6`}
          >
            <a href="#" className="block py-2 lg:py-0">
              TIN TỨC
            </a>
            <a href="#" className="block py-2 lg:py-0">
              SẢN PHẨM DỊCH VỤ
            </a>
            <a href="#" className="block py-2 lg:py-0">
              TƯ VẤN TRỰC TUYẾN
            </a>
            <a href="#" className="block py-2 lg:py-0">
              TRUNG TÂM PHÂN TÍCH
            </a>
            <a href="#" className="block py-2 lg:py-0">
              PHÁI SINH
            </a>
            <a href="#" className="block py-2 lg:py-0">
              VỀ AGR
            </a>
          </nav>

          {/* Right Buttons */}
          <div className="hidden lg:flex space-x-4">
            <button className="bg-green-600 px-4 py-2 rounded">
              Mở Tài Khoản
            </button>
            <button className="bg-green-600 px-4 py-2 rounded">
              Giao Dịch Trực Tuyến
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="bg-gray-100">
        {/* Banner */}
        <section className="relative bg-cover bg-center text-white h-64 sm:h-96 bg-[url('/your-image-path.jpg')] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-bold">
              Công ty Chứng khoán AGRIBANK
            </h1>
            <p className="mt-4 text-lg sm:text-xl">
              Kiến tạo một trải nghiệm đầu tư Tích lũy riêng biệt
            </p>
            <button
              className="mt-6 bg-green-600 px-6 py-3 rounded text-white text-lg">
              Bắt Đầu Ngay
            </button>
          </div>
        </section>

        {/* News Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Công bố thông tin <span className="text-green-600">AGRISECO</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                date: "2 ngày trước",
                content:
                  "Agriseco công bố thông tin Quyết định xử phạt vi phạm hành chính về thuế",
              },
              {
                date: "3 ngày trước",
                content:
                  "Agriseco công bố thông tin Quyết định xử phạt vi phạm hành chính về thuế",
              },
              {
                date: "1 tháng trước",
                content:
                  "Agriseco công bố Quyết định về việc ký kết Hợp đồng tín dụng...",
              },
              {
                date: "1 tháng trước",
                content: "AGR - Hướng dẫn thủ tục nhận cổ tức năm 2023",
              },
            ].map((news, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded p-4 flex justify-between items-center"
              >
                <div>
                  <p className="text-gray-500 text-sm">{news.date}</p>
                  <p className="text-lg font-medium">{news.content}</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded">
                  PDF
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Header;
