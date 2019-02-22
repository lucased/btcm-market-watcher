import React from "react";
import styled from "styled-components";
import useTimer from "./useTimer";

export default () => {
  const time = useTimer();

  return (
    <Header>
      <Title>Markets</Title>
      <Time>{time}</Time>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  text-transform: uppercase;
  margin: 50px 0;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 400;
  color: ${props => props.theme.lightGrey};
  margin: 0;
`;

const Time = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: ${props => props.theme.lightGrey};
  margin: 0;
`;
