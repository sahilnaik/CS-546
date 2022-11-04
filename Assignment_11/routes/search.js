const express = require("express");
const path = require("path");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    res.sendFile(path.resolve("index.html"));
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
