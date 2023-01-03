const db = require("../models/db");
module.exports.getAllHistoryPurchase = (req, res) => {
  res.status(200).json({ message: "oke" });
};

module.exports.updateHistoryPurchase = (req, res) => {
  let getToday = new Date();
  let date = getToday.toLocaleDateString("en-GB");
  let time = getToday.toLocaleTimeString("en-GB");
  let historyId = Math.floor(Math.random() * 999999);
  let { userId, productId, sellPrice, quantity } = req.body;
  db.execute("INSERT INTO tbl_purchase_history VALUE(?,?,?,?,?,?,?)", [
    historyId,
    userId,
    productId,
    sellPrice,
    date,
    time,
    quantity,
  ])
    .then((data) => {
      res.status(200).json({
        message: "THêm oke",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};
