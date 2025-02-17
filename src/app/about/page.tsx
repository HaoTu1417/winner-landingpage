'use client';
import { useState, useRef } from 'react';

import Summary from './about.summary';
import VisionAndPhilosophy from './about.VisionAndPhilosophy';
import TeamSection from './about.TeamSection';
import AwardsSection from './about.AwardsSection';
import Footer from '../index/footer';
import { useRouter } from 'next/navigation';
export default function AboutPage() {
  const tabs = ['Tổng quan', 'Đội ngũ', 'Giải thưởng'];
  const [activeTab, setActiveTab] = useState(0);

  // Create refs for each section
  const teamRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);

  // Array of section refs (skipping Summary for scrolling)
  const sectionRefs = [teamRef, awardsRef];

  // Handle tab click and scroll to the corresponding section
  const handleTabClick = (index: number) => {
    if (index === 0) return; // Disable click for the first tab
    setActiveTab(index);
    sectionRefs[index - 1]?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const router = useRouter();
  const handleBackHome = () => {
    router.push('/');
};
  return (
    <div>
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-600 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <p className="text-sm mb-2" onClick={handleBackHome}>Trang chủ / Về chúng tôi</p>
          <h1 className="text-4xl font-bold mb-4">Chúng tôi là ai</h1>
          <p className="max-w-2xl">
            SSIAM là công ty quản lý quỹ hàng đầu Việt Nam, thành viên thuộc
            100% sở hữu bởi CTCP Chứng khoán SSI. SSIAM cung cấp dịch vụ quản lý
            quỹ, quản lý danh mục đầu tư cho khách hàng trong và ngoài nước nhằm
            gia tăng giá trị tài sản cho khách hàng.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex space-x-8">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                disabled={index === 0} // Disable the first tab
                className={`text-sm font-medium py-2 px-4 border-b-2 ${
                  activeTab === index
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600'
                } ${index === 0 ? 'cursor-not-allowed text-gray-400' : ''}`} // Style disabled tab
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div>
        <Summary />
        <VisionAndPhilosophy></VisionAndPhilosophy>
      </div>

      <div ref={teamRef}>
        <TeamSection />
      </div>
           
      <div ref={awardsRef}>
        <AwardsSection />
      </div>

      <Footer />
    </div>
  );
}
