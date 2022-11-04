const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get("/:id", async (req, res) => {
  try {
    const stock = await stocksData.getStocksById(req.params.id);
    res.json(stock);
  } catch (e) {
    res.status(404).json({ message: "Stocks not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const stockList = await stocksData.getAllStocks();
    res.json(stockList);
  } catch (e) {
    res.status(500).json({ message: "Data not found" });
  }
});

module.exports = router;
