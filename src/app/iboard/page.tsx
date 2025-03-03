"use client";
import React, { useState, useEffect } from "react";
import { Stock, Match, OrderBook } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";

function Iboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [changedCells, setChangedCells] = useState<{ [key: string]: boolean }>(
    {}
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
        "VN"
      );
    });
    setStocks(tempStocks);
    isInitDone = true;
  };

  useEffect(() => {
    initStocks();
    const wsClient = new WebSocketClient(
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "ws://localhost:3021"
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
          console.log("updatedStockData", updatedStockData.name);
          const updatedStocks = [...prevStocks];
          const prevStock = updatedStocks[index];

          // Kiểm tra ô nào thay đổi và lưu vào changedCells
          let newChangedCells = { ...changedCells };

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
            updatedStockData.exchange
          );

          setChangedCells(newChangedCells);

          // Reset trạng thái sau 0.5 giây
          setTimeout(() => {
            setChangedCells((prev) => {
              let newState = { ...prev };
              Object.keys(newChangedCells).forEach((key) => {
                delete newState[key];
              });
              return newState;
            });
          }, 500);

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
      <table className="w-full text-sm bg-gray-800 text-black rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr className="text-xs font-semibold border border-gray-700">
            <th className="p-2 text-center border border-gray-700">Mã CK</th>
            <th className="p-2 text-center border border-gray-700">Trần</th>
            <th className="p-2 text-center border border-gray-700">Giá</th>
            <th className="p-2 text-center border border-gray-700">KL</th>
            <th className="p-2 text-center border border-gray-700">
              Giá Mua 1
            </th>
            <th className="p-2 text-center border border-gray-700">
              Giá Bán 1
            </th>
          </tr>
        </thead>
        <tbody className="bg-black text-white">
          {stocks.map((stock) => (
            <tr key={stock.name} className="text-center border border-gray-700">
              <td className="p-2 border border-gray-700">{stock.name}</td>

              {/* Giá trần */}
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.price,
                  stock.reference
                )} ${
                  changedCells[`${stock.ceiling}-price`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
              >
                {(stock.match.price / 1000).toFixed(2)}
              </td>

              {/* Giá khớp lệnh */}
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.price,
                  stock.reference
                )} ${
                  changedCells[`${stock.name}-price`]
                    ? stock.match.price > stock.reference
                      ? "bg-green-500"
                      : "bg-red-500"
                    : ""
                }`}
              >
                {(stock.match.price / 1000).toFixed(2)}
              </td>

              {/* Khối lượng khớp lệnh */}
              <td
                className={`p-2 border border-gray-700 ${
                  changedCells[`${stock.name}-volume`] ? "bg-blue-500" : ""
                }`}
              >
                {stock.match.volume.toLocaleString()}
              </td>

              {/* Giá mua 1 */}
              <td
                className={`p-2 border border-gray-700 ${
                  changedCells[`${stock.name}-bid1`] ? "bg-green-500" : ""
                }`}
              >
                {(stock.orderBook.bids[0] / 1000).toFixed(2)}
              </td>

              {/* Giá bán 1 */}
              <td
                className={`p-2 border border-gray-700 ${
                  changedCells[`${stock.name}-ask1`] ? "bg-red-500" : ""
                }`}
              >
                {(stock.orderBook.asks[0] / 1000).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iboard;
