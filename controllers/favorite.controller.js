const db = require("../models/db");

module.exports.createFavorite = (req, res) => {
  let { userID3, productID3, id } = req.body;
  console.log(id, userID3, productID3);
  db.execute(
    "SELECT * FROM tbl_wishlist WHERE userID3 = ? AND productID3 = ?",
    [userID3, productID3]
  )
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length !== 0) {
        db.execute(
          "DELETE FROM tbl_wishlist WHERE userID3=? AND productID3=?",
          [userID3, productID3]
        )
          .then((data) => {
            res.status(200).json({
              message: "Delete successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      } else {
        db.execute("INSERT INTO tbl_wishlist VALUES(?,?,?,?)", [
          id,
          userID3,
          productID3,
          1,
        ])
          .then((data) => {
            res.status(200).json({
              message: "create successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.getAllFavorite = (req, res) => {
  db.execute(
    "SELECT productID3, name, sellPrice, image FROM tbl_product t1 INNER JOIN tbl_wishlist t2 ON t1.id = t2.productID3"
  )
    .then((data) => {
      let [rows] = data;
      console.log(rows);
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

module.exports.heartFavorite = (req, res) => {
  let userID3 = 170584;
  db.execute("SELECT productID3 FROM tbl_wishlist WHERE userID3=?", [userID3])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
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

module.exports.deleteHeartFavoutite = (req, res) => {
  let { userID3, productID3 } = req.body;
  db.execute("DELETE FROM tbl_wishlist WHERE userID3=? AND productID3=?", [
    userID3,
    productID3,
  ])
    .then((data) => {
      res.status(200).json({
        message: "Delete successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
