import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
type TabKey = 'individual' | 'financial' | 'utilities' | 'support';

interface TabContentItem {
  icon: string;
  label: string;
  imgSrc: string;
  fileDescription?: string | null; // Nullable description
}

const ServiceSection: React.FC = () => {
  const { t } = useTranslation();
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<TabKey>('individual');

  // Content for each tab
  const tabContent: Record<TabKey, TabContentItem[]> = {
    individual: [
      { icon: '👩‍💼', label: t("broker"),imgSrc:"/images/homepage/Icons.svg",fileDescription:"Đội ngũ chuyên gia của chúng tôi luôn đồng hành, mang đến những tư vấn chuyên sâu và chiến lược đầu tư hiệu quả." },
      { icon: '📊', label: t("securitiesServices"),imgSrc:"/images/homepage/Icons-2.svg" ,fileDescription:" Chúng tôi cung cấp các giải pháp chứng khoán toàn diện, giúp bạn đưa ra quyết định sáng suốt và đạt được lợi nhuận tối đa."},
      { icon: '💰', label: t("investorFundManagement"),imgSrc:"/images/homepage/Icons-3.svg",fileDescription:"Với đội ngũ chuyên gia, chúng tôi mang đến dịch vụ quản lý tiền đầu tư chuyên nghiệp, giúp bạn bảo vệ và gia tăng tài sản một cách hiệu quả." },
      { icon: '🔗', label: t("financialServices"),imgSrc:"/images/homepage/Icons-4.svg", fileDescription:"Chúng tôi cung cấp đa dạng các dịch vụ tài chính, từ tư vấn chiến lược đến quản lý rủi ro, giúp bạn đạt được mục tiêu tài chính dài hạn."},
    ],
    financial: [
      { icon: '🏦', label: t("portfolioManagement"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '📈', label: t("corporateFinanceConsulting"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '🧾', label: t("shareholderManagement"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '🛠️', label: t("financialServices"),imgSrc:"/images/homepage/Icons.svg" },
    ],
    utilities: [
      { icon: '🔍', label: t("webTrading"),imgSrc:"/images/homepage/Icons.svg"},
      { icon: '🗂️', label: t("homeTradingApp"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '📂', label: t("mobileWebTrading"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '🛡️', label: t("mobileAppTrading"),imgSrc:"/images/homepage/Icons.svg" },
    ],
    support: [
      { icon: '📞', label: t("transactionGuide"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '📚', label: t("fundTransactionGuide"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '💡', label: t("accountManagementGuide"),imgSrc:"/images/homepage/Icons.svg" },
      { icon: '✉️', label: t("forms"),imgSrc:"/images/homepage/Icons.svg" },
    ],
  };

  const cardStyle = {

    width: "396",
    height: "268",
    gap: "16px",
    paddingTop: "44px",
    paddingRight: "16px",
    paddingBottom: "32px",
    paddingLeft: "16px",
    borderRadius: "32px"
  }

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto">
        {/* Header Tabs */}
        <div className="text-center mb-8">
          <h1 className="text-green-600 text-2xl font-bold mb-2 bg-[linear-gradient(89.95deg,#0D169E_0.08%,#1C8D54_105.53%)] bg-clip-text text-transparent text-4xl font-bold">{t('companyProvide')}</h1>
          {/* <div className="flex justify-center space-x-8 text-gray-600">
            <button
              onClick={() => setActiveTab('individual')}
              className={`${
                activeTab === 'individual' ? 'border-b-2 border-green-600 text-black font-medium' : 'hover:text-black'
              } px-4 py-2`}
            >
             {t('personalCustomer')}
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`${
                activeTab === 'financial' ? 'border-b-2 border-green-600 text-black font-medium' : 'hover:text-black'
              } px-4 py-2`}
            >
             {t('bussinessCustomer')}
            </button>
            <button
              onClick={() => setActiveTab('utilities')}
              className={`${
                activeTab === 'utilities' ? 'border-b-2 border-green-600 text-black font-medium' : 'hover:text-black'
              } px-4 py-2`}
            >
              {t('utility')}
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`${
                activeTab === 'support' ? 'border-b-2 border-green-600 text-black font-medium' : 'hover:text-black'
              } px-4 py-2`}
            >
               {t('supportTutorial')}
            </button>
          </div> */}
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-center items-center">
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-8 mt-8 sm:mt-0 sm:ml-12">
            {tabContent[activeTab].map((item, index) => (
              <div key={index} className="relative" >
                <div className=" w-84 h-full  bg-gray-100 flex items-center justify-center shadow-md " style={cardStyle}>
                  <div className="text-center">
                       <img src={item.imgSrc} alt={item.label} className="w-12 h-12 mx-auto" />
                    <p className="mt-2  font-[700] text-xl">{item.label}</p>
                    <p className="mt-2 font-[500] text-l">{item.fileDescription}</p>
                  </div>
                </div>
                {/* <div className="absolute w-[calc(100%+8px)] h-[calc(100%+8px)] left-[-4px] transform rotate-60" /> */}
              </div>
            ))}
          </div>
        </div>


        {/* CTA Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2 bg-[#0D169E] text-white rounded-full font-semibold shadow-md hover:bg-green-700 transition">
            Xem Tất Cả
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
