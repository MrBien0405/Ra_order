const db = require("../models/db");

module.exports.createCart = (req, res) => {
  console.log("a");
  let id = Math.floor(Math.random() * 999999);
  console.log(id);
  let { userId } = req.signedCookies;
  let productID = 93549;
  let cartQuantity = 10;
  console.log(productID);
  console.log(userId);
  db.execute("INSERT INTO tbl_cart VALUES(?,?,?,?)", [
    id,
    userId,
    productID,
    cartQuantity,
  ])
    .then((data) => {
      res.status(200).json({
        message: "Cart one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.deleteCartById = (req, res) => {
  let id = req.params.id;
  console.log(id);
  db.execute("DELETE FROM tbl_cart WHERE id=?", [id])
    .then((data) => {
      res.status(200).json({
        message: "Delete one succesfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.deleteUser = (req, res) => {
  let userId = req.query.userId;
  console.log(userId);
  db.execute("DELETE FROM tbl_cart WHERE userID2=?", [userId])
    .then((data) => {
      res.status(200).json({
        message: "Delete user successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
module.exports.updateCart = (req, res) => {
  console.log(req.query);
};
