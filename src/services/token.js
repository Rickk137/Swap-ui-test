import axios from "axios";

const API_KEY = "0d81c0c766b0d8baf06cbfe707a22f21e2cbfaca";

export function getTokensInfo() {
  return axios.get(
    `https://api.nomics.com/v1/currencies/ticker?key=${API_KEY}&ids=BTC,ETH,USDT&interval=1d&per-page=100&page=1`
  );
}
