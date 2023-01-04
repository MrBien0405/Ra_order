const db = require("../models/db");
module.exports.getAllHistoryPurchase = (req, res) => {
  db.execute(
    "SELECT name,image,productID1,sell_price,date,time,buy_quantity FROM tbl_product t1 INNER JOIN tbl_purchase_history t2 ON t1.id = t2.productID1 ORDER BY date,time DESC"
  ).then((data) => {
    res.status(200).json({
      data: data[0],
    });
  });
};

module.exports.updateHistoryPurchase = (req, res) => {
  let getToday = new Date();
  let date = getToday.toLocaleDateString("en-GB");
  let time = getToday.toLocaleTimeString("en-GB");
  let historyId = Math.floor(Math.random() * 999999);
  let { userId, productId, sellPrice, buy_quantity } = req.body;
  db.execute("INSERT INTO tbl_purchase_history VALUE(?,?,?,?,?,?,?)", [
    historyId,
    userId,
    productId,
    sellPrice,
    date,
    time,
    buy_quantity,
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
