import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const cards = [
  {
    title: "TRUNG TÂM PHÂN TÍCH",
    image: "/images/homepage/bg-trung-tam-phan-tich.png",
    link: "/analytics-center",
  },
  {
    title: "IBOARD WEB",
    image: "/images/homepage/bg-web-trading.png",
    link: "/iboard",
  },
  {
    title: "IBOARD PRO",
    image: "/images/homepage/bg-mobile-trading.png",
    link: "/iboard-pro",
  },
  {
    title: "TRUNG TÂM KIẾN THỨC",
    image: "/images/homepage/bg-pro-trading.png",
    link: "/knowledge-center",
  },
];

export default function UIGrid() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 p-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          {t('investmentPortal')}
        </h2>
      </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <Link href={card.link} key={index}>
            <div
              className="relative group bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 w-full"
              style={{ height: '20rem' }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60"></div>
              <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold group-hover:text-xl transition-all">
                {card.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
