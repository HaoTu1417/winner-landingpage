"use client";
import React, { useState } from "react";
import Footer from "../index/footer";
import ServiceSection from "./home.service";
import MarketIndex from "./home.market";
// import TradingPlatform from "./home.tradingPlatform";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../ui/components/LanguageSelector";
// import UIGrid from "./home.uigrid";
import Image from "next/image";

import { usePathname } from "next/navigation";
import NewsArticle from "./home.news";

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { t } = useTranslation();
  const pathname = usePathname();

  const interFont = {
    fontFamily: "Inter",
  };

  const headerStyle = {
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "22.4px",
    letterSpacing: "2%",
    color: "#403D3D",
  };
  const companyNameStyle = {
    textShadow: "0px 0px 6px #C5FFD8",
  };
  //posts

  // Define an array of navigation items
  const navLinks = [
    { href: "/", label: "Trang chủ", extraClass: "inter" },
    { href: "/news", label: "Tin tức" },
  ];

  /**
   *  { href: "/", label: "Trang chủ", extraClass: "inter",  },
    { href: "/news", label: "Tin tức" },
    { href: "/service", label: "Dịch vụ" },
    { href: "/tttt", label: "Tư vấn trực tuyến" },
    { href: "/analyst", label: "Trung tâm phân tích" },
    { href: "/future", label: "Phái sinh" },
    {
      href: "/about",
      label: "Về WFS",
      // Mark this as special so we can conditionally change its style based on the pathname
      
    },
   */

  // Common classes for all links
  const commonClasses =
    "mx-2 transition-all duration-300 hover:underline hover:text-[#0D169E]";

  return (
    <div className="font-sans text-black">
      {/* Header */}
      <header
        style={{ ...headerStyle, ...interFont }}
        className="text-blue bg-white"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Menu Toggle (Mobile) */}
          <button
            className="block lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="h-20 text-lg font-bold">
            <img
              src="/images/LogoWFS.png"
              className="mr-2 h-full object-contain"
              alt="Logo"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden flex-row lg:flex" id="NavigationLink">
            {navLinks.map((link, index) => {
              // For special link(s), add extra classes and inline styles conditionally
              const isSpecial = pathname === link.href;
              return (
                <a
                  key={index}
                  href={link.href}
                  className={`${commonClasses} ${link.extraClass || ""} ${
                    isSpecial ? "underline underline-offset-4" : ""
                  }`}
                  style={
                    isSpecial
                      ? { ...headerStyle, color: "#0D169E", fontWeight: 700 }
                      : headerStyle
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <LanguageSelector />
        </div>
      </header>

      {/* Mobile Menu */}
      {/* {menuOpen && (
        <nav className="top-full left-0 bg-black text-white w-full lg:hidden">
          <div className="flex flex-col space-y-2 p-4">
            <a href="#" className="block py-2">
              TIN TỨC
            </a>
            <a href="#" className="block py-2">
              SẢN PHẨM DỊCH VỤ
            </a>
            <a href="#" className="block py-2">
              TƯ VẤN TRỰC TUYẾN
            </a>
            <a href="#" className="block py-2">
              TRUNG TÂM PHÂN TÍCH
            </a>
            <a href="#" className="block py-2">
              PHÁI SINH
            </a>
            <a href="#" className="block py-2">
              VỀ AGR
            </a>
          </div>
        </nav>
      )} */}

      {/* Main Section */}
      <main>
        <div className="bg-container relative flex h-[34rem] items-center justify-center text-white sm:h-[34rem]">
          <div className="z-10 text-center">
            <h1
              className="text-3xl font-bold sm:text-5xl"
              style={{ ...companyNameStyle, ...interFont }}
            >
              {t("companyName")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl">{t("companySlogan")}</p>
            <button
              className="mt-6 h-[4rem] w-[15rem] rounded-full bg-green-600 bg-gradient-to-b from-[#1ADB21] to-[#0C911A] px-6 py-3 text-2xl text-white shadow-[0px_0px_24px_rgba(174,255,97,0.35)]"
              style={{ ...interFont, fontWeight: 530, visibility: "hidden" }}
            >
              {t("startNow")}
            </button>
          </div>

          <div
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}
          ></div>
          <div>
            <Image
              src="/images/homepage/BannerDesktop1.png"
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
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100 rounded-lg shadow-lg"> */}
        {/* Left Text Section */}
        {/* <div className="md:w-1/2 p-6 rounded-lg" style={{
        background: "linear-gradient(90deg, #F3F8FF 0%, #FFFFFF 100%)",
        borderRadius: "16px"
      }}>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Dịch vụ của chúng tôi</h2>
        <p className="text-gray-700">
          Tư vấn đầu tư, thông tin tài chính, và giải pháp lãi suất tốt nhất. Dành
          cho cả nhà đầu tư cá nhân và doanh nghiệp, chúng tôi cung cấp tư vấn
          tài chính chuyên sâu, thông tin thị trường nhanh chóng, cùng các gói tài
          chính linh hoạt với lãi suất cạnh tranh hàng đầu. Tận dụng cơ hội,
          kiểm soát rủi ro, tối đa hóa lợi nhuận – cùng WFS phát triển bền vững.
        </p>
      </div> */}

        {/* Right Image Section */}
        {/* <div className="md:w-1/2 flex justify-center relative">
        <div className="relative  p-6 rounded-lg ">
          <img
            src="/images/homepage/div.order-1.png"
            alt="Financial Services"
          />
        </div>
      </div>
    </div> */}

        <ServiceSection />
        <MarketIndex />

        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/homepage/serviceBackground.png')",
          }}
        >
          {/* <UIGrid /> */}
          <NewsArticle />
        </div>

        {/* ...other sections */}
      </main>

      {/* <TradingPlatform /> */}

      <Footer />
    </div>
  );
}

export default Index;
