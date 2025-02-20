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
    isEnabled: number
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
  }
}

class Match {
  price: number;
  volume: number;
  change: number;
  percentChange: string;
  percent: number;

  constructor(price: number, volume: number, reference: number) {
    this.price = price;
    this.volume = volume;
    this.change = price - reference;
    this.percentChange = ((this.change / reference) * 100).toFixed(2);
    this.percent = (this.change / reference) * 100;
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

function parseStock(data: any): Stock {
  return new Stock(
    data.stock_name,
    data.ceiling,
    data.floor,
    data.prev_day_c,
    new Match(data.price, data.day_v, data.prev_day_c),
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
    data.is_enabled
  );
}

// Export classes
export { Stock, Match, OrderBook, parseStock };
