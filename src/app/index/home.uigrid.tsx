import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const cards = [
  {
    title: "Tin tức bất động sản",
    image: "/images/homepage/bg-mobile-trading.png",
    link: "https://cafef.vn/bat-dong-san.chn",
  },
  {
    title: "Tin tức tài chính",
    image: "/images/homepage/bg-pro-trading.png",
    link: "https://cafef.vn/thi-truong-chung-khoan.chn",
  },
];

/**
 * 
 * @returns   {
    title: "TRUNG TÂM PHÂN TÍCH",
    image: "/images/homepage/bg-trung-tam-phan-tich.png",
    link: "/analytics-center",
  },
  {
    title: "IBOARD WEB",
    image: "/images/homepage/bg-web-trading.png",
    link: "/iboard",
  },
 */

export default function UIGrid() {
  const { t } = useTranslation();

  return (
    <div className="mt-[3rem] bg-cover bg-center p-6" id="parent">
      <div>
        <h2 className="linear-text-gradient2 mb-6 mb-[4rem] text-center text-2xl font-bold sm:text-3xl">
          {t("investmentPortal")}
        </h2>
      </div>
      <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {cards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div
              className="group relative w-full transform cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105"
              style={{ height: "20rem" }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-white transition-all group-hover:text-xl">
                {card.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
