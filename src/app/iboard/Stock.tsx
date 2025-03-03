class Stock {
  name: string;
  ceiling: number;
  floor: number;
  reference: number;
  match: Match;
  orderBook: OrderBook;
  volume: number;
  high: number;
  low: number;
  updateTime: string;
  isEnabled: number;
  exchange: string;

  constructor(
    name: string,
    ceiling: number,
    floor: number,
    reference: number,
    match: Match,
    orderBook: OrderBook,
    volume: number,
    high: number,
    low: number,
    updateTime: string,
    isEnabled: number,
    exchange: string
  ) {
    this.name = name;
    this.ceiling = ceiling;
    this.floor = floor;
    this.reference = reference;
    this.match = match;
    this.orderBook = orderBook;
    this.volume = volume;
    this.high = high;
    this.low = low;
    this.updateTime = updateTime;
    this.isEnabled = isEnabled;
    //console.log("orderBook", orderBook);
    this.exchange = exchange;
  }
  getBid(index: number):  string {
    if (
      this.orderBook &&
      this.orderBook.bids &&
      index < this.orderBook.bids.length
    ) {
      const bid = this.orderBook.bids[index];

      // Get current UTC time in hours and minutes
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();

      // Convert time to comparable integer values (e.g., 2:00 -> 200, 9:15 -> 915)
      const currentTime = utcHours * 100 + utcMinutes;

      // Define time ranges
      const startSilentTime = 200; // 02:00 UTC
      const endSilentTime = 915; // 09:15 UTC
      const atcTimeStart = 730; // 07:30 UTC
      const atcTimeEnd = 745;

      if (bid === 0) {
        if (currentTime >= startSilentTime && currentTime <= endSilentTime) {
          return "";
        }
        if (currentTime >= atcTimeStart && currentTime <= atcTimeEnd) {
          return "ATC";
        }
      }

      return (bid / 1000).toFixed(2);
    }

    return "0"; // Return 0 if orderBook is undefined or index is out of bounds
  }
}

class Match {
  price: number;
  volume: number;
  change: number;
  percentChange: string;
  percent: number;
  ratioChange: number;

  constructor(
    price: number,
    volume: number,
    reference: number,
    ratioChange: number,
    change:number) {
    this.price = price;
    this.volume = volume;
    this.change = price - reference;
    this.percentChange = ((this.change / reference) * 100).toFixed(2);
    this.percent = (this.change / reference) * 100;
    this.ratioChange = ratioChange;
    this.change = change;
  }
}

class OrderBook {
  asks: number[];
  askSizes: number[];
  bids: number[];
  bidSizes: number[];

  constructor(
    asks: number[],
    askSizes: number[],
    bids: number[],
    bidSizes: number[]
  ) {
    this.asks = asks;
    this.askSizes = askSizes;
    this.bids = bids;
    this.bidSizes = bidSizes;
  }
}

function parseStock(data: StockData): Stock {
  return new Stock(
    data.stock_name,
    data.ceiling,
    data.floor,
    data.prev_day_c,
    new Match(data.price, data.day_v, data.prev_day_c,0,0),
    new OrderBook(
      JSON.parse(data.asks),
      JSON.parse(data.ask_sizes),
      JSON.parse(data.bids),
      JSON.parse(data.bid_sizes)
    ),
    data.day_v,
    data.day_h,
    data.day_l,
    data.update_time,
    data.is_enabled,
    data.exchange
  );
}


interface StockData {
  stock_name: string;
  ceiling: number;
  floor: number;
  prev_day_c: number;
  price: number;
  day_v: number;
  day_h: number;
  day_l: number;
  update_time: string;
  is_enabled: number;
  asks: string; // Dữ liệu JSON dạng string
  ask_sizes: string;
  bids: string;
  bid_sizes: string;
  exchange:string;
}

// Export classes
export { Stock, Match, OrderBook, parseStock };
