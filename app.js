const express = require("express");
const path = require("path");
const app = express();
const convertion = require("./lib/convert");
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/cotacao", (req, res) => {
  const { cotacao, quantidade } = req.query;
  const { convert, toMoney } = convertion;
  const money = toMoney(convert(cotacao, quantidade));
  res.render("pages/cotacao", {
    cotacao,
    quantidade: toMoney(quantidade),
    money,
  });
});

app.listen(PORT, (err) => {
  console.log(`SERVIDOR EM EXECUÇÃO NA PORTA: ${PORT}`);
});
