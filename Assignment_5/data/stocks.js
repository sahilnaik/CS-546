const axios = require("axios");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data; // this will be the array of stocks objects
}

async function getStocksById(id) {
  if (id === undefined || id === null) {
    throw "ID not defined";
  }
  if (typeof id !== "string") {
    throw "Invalid ID type";
  }
  const stocksCollection = await getStocks();
  let stock = await stocksCollection.find((stock) => stock.id === id.trim());

  if (stock) {
    return stock;
  }
  throw "Person with id " + id + " not found";
}

async function getAllStocks() {
  const stocksCollection = await getStocks();
  let stockList = await stocksCollection;
  return stockList;
}

module.exports = {
  getStocksById,
  getAllStocks,
};
