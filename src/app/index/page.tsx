'use client'
import React, { useState } from "react";
import Footer from "../index/footer"
import ServiceSection from "./home.service"
import TradingPlatform from "./home.tradingPlatform"
import { useTranslation } from 'react-i18next';
import LanguageSelector from "../ui/components/LanguageSelector"
import UIGrid from "./home.uigrid";
import Image from 'next/image'
function Index() {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { t } = useTranslation();
  return(
    <div  className="font-sans text-black">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Menu Toggle (Mobile) */}
          <button
            className="block lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>


           {/* Desktop Right Buttons */}
           {/* <div className="lg:flex space-x-4">
            <button className="sm:bg-green-600 px-4 py-2 rounded xs:bg-red-500 xs:size-20 sm:size-auto xs:text-xs sm:text-base">Mở Tài Khoản</button>
            <button className="sm:bg-green-600 px-4 py-2 rounded xs:bg-red-500 xs:size-20 sm:size-auto xs:text-xs sm:text-base">Giao Dịch Trực Tuyến</button>
          </div> */}
          {/* Logo */}
          <div className="text-lg font-bold h-20">
            <img src="/images/LogoWFS.png" className="object-contain h-full mr-2"/>
           
          </div>
          <div className="hidden flex-row lg:flex">
            <a href="#" className="mx-2">TIN TỨC</a>
            <a href="#" className="mx-2">SẢN PHẨM DỊCH VỤ</a> 
            <a href="#" className="mx-2">TƯ VẤN TRỰC TUYẾN</a>
            <a href="#" className="mx-2">TRUNG TÂM PHÂN TÍCH</a>
            <a href="#" className="mx-2">PHÁI SINH</a>
            <a href="/about" className="mx-2">VỀ WFS</a>
          </div>
         <LanguageSelector></LanguageSelector>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="top-full left-0 bg-black text-white w-full lg:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <a href="#" className="block py-2">TIN TỨC</a>
            <a href="#" className="block py-2">SẢN PHẨM DỊCH VỤ</a> 
            <a href="#" className="block py-2">TƯ VẤN TRỰC TUYẾN</a>
            <a href="#" className="block py-2">TRUNG TÂM PHÂN TÍCH</a>
            <a href="#" className="block py-2">PHÁI SINH</a>
            <a href="#" className="block py-2">VỀ AGR</a>
          </div>
        </nav>
      )}
       {/* Main Section */}
      <main className="bg-gray-100">


      <div className="relative bg-container h-64 sm:h-96 flex items-center justify-center text-white">
      <Image 
          src="/images/homepage/bg_slide-768.webp" 
          alt="Background description"
          layout="fill"    
          objectFit="cover"  
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 100vw,
                (max-width: 1024px) 100vw,
                (max-width: 1440px) 100vw,
                1440px"
          priority
          className="z-0"
        />
        <div className="text-center z-10">
          <h1 className="text-3xl sm:text-5xl font-bold">{t('companyName')}</h1>
          <p className="mt-4 text-lg sm:text-xl">{t('companySlogan')}</p>
          <button className="mt-6 bg-green-600 px-6 py-3 rounded text-white text-lg">
            {t('startNow')}
          </button>
        </div>
      </div>
        <ServiceSection></ServiceSection>
        <UIGrid></UIGrid>
        {/* News Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Công bố thông tin <span className="text-green-600">AGRISECO</span>
          </h2>
          <div className="space-y-4">
            {[
              { date: "2 ngày trước", content: "Agriseco công bố thông tin Quyết định xử phạt vi phạm hành chính về thuế" },
              { date: "3 ngày trước", content: "Agriseco công bố thông tin Quyết định xử phạt vi phạm hành chính về thuế" },
              { date: "1 tháng trước", content: "Agriseco công bố Quyết định về việc ký kết Hợp đồng tín dụng..." },
              { date: "1 tháng trước", content: "AGR - Hướng dẫn thủ tục nhận cổ tức năm 2023" },
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

        {/* Bonds Section */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            TRÁI PHIẾU <span className="text-green-600">AGRIBANK</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-center">
            <div className="md:order-1">
              <img
                src="/images/homepage/bond.png"
                alt="Agribank Building"
                className="rounded shadow-md"
              />
            </div>
            <div className="space-y-4 md:order-2">
              {[
                {
                  title: "Agribank công bố thông tin về việc phát hành trái phiếu ra công chúng năm 2024",
                  content: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank) thông báo phát hành Trái phiếu ra công chúng năm 2024 với số lượng đăng ký chào bán là 100.000.000 trái phiếu, tương đương 10.000 tỷ đồng nội dung cụ thể như sau...."
                },
                {
                  title: "Agribank công bố thông tin về việc phát hành trái phiếu ra công chúng năm 2023",
                  content: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank) thông báo phát hành Trái phiếu ra công chúng năm 2023 với số lượng đăng ký chào bán là 100.000.000 trái phiếu, tương đương 10.000.000.000.000 đồng. nội dung cụ thể như sau...."
                },
                {
                  title: "Agribank công bố thông tin về việc phát hành trái phiếu ra công chúng năm 2022",
                  content: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam (Agribank) thông báo phát hành Trái phiếu ra công chúng năm 2022 với số lượng đăng ký chào bán là 100.000.000 trái phiếu, tương đương 10.000.000.000.000 đồng. nội dung cụ thể như sau...."
                },
              ].map((bond, idx) => (
                <div key={idx} className="bg-white shadow-md rounded p-4">
                  <h3 className="text-lg font-bold text-green-600">{bond.title}</h3>
                  <p className="text-gray-700 mt-2">{bond.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
     
       <TradingPlatform></TradingPlatform>
     
     
      <Footer />
    </div>
  )
}

export default Index;