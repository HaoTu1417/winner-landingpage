// Install Tailwind CSS if not already installed by following the guide: https://tailwindcss.com/docs/installation

// components/UIGrid.js
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
const cards = [
  {
    title: 'TRUNG TÂM PHÂN TÍCH',
    image: '/bg-trung-tam-phan-tich.png', // Replace with your image paths
  },
  {
    title: 'IBOARD WEB',
    image: '/bg-web-trading.png',
  },
  {
    title: 'IBOARD PRO',
    image: '/bg-mobile-trading.png',
  },
  {
    title: 'TRUNG TÂM KIẾN THỨC',
    image: '/bg-pro-trading.png',
  },
];

export default function UIGrid() {
    const { t } = useTranslation();
  return (
    <div className="bg-gray-100  p-6">
        <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            {t('investmentPortal')}
          </h2>
        </div>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative group bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform transform hover:scale-105 w-full"
            style={{height:'20rem'}}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              style={{ objectFit: 'cover' }}
            />
             {/* <div className="relative w-full h-56">
              <Image
                src={card.image}
                alt={card.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div> */}
            <div className=" inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60"></div>
            <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold group-hover:text-xl transition-all">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
      {/* Floating Buttons */}
      {/* <div className="fixed bottom-4 right-4 space-y-2">
        <button
          className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-full shadow-lg text-white hover:bg-red-600"
          title="Chat"
        >
          🗨️
        </button>
        <button
          className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full shadow-lg text-white hover:bg-blue-600"
          title="Top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}   
        >
          ⬆️
        </button>
      </div> */}
    </div>
  );
}
