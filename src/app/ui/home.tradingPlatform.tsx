"use-client";
import React, { useState } from "react";

import ImageButton from "./components/ImageButton";

const handleClick = () => {
  alert("Button clicked!");
};

function TradingPlatform() {
  const [activeTab, setActiveTab] = useState("WFS Trading");

  const tabs = ["WFS Trading", "Mobile App"];
  return (
    <div className="max-w-5xl mx-auto p-5 text-center">
      <h1 className="text-2xl font-bold text-gray-800">WFS Trading</h1>
      <p className="text-gray-600 mt-4">
        Nền tảng giao dịch của chúng tôi được xây dựng trên những giá trị cốt
        lõi của sự minh bạch, hiệu quả và tính khả dụng. Nó nhằm mục tiêu cung
        cấp cho nhà đầu tư các công cụ để đưa ra những quyết định đầu tư và kế
        hoạch tài chính tốt nhất có thể sẽ định hình tương lai của họ.
      </p>
      <p className="text-gray-600 mt-2">
        Các chức năng bao gồm giao dịch thời gian thực và tần suất cao, thực
        hiện nhanh chóng, cho vay ký quỹ tự động, lệnh có điều kiện, chuyển tiền
        mặt, theo dõi danh mục và phân tích tài chính.
      </p>
      <p className="text-gray-600 mt-2">
        Truy cập thông qua máy tính để bàn (Vietcap Pro), trang website và ứng
        dụng di động.
      </p>

      <div className="flex items-center justify-center p-4 rounded-lg shadow-sm">
        <div className="flex space-x-4 bg-gray-200 p-1 rounded-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-green-600 text-white shadow"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
      <img
          src="/khcn-vietcap-trading.webp"
          alt="Laptop displaying Vietcap Pro"
          className={`w-full max-w-md ${activeTab === tabs[0] ? "" : "hidden"}`}
        />
        <img
          src="/khcn-vietcap-mobile.webp"
          alt="Laptop displaying Vietcap Pro"
          className={`w-full max-w-md ${activeTab === tabs[1] ? "" : "hidden"}`}
        />
        <button
          className={`mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-800 ${
            activeTab === tabs[0] ? "" : "hidden"
          }`}
        >
          Trải nghiệm ngay
        </button>
        <div className="flex flex-row">
          <ImageButton
            imageSrc="/google-play-icon.svg"
            altText="Placeholder Icon"
            buttonText=""
            onClick={handleClick}
            className={`m-6 w-auto h-auto bg-black text-white rounded-md hover:bg-black ${
              activeTab === tabs[1] ? "" : "hidden"
            }`}
            
          />
          <ImageButton
            imageSrc="/apple-icon.svg"
            altText="Placeholder Icon"
            buttonText=""
            onClick={handleClick}
            className={`m-6 w-auto h-auto bg-black text-white rounded-md hover:bg-black ${
              activeTab === tabs[1] ? "" : "hidden"
            }`}
            
          />
        </div>
      </div>
    </div>
  );
}

export default TradingPlatform;
