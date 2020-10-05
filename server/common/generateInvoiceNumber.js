const dateFormat = require("dateformat");

const generateInvoiceNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 3;
  let random;
  let output = "";

  for (let i = 1; i <= length; i++) {
    output += letters.substring(
      (random = Math.floor(Math.random() * letters.length)),
      random + 1
    );
  }

  return "TX24" + dateFormat(new Date(), "yyyymmddhhMMss") + output;
};

module.exports = generateInvoiceNumber;
