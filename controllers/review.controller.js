const db = require("../models/db");

module.exports.getAllReview = (req, res) => {
  let id = req.params.id;
  db.execute(
    "SELECT name, avatar, comment FROM tbl_review t1 INNER JOIN tbl_users t2 ON t1.userID=t2.id WHERE productID = ?",
    [id]
  )
    .then((data) => {
      let [rows] = data;
      res.status(200).json({
        data: rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.createReview = (req, res) => {
  console.log("abc");
  let { id, userID, productID, comment } = req.body;
  // db.execute("SELECT * FROM tbl_review WHERE productID=?", [productID])
  //   .then((data) => {
  //     let [rows] = data;
  //     console.log(rows);
  //     if (rows.length > 0) {
  //       return Promise.reject("Product to already exist");
  //     } else {
  db.execute("INSERT INTO tbl_review VALUES(?,?,?,?,?)", [
    id,
    userID,
    productID,
    comment,
    4,
  ])
    //   }
    // })
    .then((data) => {
      res.status(200).json({
        message: "Create comment successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
