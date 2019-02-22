import React, { PureComponent as Component } from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import Updater from "./Updater";

const LastPrice = styled(animated.div)`
  font-size: 40px;
  font-weight: 500;
  display: inline-block;
`;

class LastPriceContainer extends Component {
  state = {
    price: this.props.price,
    direction: "up"
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.price > prevProps.price) {
      this.setState({ direction: "up" });
    } else {
      this.setState({ direction: "down" });
    }
  }
  render() {
    return (
      <Updater reset native config={{ duration: 200 }} theme={this.props.theme} state="update">
        {({ color }) => <LastPrice style={{ color }}>${this.props.price}</LastPrice>}
      </Updater>
    );
  }
}

export default withTheme(LastPriceContainer);
