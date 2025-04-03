import React, { useState } from "react";
import { useTranslation } from "react-i18next";

type TabKey = "individual" | "financial" | "utilities" | "support";

interface TabContentItem {
  icon: string;
  label: string;
  imgSrc: string;
  fileDescription?: string | null;
}

const ServiceSection: React.FC = () => {
  const { t } = useTranslation();

  // ✅ Properly define the activeTab state
  const [activeTab, setActiveTab] = useState<TabKey>("individual");

  const tabContent: Record<TabKey, TabContentItem[]> = {
    individual: [
      {
        icon: "👩‍💼",
        label: t("broker"),
        imgSrc: "/images/homepage/Icons.svg",
        fileDescription: "Chuyên gia tư vấn chuyên sâu về đầu tư.",
      },
      {
        icon: "📊",
        label: t("securitiesServices"),
        imgSrc: "/images/homepage/Icons-2.svg",
        fileDescription: "Giải pháp đầu tư toàn diện.",
      },
      {
        icon: "💰",
        label: t("investorFundManagement"),
        imgSrc: "/images/homepage/Icons-3.svg",
        fileDescription: "Quản lý đầu tư chuyên nghiệp.",
      },
      {
        icon: "🔗",
        label: t("financialServices"),
        imgSrc: "/images/homepage/Icons-4.svg",
        fileDescription: "Dịch vụ tài chính đa dạng.",
      },
    ],
    financial: [
      {
        icon: "🏦",
        label: t("portfolioManagement"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "📈",
        label: t("corporateFinanceConsulting"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "🧾",
        label: t("shareholderManagement"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "🛠️",
        label: t("financialServices"),
        imgSrc: "/images/homepage/Icons.svg",
      },
    ],
    utilities: [
      {
        icon: "🔍",
        label: t("webTrading"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "🗂️",
        label: t("homeTradingApp"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "📂",
        label: t("mobileWebTrading"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "🛡️",
        label: t("mobileAppTrading"),
        imgSrc: "/images/homepage/Icons.svg",
      },
    ],
    support: [
      {
        icon: "📞",
        label: t("transactionGuide"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "📚",
        label: t("fundTransactionGuide"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      {
        icon: "💡",
        label: t("accountManagementGuide"),
        imgSrc: "/images/homepage/Icons.svg",
      },
      { icon: "✉️", label: t("forms"), imgSrc: "/images/homepage/Icons.svg" },
    ],
  };

  const cardStyle = {
    width: "100%",
    height: "268px",
    gap: "16px",
    // paddingTop: "44px",
    // paddingRight: "16px",
    // paddingBottom: "32px",
    // paddingLeft: "16px",
    borderRadius: "32px",
  };

  return (
    <section className="mt-[4rem] bg-white py-10">
      <div className="container mx-auto">
        {/* Tabs */}
        <div className="text-center">
          <h1 className="mb-[2rem] bg-[linear-gradient(89.95deg,#0D169E_0.08%,#1C8D54_105.53%)] bg-clip-text text-4xl font-bold leading-tight text-green-600 text-transparent">
            {t("companyProvide")}
          </h1>
          <p className="mb-[3rem]">
            Giải pháp tài chính thông minh, tối ưu lợi nhuận Ứng dụng công nghệ
            hiện đại cùng đội ngũ chuyên gia tài chính hàng đầu, chúng tôi cung
            cấp tư vấn đầu tư chuyên sâu, thông tin tài chính minh bạch, và các
            gói tài chính linh hoạt với lãi suất hấp dẫn nhất trên thị trường.
            Giúp bạn ra quyết định đúng đắn – An tâm đầu tư – Gia tăng tài sản.
          </p>

          <div className="flex hidden justify-center space-x-8 text-gray-600">
            <button
              onClick={() => setActiveTab("individual")}
              className={`${
                activeTab === "individual"
                  ? "border-b-2 border-green-600 font-medium text-black"
                  : "hover:text-black"
              } px-4 py-2`}
            >
              {t("personalCustomer")}
            </button>
            <button
              onClick={() => setActiveTab("financial")}
              className={`${
                activeTab === "financial"
                  ? "border-b-2 border-green-600 font-medium text-black"
                  : "hover:text-black"
              } px-4 py-2`}
            >
              {t("businessCustomer")}
            </button>
            <button
              onClick={() => setActiveTab("utilities")}
              className={`${
                activeTab === "utilities"
                  ? "border-b-2 border-green-600 font-medium text-black"
                  : "hover:text-black"
              } px-4 py-2`}
            >
              {t("utility")}
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`${
                activeTab === "support"
                  ? "border-b-2 border-green-600 font-medium text-black"
                  : "hover:text-black"
              } px-4 py-2`}
            >
              {t("supportTutorial")}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-full flex-wrap items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {" "}
            {/* Added `gap-4` */}
            {tabContent[activeTab]?.map((item, index) => (
              <div
                key={index}
                className="flex h-full w-auto items-center justify-center rounded-xl bg-gray-100 p-4 shadow-md"
                style={cardStyle}
              >
                <div className="text-center">
                  <img
                    src={item.imgSrc}
                    alt={item.label}
                    className="mx-auto h-12 w-12"
                  />
                  <p className="mt-2 text-xl font-bold">{item.label}</p>
                  {item.fileDescription && (
                    <p className="text-l mt-2 font-medium">
                      {item.fileDescription}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        {/* <div className="text-center mt-10">
          <button className="px-6 py-2 bg-[#0D169E] text-white rounded-full font-semibold shadow-md hover:bg-green-700 transition">
            Xem Tất Cả
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default ServiceSection;
