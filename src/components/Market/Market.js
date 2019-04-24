import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import { instrumentToName } from "../../helpers/utils";
import CryptoIcon from "../icons/CryptoIcon";
import LastPrice from "./LastPriceAnimated";
import StatPriceAnimated from "./StatPriceAnimated";
import Graph from './Graph'

const MarketWrapper = styled.div`
  width: 100%;
  height: 220px;
  border-radius: 4px;
  box-shadow: 2px 2px 10px rgba(28, 28, 28, 0.2);
  background-image: ${props => calculateChangeColor(props.change)};
`;

const calculateChangeColor = change => {
  if (change > 10) {
    return "linear-gradient(to bottom, #393843, #324025)";
  }

  if (change < -20) {
    return "linear-gradient(to bottom, #393843, #4e1c20)";
  }

  return "linear-gradient(to bottom, #474650, #393843)";
};

const Market = styled.div`
  padding: 15px;
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  justify-content: ${props => props.justify || "flex-start"};
  align-items: ${props => props.align || "flex-end"};
  width: 100%;
`;

const MainTitle = styled.h2`
  color: ${props => props.theme.lightGrey};
  font-size: 22px;
  font-weight: 300;
  display: inline-block;
  margin: 0;
`;

const PairTitle = styled.p`
  color: ${props => props.theme.darkGrey};
  display: inline-block;
  margin-left: 10px;
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 0 5px;
`;

const LastPricePercent = styled.p`
  font-size: 24px;
  font-weight: 500;
  color: ${props => props.theme.lightGrey};
  margin: 0 0 3px 15px;
  display: inline-block;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width + "%"};
`;

const StatTitle = styled.p`
  font-size: 12px;
  color: ${props => props.theme.darkGrey};
`;

const StatPrice = styled.p`
  font-size: 20px;
  color: ${props => (props.green ? props.theme.green : props.theme.lightGrey)};
`;

const ColorText = styled.span`
  color: ${props => (Math.sign(props.price) === -1 ? props.theme.red : props.theme.green)};
  font-size: ${props => (props.size ? props.size + "px" : "18px")};
  padding: ${props => props.padding};
`;

export default props => {
  const { bestBid, bestAsk, lastPrice, currency, instrument, volume24h, price24hour, price7day, price30day } = props.market;
  const { socket } = useContext(AppContext);
  const toFixed = (num, decimal) => parseFloat(num).toFixed(decimal);
  const toLocal = num => parseInt(toFixed(num, 2)).toLocaleString("en-US", { style: "currency", currency: "AUD" });
  const spread = (100 * (bestAsk - bestBid)) / bestAsk;

  const dailyChange = lastPrice - price24hour;
  const percentDailyChange = ((lastPrice - price24hour) / lastPrice) * 100;

  const weeklyChange = lastPrice - price7day;
  const percentWeeklyChange = ((lastPrice - price7day) / lastPrice) * 100;

  const monthlyChange = lastPrice - price30day;
  const percentMonthlyChange = ((lastPrice - price30day) / lastPrice) * 100;

  const toBigDecimal = (num, currency, instrument) => {
    if (currency === "BTC") {
      return toFixed(num, 8);
    }
    if (instrument === "POWR" || instrument === "XRP") {
      return toFixed(num, 4);
    }
    return toFixed(num, 2);
  };

  useEffect(() => {
    var channelName = "Ticker-BTCMarkets-" + instrument + "-" + currency;
    socket.emit("join", channelName);
  }, []);

  return (
    <MarketWrapper change={percentWeeklyChange}>
      <Market>
        <Row>
          <CryptoIcon name={instrument} />
          <MainTitle>{instrumentToName[instrument]}</MainTitle>
          <PairTitle>{`${instrument}/${currency}`}</PairTitle>
        </Row>
        <Row>
          <LastPrice price={toBigDecimal(lastPrice, null, instrument)} />
          <LastPricePercent>
            <ColorText price={toFixed(percentDailyChange, 2)}>{toFixed(percentDailyChange, 2)}%</ColorText>
          </LastPricePercent>
          {/* <Graph /> */}
        </Row>
        <Row justify="space-between">
          <StatContainer width={20}>
            <StatTitle>Best Bid</StatTitle>
            <StatPriceAnimated price={toBigDecimal(bestBid, null, instrument)} />
          </StatContainer>
          <StatContainer width={20}>
            <StatTitle>Best Ask</StatTitle>
            <StatPriceAnimated price={toBigDecimal(bestAsk, null, instrument)} />
          </StatContainer>
          <StatContainer width={20}>
            <StatTitle>Spread</StatTitle>
            <StatPrice>{toFixed(spread, 2)}%</StatPrice>
          </StatContainer>
          <StatContainer width={30}>
            <StatTitle>24h Volume</StatTitle>
            <StatPrice>{toLocal(volume24h * lastPrice)}</StatPrice>
          </StatContainer>
        </Row>
        <Row justify="space-between">
          <StatContainer width={33}>
            <StatTitle>Daily Change</StatTitle>
            <StatPrice>
              <ColorText price={toFixed(dailyChange, 4)}>${toBigDecimal(dailyChange, null, instrument)}</ColorText>
              <ColorText size={12} padding="10px" price={toFixed(percentDailyChange, 2)}>
                {toFixed(percentDailyChange, 2)}%
              </ColorText>
            </StatPrice>
          </StatContainer>
          <StatContainer width={33}>
            <StatTitle>7 Day Change</StatTitle>
            <StatPrice>
              <ColorText price={toFixed(weeklyChange, 4)}>${toBigDecimal(weeklyChange, null, instrument)}</ColorText>
              <ColorText size={12} padding="10px" price={toFixed(percentWeeklyChange, 2)}>
                {toFixed(percentWeeklyChange, 2)}%
              </ColorText>
            </StatPrice>
          </StatContainer>
          <StatContainer width={33}>
            <StatTitle>30 Day Change</StatTitle>
            <StatPrice>
              <ColorText price={toFixed(monthlyChange, 4)}>${toBigDecimal(monthlyChange, null, instrument)}</ColorText>
              <ColorText size={12} padding="10px" price={toFixed(percentMonthlyChange, 2)}>
                {toFixed(percentMonthlyChange, 2)}%
              </ColorText>
            </StatPrice>
          </StatContainer>
        </Row>
      </Market>
    </MarketWrapper>
  );
};
