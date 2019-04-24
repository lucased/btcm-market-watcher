const axios = require("axios");
const { parse } = require("url");
const API = "https://api.btcmarkets.net";

const data = [
  {
    bestBid: 5620.15,
    bestAsk: 5629.99,
    lastPrice: 5617.35,
    currency: "AUD",
    instrument: "BTC",
    timestamp: 1547024110,
    volume24h: 153.44296,
    price24hour: 5593.59,
    price7day: 5432.88,
    price30day: 4646.91
  },
  {
    bestBid: 54.85,
    bestAsk: 55.1,
    lastPrice: 55.09,
    currency: "AUD",
    instrument: "LTC",
    timestamp: 1547024162,
    volume24h: 1087.2585,
    price24hour: 54.9,
    price7day: 45.37,
    price30day: 32.25
  },
  {
    bestBid: 211,
    bestAsk: 211.69,
    lastPrice: 211.81,
    currency: "AUD",
    instrument: "ETH",
    timestamp: 1547024163,
    volume24h: 840.45338,
    price24hour: 209.02,
    price7day: 210,
    price30day: 121.26
  },
  {
    bestBid: 6.86,
    bestAsk: 7.03,
    lastPrice: 6.98,
    currency: "AUD",
    instrument: "ETC",
    timestamp: 1547024161,
    volume24h: 1591.2664,
    price24hour: 6.83,
    price7day: 7.26,
    price30day: 5.08
  },
  {
    bestBid: 0.5124,
    bestAsk: 0.5134,
    lastPrice: 0.5133,
    currency: "AUD",
    instrument: "XRP",
    timestamp: 1547024106,
    volume24h: 274232.19,
    price24hour: 0.5112,
    price7day: 0.5084,
    price30day: 0.414
  },
  {
    bestBid: 0.1134,
    bestAsk: 0.1177,
    lastPrice: 0.113,
    currency: "AUD",
    instrument: "POWR",
    timestamp: 1547023330,
    volume24h: 73998.548,
    price24hour: 0.115,
    price7day: 0.1171,
    price30day: 0.092
  },
  {
    bestBid: 2.0624,
    bestAsk: 2.1286,
    lastPrice: 2.1285,
    currency: "AUD",
    instrument: "OMG",
    timestamp: 1547024118,
    volume24h: 814.23391,
    price24hour: 2.0655,
    price7day: 2.1101,
    price30day: 1.7861
  },
  {
    bestBid: 220.01,
    bestAsk: 229.02,
    lastPrice: 229.89,
    currency: "AUD",
    instrument: "BCHABC",
    timestamp: 1547024073,
    volume24h: 14.881494,
    price24hour: 222.85,
    price7day: 249,
    price30day: 138
  },
  {
    bestBid: 126.99,
    bestAsk: 133.94,
    lastPrice: 126.99,
    currency: "AUD",
    instrument: "BCHSV",
    timestamp: 1547024153,
    volume24h: 42.208164,
    price24hour: 123.25,
    price7day: 132.51,
    price30day: 151.1
  }
];

module.exports = async (req, res) => {
  switch (req.url) {
    case "/api/markets":
      try {
        if (process.env.NODE_ENV === "development") {
          return send(res, data);
        }

        const activeMarkets = await axios(`${API}/v2/market/active`);
        const markets = activeMarkets.data.markets.filter(market => market.currency === "AUD");
        const results = await Promise.all(
          markets.map(async ({ instrument, currency }) => {
            return getMarket(instrument, currency);
          })
        );
        send(res, results);
      } catch (error) {
        console.log(error);
      }

      break;
    default:
      res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" });
      res.end(req.url);
      break;
  }
};

const send = (res, data) => {
  res.writeHead(200, { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const getMarket = async (instrument, currency) => {
  try {
    const tick = await axios(`${API}/market/${instrument}/${currency}/tick`);
    const historicTickDay = await axios(`${API}/v2/market/${instrument}/${currency}/tickByTime/day?since=${new Date().getTime()}&limit=30`);

    const { ticks } = historicTickDay.data;

    const price24hour = isElement(ticks, 1) ? ticks[1].close / 100000000 : 0;
    const price7day = isElement(ticks, 6) ? ticks[6].close / 100000000 : 0;
    const price30day = isElement(ticks, 0) ? ticks[ticks.length - 1].close / 100000000 : 0;
    return { ...tick.data, price24hour, price7day, price30day };
  } catch (error) {
    console.log(error);
  }
};

// HELPERS
const isElement = (element, index) => {
  if(typeof element === "undefined") {
    return false
  }
  if(!element.length ) {
    return false
  }
  if(typeof element[index] === "undefined") {
    return false
  }
  return true;
};
