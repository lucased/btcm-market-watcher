import React from "react";
import styled from "styled-components";

import Market from "./Market/Market.js";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  grid-gap: 20px;
`;

const MarketContainer = ({ markets }) => {
  return (
    <Grid>
      {markets.map(market => (
        <Market key={market.id} market={market} />
      ))}
    </Grid>
  );
};

export default MarketContainer;
