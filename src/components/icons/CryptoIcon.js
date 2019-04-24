import React from "react";
import BTC from "./BTC";
import LTC from "./LTC";
import ETH from "./ETH";
import ETC from "./ETC";
import XRP from "./XRP";
import POWR from "./POWR";
import OMG from "./BAT";
import BCH from "./BCHABC";
import BAT from "./OMG";
import GNT from "./GNT";

export default ({ name }) => {
  switch (name) {
    case "BTC":
      return <BTC />;
    case "LTC":
      return <LTC />;
    case "ETH":
      return <ETH />;
    case "ETC":
      return <ETC />;
    case "XRP":
      return <XRP />;
    case "POWR":
      return <POWR />;
    case "OMG":
      return <OMG />;
    case "BCHABC":
      return <BCH />;
    case "BCHSV":
      return <BCH />;
    case "BAT":
      return <BAT />;
    case "GNT":
      return <GNT />;
    default:
      return <BTC />;
  }
};
