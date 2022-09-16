const convert = (cotacao, quantidade) => {
  return cotacao * quantidade;
};

const toMoney = (valor) => {
  valor = parseInt(valor);
  return valor.toFixed(2);
};

module.exports = {
  convert,
  toMoney,
};
