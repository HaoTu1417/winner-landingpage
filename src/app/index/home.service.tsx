import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
type TabKey = 'individual' | 'financial' | 'utilities' | 'support';

interface TabContentItem {
  icon: string;
  label: string;
}

const ServiceSection: React.FC = () => {
  const { t } = useTranslation();
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<TabKey>('individual');

  // Content for each tab
  const tabContent: Record<TabKey, TabContentItem[]> = {
    individual: [
      { icon: '👩‍💼', label: t("broker") },
      { icon: '📊', label: t("securitiesServices") },
      { icon: '💰', label: t("investorFundManagement") },
      { icon: '🔗', label: t("financialServices") },
    ],
    financial: [
      { icon: '🏦', label: t("portfolioManagement") },
      { icon: '📈', label: t("corporateFinanceConsulting") },
      { icon: '🧾', label: t("shareholderManagement") },
      { icon: '🛠️', label: t("financialServices") },
    ],
    utilities: [
      { icon: '🔍', label: t("webTrading") },
      { icon: '🗂️', label: t("homeTradingApp") },
      { icon: '📂', label: t("mobileWebTrading") },
      { icon: '🛡️', label: t("mobileAppTrading") },
    ],
    support: [
      { icon: '📞', label: t("transactionGuide") },
      { icon: '📚', label: t("fundTransactionGuide") },
      { icon: '💡', label: t("accountManagementGuide") },
      { icon: '✉️', label: t("forms") },
    ],
  };

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto">
        {/* Header Tabs */}
        <div className="text-center mb-8">
          <h1 className="text-green-600 text-2xl font-bold mb-2">{t('companyProvide')}</h1>
          <div className="flex justify-center space-x-8 text-gray-600">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap justify-center items-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 mt-8 sm:mt-0 sm:ml-12">
            {tabContent[activeTab].map((item, index) => (
              <div key={index} className="relative">
                <div className="hexagon w-32 h-32 bg-gray-100 flex items-center justify-center shadow-md">
                  <div className="text-center">
                    <div className="text-3xl">{item.icon}</div>
                    <p className="mt-2 text-sm font-medium">{item.label}</p>
                  </div>
                </div>
                <div className="absolute w-[calc(100%+8px)] h-[calc(100%+8px)] border border-dashed border-green-600 top-[-4px] left-[-4px] transform rotate-60" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold shadow-md hover:bg-green-700 transition">
            Xem Tất Cả
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
