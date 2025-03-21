import HttpCore from "@/lib/HttpCore";
import { AxiosResponse } from "axios";
import { Stock } from "./Stock";

// // Define types for iBoard data (optional)
// interface StockData {
//   id: string;
//   name: string;
//   price: number;
//   volume: number;
// }

class IboardService extends HttpCore {
  constructor(baseUrl: string) {
    super(baseUrl); // Base URL for iBoard API
  }

  // Method to get a list of stocks
  public async getStocks(): Promise<AxiosResponse<Stock[]>> {
    return this.get<Stock[]>("/stocks");
  }

  // Method to get stock details by ID
  public async getStockById(stockId: string): Promise<AxiosResponse<Stock>> {
    return this.get<Stock>(`/stocks/${stockId}`);
  }

  // Method to add a new stock (example)
  public async addStock(stock: Stock): Promise<AxiosResponse<Stock>> {
    return this.post<Stock>("/stocks", stock);
  }
}

export default IboardService;
