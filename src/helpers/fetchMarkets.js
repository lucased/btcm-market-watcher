import fetch from "./fetch";

const fetchMarkets = async dispatch => {
  dispatch({ type: "loading" });

  const { data } = await fetch("/api/markets");

  data.forEach(result => {
    dispatch({ type: "add", payload: result });
  });

  dispatch({ type: "loaded" });
};

export default fetchMarkets;
