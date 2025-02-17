class Stock {
    name: string;
    ceiling: number;
    roof: number;
    reference: number;
    match: Match;
    orderBook: OrderBook;
    forgein: Forgein;
    vol: number;
    high: number;
    low: number;
  
    constructor(
      name: string,
      ceiling: number,
      roof: number,
      reference: number,
      match: Match,
      orderBook: OrderBook,
      vol: number,
      high: number,
      low: number,
      forgein: Forgein = new Forgein(0, 0, 0)
    ) {
      this.name = name;
      this.ceiling = ceiling;
      this.roof = roof;
      this.reference = reference;
      this.match = match;
      this.orderBook = orderBook;
      this.forgein = forgein;
      this.vol = vol;
      this.high = high;
      this.low = low;
    }
    
  }
  
  class Match {
    price: number;
    volume: number;
    change: number;
    percentChange: number;
  
    constructor(price: number, vol: number, change: number, changeInPercent: number) {
      this.price = price;
      this.volume = vol;
      this.change = change;
      this.percentChange = changeInPercent;
    }
  }
  
  class OrderBook {
    askPrice1: number;
    askVolume1: number;
    askPrice2: number;
    askVolume2: number;
    askPrice3: number;
    askVolume3: number;
    bidPrice1: number;
    bidVolume1: number;
    bidPrice2: number;
    bidVolume2: number;
    bidPrice3: number;
    bidVolume3: number;
  
    constructor(
      ask1Price: number,
      ask1Vol: number,
      ask2Price: number,
      ask2Vol: number,
      ask3Price: number,
      ask3Vol: number,
      bid1Price: number,
      bid1Vol: number,
      bid2Price: number,
      bid2Vol: number,
      bid3Price: number,
      bid3Vol: number
    ) {
      this.askPrice1 = ask1Price;
      this.askVolume1 = ask1Vol;
      this.askPrice2 = ask2Price;
      this.askVolume2 = ask2Vol;
      this.askPrice3 = ask3Price;
      this.askVolume3 = ask3Vol;
      this.bidPrice1 = bid1Price;
      this.bidVolume1 = bid1Vol;
      this.bidPrice2 = bid2Price;
      this.bidVolume2 = bid2Vol;
      this.bidPrice3 = bid3Price;
      this.bidVolume3 = bid3Vol;
    }
  }
  
  class Forgein {
    buyVolume: number;
    sellVolume: number;
    totalValue: number;
  
    constructor(buy: number, sell: number, room: number) {
      this.buyVolume = buy;
      this.sellVolume = sell;
      this.totalValue = room;
    }
  }
  
  function GetDefaultData(): Stock[] {
    const stocks: Stock[] = [
      new Stock(
        'ACB',
        27.0,
        25.5,
        26.75,
        new Match(25, 231300, 0.0, 0.0),
        new OrderBook(24.85, 233300, 24.9, 478000, 24.95, 220800, 25.0, 338100, 25.05, 219100, 25.1, 158200),
        408100,
        25.0,
        24.8,
        new Forgein(434000, 434000, 239548456)
      ),
      new Stock(
        'BID',
        43.2,
        42.0,
        42.5,
        new Match(25, 231300, 0.0, 0.0),
        new OrderBook(24.85, 233300, 24.9, 478000, 24.95, 220800, 25.0, 338100, 25.05, 219100, 25.1, 158200),
        408100,
        25.0,
        24.8
      ),
      new Stock(
        'FPT',
        160.0,
        159.0,
        159.5,
        new Match(25, 231300, 0.0, 0.0),
        new OrderBook(24.85, 233300, 24.9, 478000, 24.95, 220800, 25.0, 338100, 25.05, 219100, 25.1, 158200),
        408100,
        25.0,
        24.8
      ),
    ];
  
    return stocks;
  }
  
  // Single export block
  export { Stock, Match, OrderBook, Forgein, GetDefaultData };
  