const axios = require("axios");
const { getCoin } = require("./getCoin");

const getUrl = (coinCode) => `https://economia.awesomeapi.com.br/json/last/${coinCode}`;
const getCotacaoApi = (url) => axios.get(url);
const extractPrice = (res) => res.data.USDBRL.bid;

const getCotacao =
  ({ getCoin, getUrl, getCotacaoApi, extractPrice }) =>
  async () => {
    try {
      const coinCode = getCoin("USD-BRL");
      const url = getUrl(coinCode);
      const res = await getCotacaoApi(url);

      const cotacao = extractPrice(res);

      return cotacao;
    } catch (error) {
      return "";
    }
  };

module.exports = {
  getUrl,
  getCotacao: getCotacao({ getCoin, getUrl, getCotacaoApi, extractPrice }),
  getCotacaoApi,
  extractPrice,
  pure: {
    getCotacao,
  },
};
