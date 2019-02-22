import React, { useEffect, useReducer } from "react";
import uuid from "uuid/v4";
import io from "socket.io-client";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import _ from 'lodash'

import { AppContext } from "./components/AppContext";
import fetchMarkets from "./helpers/fetchMarkets";
import Header from "./components/Header";
import MarketContainer from "./components/MarketContainer";

const socket = io("https://socket.btcmarkets.net", { secure: true, transports: ["websocket"], upgrade: false });

const initialState = {
  loading: true,
  markets: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      const market = { ...action.payload, id: uuid() };
      return { ...state, markets: state.markets.concat(market) };
    case "update":
      return {
        ...state,
        markets: state.markets.map(market =>
          market.currency === action.payload.currency && market.instrument === action.payload.instrument
            ? { ...market, ...action.payload }
            : market
        )
      };
    case "loading":
      return { ...state, loading: true };
    case "loaded":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900");
    body {
        font-family: 'Roboto', sans-serif;
        background-color: #2A2735;
    }
    p {
        margin: 0;
    }
`;

const darkTheme = {
  lightGrey: "#E1E1E1",
  midGrey: "#DADADA",
  darkGrey: "#848383",
  green: "#B8E986",
  red: "#FF6C6C",
  blue: "#4A90E2"
};

const Container = styled.div`
  width: 1400px;
  height: 100vh;
  margin: auto;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 40px;
`;

const getMarketsByVolume = markets => _.sortBy(markets, market => (market.volume24h * market.lastPrice)).reverse();

function App() {
  const [{ loading, markets }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const eventName = "newTicker";
    const divider = 100000000;

    socket.on(eventName, function(data) {
      const payload = {
        ...data,
        bestAsk: data.bestAsk / divider,
        bestBid: data.bestBid / divider,
        lastPrice: data.lastPrice / divider,
        volume24h: data.volume24h / divider
      };

      dispatch({ type: "update", payload });
    });
  }, []);

  useEffect(() => {
    fetchMarkets(dispatch);
  }, []);
  return (
    <AppContext.Provider value={{ socket }}>
      <ThemeProvider theme={darkTheme}>
        <>
          <Container>
            {loading ? (
              <Loading>Loading ...</Loading>
            ) : (
              <>
                <Header />
                <MarketContainer markets={getMarketsByVolume(markets)} />
              </>
            )}
          </Container>
          <GlobalStyle />
        </>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
