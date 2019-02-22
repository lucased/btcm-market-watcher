import React, { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

const Market = ({data}) => {
  const { socket } = useContext(AppContext);
  const {lastPrice, bestAsk, bestBid, volume24h, instrument, currency } = data;
  const spread = 100 * (bestAsk - bestBid) / bestAsk

  const toFixed = (num, decimal) => (
    parseFloat(num).toFixed(decimal)
  )

  const toBigDecimal = (num, currency) => (
    currency === "BTC" ? toFixed(num, 8) : toFixed(num, 4) 
  )

  useEffect(() => {
    var channelName = "Ticker-BTCMarkets-" + instrument + "-" + currency;
    socket.emit("join", channelName);
  },[]);

  return (
    <div>
      <h2>
        {instrument} / {currency}
      </h2>
      <div className="data-container">
         <div> <span>Price</span><p>{toBigDecimal(lastPrice, currency)}</p></div>
          <div><span>Ask</span><p>{toBigDecimal(bestAsk, currency)}</p></div>
          <div><span>Bid</span><p>{toBigDecimal(bestBid, currency)}</p></div>
          <div><span>Volume</span><p>{toFixed(volume24h, 4)}</p></div>
          <div><span>Spread</span><p>{toFixed(spread, 2)}%</p></div>

      </div>
    </div>
  );
};

export default Market;
