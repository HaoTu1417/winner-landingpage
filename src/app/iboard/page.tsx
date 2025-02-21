"use client";
import React, { useState, useEffect } from "react";
import { Stock } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";
import IboardService from "./IboardService";
import { AxiosError } from "axios";

function Iboard() {
  // State to hold stocks
  const [stocks, setStocks] = useState<Stock[]>([]); // Initialize with empty array


  const iboardService = new IboardService(
    process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "ws://localhost:3021"
  );

  useEffect(() => {
    // Fetch initial data on the client side when the component mounts
    async function fetchData() {
      try {
        const initialStocks = await iboardService.getStocks();
        //console.log("initialStocks", initialStocks.data);

        const stockInstances = initialStocks.data.map(
          (obj) =>{

           
            const stock = 
             new Stock(
              obj.name,
              obj.ceiling,
              obj.floor,
              obj.reference,
              obj.match,
              obj.orderBook,
              obj.volume,
              obj.high,
              obj.low,
              obj.updateTime,
              obj.isEnabled
            );
             //console.log("obj", obj, stock);
            return stock;
          }
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
    const wsClient = new WebSocketClient(
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "ws://localhost:3021"
    );
    console.log(
      "process.env.NEXT_PUBLIC_SOCKET_SERVER_URL",
      process.env.NEXT_PUBLIC_SOCKET_SERVER_URL
    );

    // Listen for messages from WebSocket
    // wsClient.socket.onmessage = (event: MessageEvent) => {
    //   const updatedStock = JSON.parse(event.data) as Stock;
    //   // Update stock data in the table based on stock.name
    //   console.log("updatedStock", updatedStock);
    //   setStocks((prevStocks) =>
    //     prevStocks.map((stock) =>
    //       stock.name === updatedStock.name ? updatedStock : stock
    //     )
    //   );
    // };

    wsClient.socket.onmessage = (event: MessageEvent) => {
      const updatedStock = JSON.parse(event.data) as Stock;

      // Log dữ liệu trước khi thực hiện cập nhật
      //console.log("updatedStock received:", JSON.parse(event.data));
      
      setStocks((prevStocks) => {
        return prevStocks.map((stock) => {
          // Log từng phần tử trước khi so sánh
          //console.log("Comparing:", stock, "with", updatedStock);

          return stock.name === updatedStock.name ? updatedStock : stock;
        });
      });
    };


    // Cleanup on component unmount
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
                {(stock.floor / 1000).toFixed(2)}
              </td>
              <td className="p-2 border border-gray-700 text-yellow-400">
                {(stock.reference / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.asks[0],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.asks[0] > 0
                  ? stock.orderBook.asks[0] / 1000
                  : 0
                ).toFixed(2)}
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
                {stock.orderBook.asks[1]}
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
                {stock.orderBook.asks[2]}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.askSizes[2],
                  stock.reference
                )}`}
              >
                {stock.orderBook.askSizes[2]}
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
                  stock.match.percent,
                  stock.reference
                )}`}
              >
                {stock.match.percentChange}%
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bids[0],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bids[0] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[0],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[0]}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bids[1],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bids[1] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[1],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[1]}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[2],
                  stock.reference
                )}`}
              >
                {(stock.orderBook.bidSizes[2] / 1000).toFixed(2)}
              </td>
              <td
                className={`p-2 border border-gray-700 ${getTextColorClass(
                  stock.orderBook.bidSizes[2],
                  stock.reference
                )}`}
              >
                {stock.orderBook.bidSizes[2]}
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
                {/* {stock.forgein.buyVolume} */}
              </td>
              <td className="p-2 border border-gray-700">
                {/* {stock.forgein.sellVolume} */}
              </td>
              <td className="p-2 border border-gray-700">
                {/* {stock.forgein.totalValue} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Iboard;
