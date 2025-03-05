import { useTranslation } from "react-i18next";

type TabKey = "VNINDEX" | "HNXINDEX" | "UPINDEX";

interface TabContentItem {
  key: TabKey;
  value: string;
  change: string;
  changePercent: string;
  growingState: number;
}

const MarketIndex: React.FC = () => {
  const { t } = useTranslation();

  // Convert the object into an array of key-value pairs
  const tabContent: TabContentItem[] = [
    {
      key: "VNINDEX",
      value: "1316.8",
      change: "+4.96",
      changePercent: "+0.36%",
      growingState: 1,
    },
    {
      key: "HNXINDEX",
      value: "237.6",
      change: "+0.18",
      changePercent: "+0.18%",
      growingState: 0,
    },
    {
      key: "UPINDEX",
      value: "99.34",
      change: "-0.24",
      changePercent: "-0.23%",
      growingState: -1,
    },
  ];

  return (
    <div className="bg-white py-10 ">
      <div className="w-full flex items-center justify-center mb-[2rem] mt-[5rem]">
        <h1 className="text-green-600 text-4xl font-bold mb-2 leading-tight bg-[linear-gradient(89.95deg,#0D169E_0.08%,#1C8D54_105.53%)] bg-clip-text text-transparent">
          {t("marketIndexes")}
        </h1>
      </div>

      {/* index card */}
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 w-[80%] gap-3">
          {tabContent.map((item) => (
            <div
              key={item.key}
              className="p-4 bg-white shadow-md rounded-3xl border border-gray-200"
            >
              <div className="flex flex-col">
                <div className="linear-text-gradient font-bold text-2xl">
                  {item.key}
                </div>
              </div>
              <div className="flex flex-row justify-between mt-[1rem]">
                <div>
                  <span className="text-3xl font-bold text-red-500">
                    {item.value}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`text-2xl font-semibold flex items-center ${
                      item.growingState > 0
                        ? "text-green-500"
                        : item.growingState < 0
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {item.change} ({item.changePercent})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketIndex;
