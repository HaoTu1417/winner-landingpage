import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image: string;
}

interface TeamData {
  leadership: TeamMember[];
  investmentTeam: TeamMember[];
}

const teamData: TeamData = {
  leadership: [
    {
      id: 1,
      name: 'Nguyễn Mạnh Hùng',
      title: 'Chủ tịch',
      image: '/2e.png',
    },
    {
      id: 2,
      name: 'Nguyễn Ngọc Anh',
      title: 'Tổng Giám đốc',
      image: '/Ba_Ngoc_Anh-removebg-preview.png',
    },
    {
      id: 3,
      name: 'Tô Thùy Linh',
      title: 'Phó Tổng Giám đốc',
      image: '/DNB09124 b.png',
    },
    {
      id: 4,
      name: 'Trần Minh Quang',
      title: 'Phó Tổng Giám đốc',
      image: '/Picture6.png',
    },
  ],
  investmentTeam: [
    {
      id: 1,
      name: 'Nguyễn Bá Huy, CFA',
      title: 'GIÁM ĐỐC ĐẦU TƯ',
      image: '/NguyenBaHuy_profile-2-removebg-preview.png',
    },
    {
      id: 2,
      name: 'Nguyễn Xuân Quỳnh',
      title: 'GIÁM ĐỐC ĐẦU TƯ',
      image: '/chi quynh.png',
    },
    {
      id: 3,
      name: 'Lê Anh Minh',
      title: 'GIÁM ĐỐC ĐẦU TƯ',
      image: '/ss.png',
    },
  ],
};

const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leadership' | 'investmentTeam'>('leadership');

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-semibold text-center mb-4 text-green-600">Đội ngũ</h2>
      <p className="text-center text-gray-600 mb-8">
        Ban lãnh đạo dày dạn kinh nghiệm và đội ngũ chuyên gia đầu tư, am hiểu sâu sắc thị trường tài
        chính Việt Nam và quốc tế.
      </p>

      {/* Tabs */}
      <div className="flex justify-center space-x-8 border-b border-gray-300 mb-8">
        <button
          onClick={() => setActiveTab('leadership')}
          className={`text-sm font-medium py-2 px-4 border-b-2 ${
            activeTab === 'leadership' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-600'
          }`}
        >
          Ban lãnh đạo
        </button>
        <button
          onClick={() => setActiveTab('investmentTeam')}
          className={`text-sm font-medium py-2 px-4 border-b-2 ${
            activeTab === 'investmentTeam' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-600'
          }`}
        >
          Đội ngũ đầu tư
        </button>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamData[activeTab].map((member) => (
          <div
            key={member.id}
            className="bg-whiteshadow-md rounded-lg text-center hover:shadow-lg transition bg-gray-50"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto object-cover "
            />
            <div className="bg-gray-200 flex flex-row justify-between items-center rounded-lg">
              <div className="flex flex-col m-2">
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.title}</p>
              </div>
              <button className="mt-4 w-8 h-8 rounded-full bg-gray-300 hover:bg-white text-gray-600 m-2 text-green-600">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
