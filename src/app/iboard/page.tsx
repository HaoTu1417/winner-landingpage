"use client";
import React, { useState, useEffect } from "react";
import { Stock } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";
import IboardService from "./IboardService";
import { AxiosError } from "axios";

function Iboard() {
  // State to hold stocks
  const [stocks, setStocks] = useState<Stock[]>([]); // Initialize with empty array

  //TODO: setting url backend vào file env
  const iboardService = new IboardService("http://localhost:3020");

  useEffect(() => {
    // Fetch initial data on the client side when the component mounts
    async function fetchData() {
      try {
        const initialStocks = await iboardService.getStocks();
        console.log("initialStocks", initialStocks.data);

        const stockInstances = initialStocks.data.map(
          (obj) =>
            new Stock(
              obj.name,
              obj.ceiling,
              obj.roof,
              obj.reference,
              obj.match,
              obj.orderBook,
              obj.vol,
              obj.high,
              obj.low,
              obj.forgein
            )
        );
        setStocks(stockInstances);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log("Status Code:", error.response?.status);
          console.log("Error Data:", error.response?.data);
        } else if (error instanceof Error) {
          console.log("Error:", error.message);
        } else {
          console.log("Unexpected error:", error);
        }
      }
    }

    fetchData();

    // Create WebSocket connection
    //TODO: add socket domain to config.
    const wsClient = new WebSocketClient("ws://localhost:3020");

    // Listen for messages from WebSocket
    wsClient.socket.onmessage = (event: MessageEvent) => {
      const updatedStock = JSON.parse(event.data) as Stock;
      // Update stock data in the table based on stock.name
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.name === updatedStock.name ? updatedStock : stock
        )
      );
    };

    // Cleanup on component unmount
    return () => {
      wsClient.closeConnection();
    };
  }, []);

  //TODO: fetch dữ liệu từ start

  const getTextColorClass = (price: number, reference: number) => {
    if (price > reference) return "text-green-500";
    if (price < reference) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <div className="p-4">
      <table className="w-full text-sm bg-gray-800 text-black rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          {/* Main Header Row */}
          <tr className="text-xs font-semibold border border-gray-700">
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Mã CK
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Trần
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Sàn
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              TC
            </th>
            <th colSpan={6} className="p-2 text-center border border-gray-700">
              Bên mua
            </th>
            <th colSpan={4} className="p-2 text-center border border-gray-700">
              Khớp lệnh
            </th>
            <th colSpan={6} className="p-2 text-center border border-gray-700">
              Bên bán
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Tổng KL
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Cao
            </th>
            <th rowSpan={2} className="p-2 text-center border border-gray-700">
              Thấp
            </th>
            <th colSpan={3} className="p-2 text-center border border-gray-700">
              ĐTNN
            </th>
          </tr>

          {/* Sub-header Row */}
          <tr className="text-xs font-normal border border-gray-700">
            <th className="p-2 text-center border border-gray-700">Giá 3</th>
            <th className="p-2 text-center border border-gray-700">KL 3</th>
            <th className="p-2 text-center border border-gray-700">Giá 2</th>
            <th className="p-2 text-center border border-gray-700">KL 2</th>
            <th className="p-2 text-center border border-gray-700">Giá 1</th>
            <th className="p-2 text-center border border-gray-700">KL 1</th>
            <th className="p-2 text-center border border-gray-700">Giá</th>
            <th className="p-2 text-center border border-gray-700">KL</th>
            <th className="p-2 text-center border border-gray-700">+/-</th>
            <th className="p-2 text-center border border-gray-700">+/- (%)</th>
            <th className="p-2 text-center border border-gray-700">Giá 1</th>
            <th className="p-2 text-center border border-gray-700">KL 1</th>
            <th className="p-2 text-center border border-gray-700">Giá 2</th>
            <th className="p-2 text-center border border-gray-700">KL 2</th>
            <th className="p-2 text-center border border-gray-700">Giá 3</th>
            <th className="p-2 text-center border border-gray-700">KL 3</th>
            <th className="p-2 text-center border border-gray-700">NN mua</th>
            <th className="p-2 text-center border border-gray-700">NN bán</th>
            <th className="p-2 text-center border border-gray-700">Room</th>
          </tr>
        </thead>
        <tbody className="bg-black text-white">
          {stocks.map((stock, index) => (
            <tr key={index} className="p-2 border-t text-center">
              <td className="p-2 border border-gray-700">{stock.name}</td>
              <td className="p-2 border border-gray-700 text-purple-500">
                {(stock.ceiling / 1000).toFixed(2)}
              </td>
              <td className="p-2 border border-gray-700 text-cyan-500">
                {(stock.roof / 1000).toFixed(2)}
              </td>
              <td className="p-2 border border-gray-700 text-yellow-400">
                {(stock.reference / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askPrice1,
                  stock.reference
                )}`}
              >
                {(stock.orderBook.askPrice1 > 0
                  ? stock.orderBook.askPrice1 / 1000
                  : 0
                ).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askVolume1,
                  stock.reference
                )}`}
              >
                {stock.orderBook.askVolume1}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askPrice2,
                  stock.reference
                )}`}
              >
                {stock.orderBook.askPrice2}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askVolume2,
                  stock.reference
                )}`}
              >
                {stock.orderBook.askVolume2}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askPrice3,
                  stock.reference
                )}`}
              >
                {stock.orderBook.askPrice3}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askVolume3,
                  stock.reference
                )}`}
              >
                {stock.orderBook.askVolume3}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.price,
                  stock.reference
                )}`}
              >
                {(stock.match.price / 1000).toFixed(0)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.volume,
                  stock.reference
                )}`}
              >
                {stock.match.volume.toFixed(0)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.change,
                  stock.reference
                )}`}
              >
                {stock.match.change.toFixed(0)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.percentChange,
                  stock.reference
                )}`}
              >
                {stock.match.percentChange}%
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidPrice1,
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bidPrice1 / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidVolume1,
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidVolume1}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidPrice2,
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bidPrice2 / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidVolume2,
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidVolume2}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidPrice3,
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bidPrice3 / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidVolume3,
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidVolume3}
              </td>
              <td className="p-2 border border-gray-700 text-white">
                {stock.vol}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.high,
                  stock.reference
                )}`}
              >
                {(stock.high / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.low,
                  stock.reference
                )}`}
              >
                {(stock.low / 1000).toFixed(2)}
              </td>
              <td className="p-2 border border-gray-700">
                {stock.forgein.buyVolume}
              </td>
              <td className="p-2 border border-gray-700">
                {stock.forgein.sellVolume}
              </td>
              <td className="p-2 border border-gray-700">
                {stock.forgein.totalValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iboard;
