const { name } = require("ejs");
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
          [
      
            name,
            percentReduction,
            priceSale,
            priceInitial,
            image,
            id,
          ]
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
  console.log("à");
  db.execute("SELECT * FROM tbl_toprated WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      if (rows.length === 0) {
        return Promise.reject("Name toprated not to found");
      } else {
        db.execute(
          "UPDATE tbl_toprated SET name=?, salePerMonth=?, image=? WHERE id=?",
          [ name, salePerMonth, image, id]
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


