import React, { useState } from "react";
import { useKeyframes, animated } from "react-spring/hooks";
import styled from "styled-components";

const useUpdater = useKeyframes.spring({
  immediate: true,
  update: async (next, cancel, ownProps) => {
    await next({ reset: true, from: { color: "green" }, to: { color: "white" } });
  }
});

const StatPrice = styled(animated.div)`
  font-size: 20px;
`;

const StatPriceAnimated = ({ price }) => {
  const [state, set] = useState('update')
  const props = useUpdater(state);
  return (
    <StatPrice style={props}>
      {price}
    </StatPrice>
  );
};

export default StatPriceAnimated;
