"use client";
import React from "react";
import Footer from "../index/footer";
import ServiceSection from "./home.service";
import MarketIndex from "./home.market";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import NewsArticle from "./home.news";
import Header from "@/components/header";

function Index() {
  const { t } = useTranslation();

  const companyNameStyle = {
    textShadow: "0px 0px 6px #C5FFD8",
  };

  return (
    <div className="font-sans text-black">
      <Header />

      <main>
        <div className="bg-container relative flex h-[34rem] items-center justify-center text-white sm:h-[34rem]">
          <div className="z-10 text-center">
            <h1
              className="text-3xl font-bold sm:text-5xl"
              style={{ ...companyNameStyle }}
            >
              {t("companyName")}
            </h1>
            <p className="mt-4 text-lg sm:text-xl">{t("companySlogan")}</p>
            <button
              className="mt-6 h-[4rem] w-[15rem] rounded-full bg-green-600 bg-gradient-to-b from-[#1ADB21] to-[#0C911A] px-6 py-3 text-2xl text-white shadow-[0px_0px_24px_rgba(174,255,97,0.35)]"
              style={{ fontWeight: 530, visibility: "hidden" }}
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

        <ServiceSection />
        <MarketIndex />

        <div
          className="bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/homepage/serviceBackground.png')",
          }}
        >
          <NewsArticle />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Index;
