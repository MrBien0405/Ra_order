const db = require("../models/db");
module.exports.getAllHistoryPurchase = (req, res) => {
  let { id } = req.params;
  db.execute(
    "SELECT t1.name,t1.image,t2.productID1,t2.sell_price,t2.date,t2.time,t2.buy_quantity FROM tbl_product t1 INNER JOIN tbl_purchase_history t2 ON t1.id = t2.productID1 WHERE t2.userID1 = ? ORDER BY date,time DESC ",
    [id]
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
