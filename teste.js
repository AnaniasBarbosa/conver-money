const axios = require("axios");
const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL";

async function getCotacao() {
  const getCotacao = await axios.get(url);
  const { USDBRL } = await getCotacao.data;

  return USDBRL;
}
module.exports = {
  getCotacao,
};
