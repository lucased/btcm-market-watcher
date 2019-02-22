import React, { PureComponent as Component } from "react";
import styled, { withTheme } from "styled-components";
import { animated } from "react-spring";
import Updater from "./Updater";

const StatPrice = styled(animated.div)`
  font-size: 20px;
`;

class StatPriceAnimated extends Component {
  state = {
    price: this.props.price,
    color: 'green',
    direction: "up"
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.price > prevProps.price) {
      this.setState({ color: "green" });
    } else {
      this.setState({ color: "red" });
    }
  }
  render() {
    return (
      <Updater reset native config={{ duration: 200 }} theme={this.props.theme} state="update">
        {({ color }) => <StatPrice style={{ color }}>{this.props.price}</StatPrice>}
      </Updater>
    );
  }
}

export default withTheme(StatPriceAnimated);
