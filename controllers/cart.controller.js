const { name } = require("ejs");
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

module.exports.SaleCartBy = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_saleoff")
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

module.exports.SaleCartById = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_saleoff WHERE id=?", [id])
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

module.exports.updateSaleCart = (req, res) => {
  console.log("abc");
  let { id } = req.params;
  let { name, percentReduction, priceSale, priceInitial, image } = req.body;
  db.execute("SELECT * FROM tbl_saleoff WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      console.log(rows);
      if (rows.length === 0) {
        return Promise.reject("Name saloff to not found");
      } else {
        db.execute(
          "UPDATE tbl_saleoff SET name=?, percentReduction=?, priceSale=?, priceInitial=?, image=? WHERE id=?",
          [name, percentReduction, priceSale, priceInitial, image, id]
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Update succesfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.TopCard = (req, res) => {
  db.execute("SELECT * FROM tbl_toprated")
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

module.exports.updateTopCard = (req, res) => {
  let { id } = req.params;
  let { name, salePerMonth, image } = req.body;
  db.execute("SELECT * FROM tbl_toprated WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      if (rows.length === 0) {
        return Promise.reject("Name toprated not to found");
      } else {
        db.execute(
          "UPDATE tbl_toprated SET name=?, salePerMonth=?, image=? WHERE id=?",
          [name, salePerMonth, image, id]
        );
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Update one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
