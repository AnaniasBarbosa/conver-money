const { getCoin } = require("./getCoin");

test("collect Coin", () => {
  const moeda = getCoin("USD-BRL");
  expect(moeda).toBe("USD-BRL");
});
