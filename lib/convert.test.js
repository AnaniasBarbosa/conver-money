const convertion = require("./convert");

test("convert cotacao dolar 4 to real 4", () => {
  expect(convertion.convert(4, 4)).toBe(16);
});

test("convert 4 to real com toMoney", () => {
  expect(convertion.toMoney(convertion.convert(4, 2))).toBe("8.00");
});
