"use client";
import React, { useState, useEffect } from "react";
import { Stock, Match, OrderBook } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";
import IboardService from "./IboardService";
import { AxiosError } from "axios";

function Iboard() {
  // State to hold stocks
  const [stocksDict, setStocksDict] = useState<{ [key: string]: Stock }>({});
  const [stocks, setStocks] = useState<Stock[]>([]);

  const arrayToDictionary = (
    stocksArray: Stock[]
  ): { [key: string]: Stock } => {
    return stocksArray.reduce((acc, stock) => {
      acc[stock.name] = stock;
      return acc;
    }, {} as { [key: string]: Stock });
  };

  const stockNames = ["ABC", "VCB", "ACB"];
  const stockIndex: { [key: string]: number } = {};
  let isInitDone = false;

  const initStocks = () => {
    const tempStocks: Stock[] = stockNames.map(
      (stockName, index) =>
        new Stock(
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
        )
    );
   // console.log("tempStocks", tempStocks);
    setStocks(tempStocks);
    //console.log(" after tempStocks", stocks, tempStocks);
    isInitDone = true;
  };

  useEffect(() => {
    // Initialize stocks and set up WebSocket connection
    initStocks();
    const wsClient = new WebSocketClient(
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "ws://localhost:3021"
    );
    console.log(
      "process.env.NEXT_PUBLIC_SOCKET_SERVER_URL",
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
    );

    wsClient.socket.onmessage = (event: MessageEvent) => {
      if (!isInitDone) {
        return;
      }
      const updatedStockData = JSON.parse(event.data);
      console.log("onmessage", updatedStockData);
      const updatedStock = new Stock(
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

      setStocks((prevStocks) => {
        const index = stockIndex[updatedStock.name];
        if (index >= 0) {
          const updatedStocks = [...prevStocks];
          updatedStocks[index] = updatedStock;
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
                {(stock.floor / 1000).toFixed(2)}
              </td>
              <td className="p-2 border border-gray-700 text-yellow-400">
                {(stock.reference / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bids[2],
                  stock.reference
                )}`}
              >
                {stock ? stock.getBid(2) : ""}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[2],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[2].toLocaleString("en-US")}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bids[1],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bids[1] > 0
                  ? stock.orderBook.bids[1] / 1000
                  : 0
                ).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[1],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[1].toLocaleString("en-US")}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bids[0],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bids[0] > 0
                  ? stock.orderBook.bids[0] / 1000
                  : 0
                ).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[0],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[0].toLocaleString("en-US")}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.price,
                  stock.reference
                )}`}
              >
                {(stock.match.price / 1000).toFixed(2)}
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
                {(stock.match.change / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.match.ratioChange,
                  stock.reference
                )}`}
              >
                {stock.match.ratioChange}%
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.asks[0],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.asks[0] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askSizes[0],
                  stock.reference
                )}`}
              >
                {stock.orderBook.askSizes[0]}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.asks[1],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.asks[1] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askSizes[1],
                  stock.reference
                )}`}
              >
                {stock.orderBook.askSizes[1]}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.asks[2],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.asks[2] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askSizes[2],
                  stock.reference
                )}`}
              >
                {stock.orderBook.askSizes[2]}
              </td>
              <td className="p-2 border border-gray-700 text-white">
                {stock.volume}
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
                {/* Placeholder for NN mua */}
              </td>
              <td className="p-2 border border-gray-700">
                {/* Placeholder for NN bán */}
              </td>
              <td className="p-2 border border-gray-700">
                {/* Placeholder for Room */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iboard;
