const cotacao = require("./api_cotacao");
const axios = require("axios");

jest.mock("axios");

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
  axios.get.mockResolvedValue(res);
  cotacao.getCotacaoApi("url").then((resp) => {
    expect(resp).toEqual(res);
    expect(axios.get.mock.calls[0][0]).toEqual("url");
  });
});

test("extractCotacao", () => {
  const res = cotacao.extractPrice({
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
  });

  expect(res).toBe("5.7276");
});

test("getUrl", () => {
  const url = cotacao.getUrl("USD-BRL");

  expect(url).toBe("https://economia.awesomeapi.com.br/json/last/USD-BRL");
});

test("getCotacao", () => {
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

  const getCoin = jest.fn();
  getCoin.mockReturnValue("USD-BRL");

  const getUrl = jest.fn();
  getUrl.mockReturnValue("URL");

  const getCotacaoApi = jest.fn();
  getCotacaoApi.mockResolvedValue(res);

  const extractPrice = jest.fn();
  extractPrice.mockReturnValue("5.7276");

  cotacao.pure
    .getCotacao({ getCoin, getUrl, getCotacaoApi, extractPrice })()
    .then((r) => {
      expect(r).toEqual("5.7276");
    });
});

test("getCotacao null", () => {
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

  const getCoin = jest.fn();
  getCoin.mockReturnValue("USD-BRL");

  const getUrl = jest.fn();
  getUrl.mockReturnValue("URL");

  const getCotacaoApi = jest.fn();
  getCotacaoApi.mockRejectedValue("error");

  const extractPrice = jest.fn();
  extractPrice.mockReturnValue("5.7276");

  cotacao.pure
    .getCotacao({ getCoin, getUrl, getCotacaoApi, extractPrice })()
    .then((r) => {
      expect(r).toEqual("");
    });
});
