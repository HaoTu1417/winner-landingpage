"use client";
import React, { useState, useEffect } from "react";
import { Stock, Match, OrderBook } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";

function Iboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [changedCells, setChangedCells] = useState<{ [key: string]: boolean }>(
    {},
  );

  const stockNames = ["VCB", "ACB", "HCM"];
  const stockIndex: { [key: string]: number } = {};
  let isInitDone = false;

  const initStocks = () => {
    const tempStocks: Stock[] = stockNames.map((stockName, index) => {
      stockIndex[stockName] = index;
      return new Stock(
        stockName,
        0,
        0,
        0,
        new Match(0, 0, 0, 0, 0),
        new OrderBook([0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]),
        0,
        0,
        0,
        "",
        0,
        "VN",
      );
    });
    setStocks(tempStocks);
    isInitDone = true;
  };

  useEffect(() => {
    initStocks();
    const wsClient = new WebSocketClient(
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "ws://localhost:3021",
    );

    wsClient.socket.onmessage = (event: MessageEvent) => {
      if (!isInitDone) {
        console.log("init not done");
        return;
      }
      const updatedStockData = JSON.parse(event.data);
      // console.log("updatedStockData", updatedStockData);
      setStocks((prevStocks) => {
        const index = stockIndex[updatedStockData.name];
        if (index >= 0) {
          const updatedStocks = [...prevStocks];
          const prevStock = updatedStocks[index];

          // Kiểm tra ô nào thay đổi và lưu vào changedCells
          const newChangedCells = { ...changedCells };

          if (prevStock.ceiling !== updatedStockData.ceiling) {
            newChangedCells[`${updatedStockData.name}-ceiling`] = true;
          }
          if (prevStock.floor !== updatedStockData.floor) {
            newChangedCells[`${updatedStockData.name}-floor`] = true;
          }
          if (prevStock.reference !== updatedStockData.reference) {
            newChangedCells[`${updatedStockData.name}-reference`] = true;
          }
          if (prevStock.match.price !== updatedStockData.match.price) {
            newChangedCells[`${updatedStockData.name}-price`] = true;
          }
          if (prevStock.match.volume !== updatedStockData.match.volume) {
            newChangedCells[`${updatedStockData.name}-volume`] = true;
          }
          if (
            prevStock.orderBook.bids[0] !== updatedStockData.orderBook.bids[0]
          ) {
            newChangedCells[`${updatedStockData.name}-bid1`] = true;
          }
          if (
            prevStock.orderBook.bidSizes[0] !==
            updatedStockData.orderBook.bidSizes[0]
          ) {
            newChangedCells[`${updatedStockData.name}-bidVol1`] = true;
          }

          if (
            prevStock.orderBook.bids[2] !== updatedStockData.orderBook.bids[2]
          ) {
            newChangedCells[`${updatedStockData.name}-bid3`] = true;
          }
          if (
            prevStock.orderBook.bidSizes[2] !==
            updatedStockData.orderBook.bidSizes[2]
          ) {
            newChangedCells[`${updatedStockData.name}-bidVol3`] = true;
          }
          if (
            prevStock.orderBook.asks[0] !== updatedStockData.orderBook.asks[0]
          ) {
            newChangedCells[`${updatedStockData.name}-ask1`] = true;
          }

          updatedStocks[index] = new Stock(
            updatedStockData.name,
            updatedStockData.ceiling,
            updatedStockData.floor,
            updatedStockData.reference,
            updatedStockData.match,
            updatedStockData.orderBook,
            updatedStockData.volume,
            updatedStockData.high,
            updatedStockData.low,
            updatedStockData.updateTime,
            updatedStockData.isEnabled,
            updatedStockData.exchange,
          );
          console.log(
            "updatedStockData",
            updatedStockData.name,
            updatedStocks[index],
          );
          setChangedCells(newChangedCells);

          // Reset trạng thái sau 0.5 giây
          setTimeout(() => {
            setChangedCells((prev) => {
              const newState = { ...prev };
              Object.keys(newChangedCells).forEach((key) => {
                delete newState[key];
              });
              return newState;
            });
          }, 1000);

          return updatedStocks;
        }
        return prevStocks;
      });
    };

    return () => {
      wsClient.closeConnection();
    };
  }, []);

  const getTextColorClass = (price: number, reference: number) => {
    if (price > reference) return "text-green-500";
    if (price < reference) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden rounded-lg bg-gray-800 text-sm text-black">
        <thead className="bg-gray-800 text-gray-300">
          <tr className="border border-gray-700 text-xs font-semibold">
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Mã CK
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Trần
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Sàn
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              TC
            </th>
            <th colSpan={6} className="border border-gray-700 p-2 text-center">
              Bên mua
            </th>
            <th colSpan={4} className="border border-gray-700 p-2 text-center">
              Khớp lệnh
            </th>
            <th colSpan={6} className="border border-gray-700 p-2 text-center">
              Bên bán
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Tổng KL
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Cao
            </th>
            <th rowSpan={2} className="border border-gray-700 p-2 text-center">
              Thấp
            </th>
            <th colSpan={3} className="border border-gray-700 p-2 text-center">
              ĐTNN
            </th>
          </tr>
          <tr className="border border-gray-700 text-xs font-normal">
            <th className="border border-gray-700 p-2 text-center">Giá 3</th>
            <th className="border border-gray-700 p-2 text-center">KL 3</th>
            <th className="border border-gray-700 p-2 text-center">Giá 2</th>
            <th className="border border-gray-700 p-2 text-center">KL 2</th>
            <th className="border border-gray-700 p-2 text-center">Giá 1</th>
            <th className="border border-gray-700 p-2 text-center">KL 1</th>
            <th className="border border-gray-700 p-2 text-center">Giá</th>
            <th className="border border-gray-700 p-2 text-center">KL</th>
            <th className="border border-gray-700 p-2 text-center">+/-</th>
            <th className="border border-gray-700 p-2 text-center">+/- (%)</th>
            <th className="border border-gray-700 p-2 text-center">Giá 1</th>
            <th className="border border-gray-700 p-2 text-center">KL 1</th>
            <th className="border border-gray-700 p-2 text-center">Giá 2</th>
            <th className="border border-gray-700 p-2 text-center">KL 2</th>
            <th className="border border-gray-700 p-2 text-center">Giá 3</th>
            <th className="border border-gray-700 p-2 text-center">KL 3</th>
            <th className="border border-gray-700 p-2 text-center">NN mua</th>
            <th className="border border-gray-700 p-2 text-center">NN bán</th>
            <th className="border border-gray-700 p-2 text-center">Room</th>
          </tr>
        </thead>
        <tbody className="bg-black text-white">
          {stocks.map((stock) => (
            <tr key={stock.name} className="border border-gray-700 text-center">
              <td className="border border-gray-700 p-2">{stock.name}</td>

              {/* Giá trần */}
              <td
                className={`border border-gray-700 p-2 text-[#f23aff] ${
                  changedCells[`${stock.name}-ceiling`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
              >
                {(stock.ceiling / 1000).toFixed(2)}
              </td>

              {/* Giá sàn */}
              <td
                className={`border border-gray-700 p-2 text-[#00c9ff] ${
                  changedCells[`${stock.name}-floor`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
              >
                {(stock.floor / 1000).toFixed(2)}
              </td>

              {/* Giá TC */}
              <td
                className={`border border-gray-700 p-2 text-[#FdFF12] ${
                  changedCells[`${stock.name}-reference`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.reference / 1000).toFixed(2)}
              </td>
              {/* Giá mua 3 */}
              <td
                className={`border border-gray-700 p-2 ${getTextColorClass(
                  stock.match.price,
                  stock.reference,
                )} ${
                  changedCells[`${stock.name}-bid3`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.orderBook.bids[2] / 1000).toFixed(2)}
              </td>
              {/* Vol mua 3 */}
              <td
                className={`border border-gray-700 p-2 ${getTextColorClass(
                  stock.match.price,
                  stock.reference,
                )} ${
                  changedCells[`${stock.name}-bidVol3`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500"
                    : ""
                }`}
              >
                {stock.orderBook.bidSizes[2].toLocaleString("en-US")}
              </td>
              <td>0</td>
              <td>0</td>
              {/* Giá mua 1 */}
              <td
                className={`border border-gray-700 p-2 ${getTextColorClass(
                  stock.match.price,
                  stock.reference,
                )} ${
                  changedCells[`${stock.name}-bid1`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.orderBook.bids[0] / 1000).toFixed(2)}
              </td>
              {/* Vol mua 1 */}
              <td
                className={`border border-gray-700 p-2 ${getTextColorClass(
                  stock.match.price,
                  stock.reference,
                )} ${
                  changedCells[`${stock.name}-bidVol1`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {stock.orderBook.bidSizes[0].toLocaleString("en-US")}
              </td>
              {/* Giá khớp lệnh */}
              <td
                className={`border border-gray-700 p-2 ${getTextColorClass(
                  stock.match.price,
                  stock.reference,
                )} ${
                  changedCells[`${stock.name}-price`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.match.price / 1000).toFixed(2)}
              </td>

              {/* Khối lượng khớp lệnh */}
              <td
                className={`border border-gray-700 p-2 ${
                  changedCells[`${stock.name}-volume`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {stock.match.volume.toLocaleString()}
              </td>
              <td>0</td>
              <td>0</td>

              {/* Giá bán 1 */}
              <td
                className={`border border-gray-700 p-2 ${
                  changedCells[`${stock.name}-ask1`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.orderBook.asks[0] / 1000).toFixed(2)}
              </td>
              {/* Vol bán 1 */}
              <td>0</td>

              {/* Giá bán 1 */}
              <td
                className={`border border-gray-700 p-2 ${
                  changedCells[`${stock.name}-ask1`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {(stock.orderBook.asks[1] / 1000).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iboard;
