import { useState } from "react";
import Image from "next/image";

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
      name: "Nguyễn Mạnh Hùng",
      title: "Chủ tịch",
      image: "/images/team/2e.png",
    },
    {
      id: 2,
      name: "Nguyễn Ngọc Anh",
      title: "Tổng Giám đốc",
      image: "/images/team/Ba_Ngoc_Anh-removebg-preview.png",
    },
    {
      id: 3,
      name: "Tô Thùy Linh",
      title: "Phó Tổng Giám đốc",
      image: "/images/team/DNB09124 b.png",
    },
    {
      id: 4,
      name: "Trần Minh Quang",
      title: "Phó Tổng Giám đốc",
      image: "/images/team/Picture6.png",
    },
  ],
  investmentTeam: [
    {
      id: 1,
      name: "Nguyễn Bá Huy, CFA",
      title: "GIÁM ĐỐC ĐẦU TƯ",
      image: "/images/team/NguyenBaHuy_profile-2-removebg-preview.png",
    },
    {
      id: 2,
      name: "Nguyễn Xuân Quỳnh",
      title: "GIÁM ĐỐC ĐẦU TƯ",
      image: "/images/team/chi quynh.png",
    },
    {
      id: 3,
      name: "Lê Anh Minh",
      title: "GIÁM ĐỐC ĐẦU TƯ",
      image: "/images/team/ss.png",
    },
  ],
};

const TeamSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"leadership" | "investmentTeam">(
    "leadership",
  );

  return (
    <div className="mx-auto max-w-7xl px-8 py-16">
      <h2 className="mb-4 text-center text-3xl font-semibold text-green-600">
        Đội ngũ
      </h2>
      <p className="mb-8 text-center text-gray-600">
        Ban lãnh đạo dày dạn kinh nghiệm và đội ngũ chuyên gia đầu tư, am hiểu
        sâu sắc thị trường tài chính Việt Nam và quốc tế.
      </p>

      {/* Tabs */}
      <div className="mb-8 flex justify-center space-x-8 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("leadership")}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            activeTab === "leadership"
              ? "border-green-600 text-green-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Ban lãnh đạo
        </button>
        <button
          onClick={() => setActiveTab("investmentTeam")}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            activeTab === "investmentTeam"
              ? "border-green-600 text-green-600"
              : "border-transparent text-gray-600"
          }`}
        >
          Đội ngũ đầu tư
        </button>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamData[activeTab].map((member) => (
          <div
            key={member.id}
            className="bg-whiteshadow-md rounded-lg bg-gray-50 text-center transition hover:shadow-lg"
          >
            <div className="relative mx-auto h-32 w-32">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg bg-gray-200">
              <div className="m-2 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500">{member.title}</p>
              </div>
              <button className="m-2 mt-4 h-8 w-8 rounded-full bg-gray-300 text-gray-600 text-green-600 hover:bg-white">
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
