"use client";
import React, { useState, useEffect } from "react";
import { Stock } from "./Stock";
import { WebSocketClient } from "@/lib/WebSocketClient";

interface IboardProps {
  initialStocks: Stock[];
}

function Iboard({ initialStocks }: IboardProps) {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  console.log("stocks", stocks);
  useEffect(() => {
    const wsClient = new WebSocketClient(
      process.env.NEXT_PUBLIC_API_URL || "ws://localhost:3020",
    );

    wsClient.socket.onmessage = (event: MessageEvent) => {
      const updatedStock = JSON.parse(event.data) as Stock;
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.name === updatedStock.name ? updatedStock : stock,
        ),
      );
    };

    return () => {
      wsClient.closeConnection();
    };
  }, []);

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden rounded-lg bg-gray-800 text-sm text-black">
        {/* Table content */}
      </table>
    </div>
  );
}

export default Iboard;
