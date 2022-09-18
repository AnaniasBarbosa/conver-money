const express = require("express");
const cotacao = require("./lib/api_cotacao");
const convertion = require("./lib/convert");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const moeda = await cotacao.extractValor();

  res.render("pages/index", {
    moeda,
  });
});

app.get("/cotacao", async (req, res) => {
  const { cotacao, quantidade } = req.query;
  const { convert, toMoney } = convertion;

  const money = await toMoney(convert(cotacao, quantidade));

  res.render("pages/cotacao", {
    cotacao,
    quantidade: toMoney(quantidade),
    money,
  });
});

app.listen(PORT, (err) => {
  console.log(`SERVIDOR EM EXECUÇÃO NA PORTA: ${PORT}`);
});
