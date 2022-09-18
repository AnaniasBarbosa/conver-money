const cotacao = require("./api_cotacao");
const axios = require("axios");

jest.mock(axios);

test("getCotacaoApi", () => {
  const res = {
    data: {
      USDBRL: {
        code: "USD",
        codein: "BRL",
        name: "Dólar Americano/Real Brasileiro",
        high: "5.734",
        low: "5.7279",
        varBid: "-0.0054",
        pctChange: "-0.09",
        bid: "5.7276",
        ask: "5.7282",
        timestamp: "1618315045",
        create_date: "2021-04-13 08:57:27",
      },
    },
  };
});