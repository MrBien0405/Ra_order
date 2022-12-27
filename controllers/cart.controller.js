const db = require("../models/db");
module.exports.viewAllCart = (req, res) => {
  let userId = req.params.id;
  if (userId) {
    db.execute("SELECT * FROM tbl_cart WHERE userID2 = ?", [userId])
      .then((data) => {
        res.status(200).json({ cartCounter: data[0].length, data: data[0] });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  }
};
module.exports.createCart = (req, res) => {
  let { userId, productId, id } = req.body;
  db.execute("SELECT * FROM tbl_cart WHERE userID2 = ? AND productID2 = ?", [
    userId,
    productId,
  ])
    .then((data) => {
      if (data[0].length !== 0) {
        db.execute(
          "UPDATE tbl_cart SET cartQuantity = cartQuantity + 1 WHERE userID2 = ? AND productID2 = ?",
          [userId, productId]
        )
          .then((data) => {
            res.status(201).json({ message: "Update oke" });
          })
          .catch((err) => {
            res.status(400).json({ error: err });
          });
      } else {
        db.execute("INSERT INTO tbl_cart VALUES(?,?,?,?)", [
          id,
          userId,
          productId,
          1,
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
      }
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
};

module.exports.deleteCartById = (req, res) => {
  let id = req.params.id;
  db.execute("DELETE FROM tbl_cart WHERE productID2=?", [id])
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
  let { value, userId, productId } = req.body;
  db.execute(
    "UPDATE tbl_cart SET cartQuantity = ? WHERE userID2 = ? AND productID2 = ?",
    [value, userId, productId]
  )
    .then((data) => {
      res.status(200).json({ message: "update oke" });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
