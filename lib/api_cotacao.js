const axios = require("axios");
const { getMoeda } = require("./getMoedas");

const getUrl = (codMoeda) => `https://economia.awesomeapi.com.br/json/last/${codMoeda}`;
const getCotacao = (moeda) => axios.get(getUrl(moeda));

const extractValor = async () => {
  try {
    const moeda = getMoeda("USD-BRL");
    const res = await getCotacao(moeda);
    const { bid } = res.data.USDBRL;

    return bid;
  } catch (error) {
    return "";
  }
};

module.exports = {
  extractValor,
};
