const db = require("../models/db");


module.exports.getAllProduct = (req, res) => {
  db.execute("SELECT * FROM tbl_product")
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

module.exports.getAllIdProduct = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_product WHERE id=?", [id])
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

module.exports.createProduct = (req, res) => {
  let { name, discription, quantity, price, categories, image } = req.body;
  let id = Math.floor(Math.random() * 999999);
  if (!name || !discription || !quantity || !price || !categories || !image) {
    res.status(500).json({
      message: "Invail name or discription or quantity or price or categories or image",
    });
  }
  db.execute("SELECT * FROM tbl_product WHERE name=?", [name])
    .then((data) => {
      let [rows] = data;
      if (rows.length > 0) {
        return Promise.reject("Name product already exist ");
      } else {
        return db.execute("INSERT INTO tbl_product VALUES(?,?,?,?,?,?,?)", [
          id,
          name,
          discription,
          quantity,
          price,
          categories,
          image
        ]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Create one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

module.exports.updateProduct = (req, res) => {
  let { id } = req.params;
  let { name, discription, quantity, price, categories, image } = req.body;
  db.execute("SELECT * FROM tbl_product WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      if (rows.length === 0) {
        return Promise.reject("Name product not found");
      } else {
        db.execute(
          "UPDATE tbl_product SET name=?, discription=?, quantity=?, price=?, categories=?, image=? WHERE id=?",
          [name, discription, quantity, price, categories,image, id]
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

module.exports.deleteProduct = (req, res) => {
  let { id } = req.params;
  db.execute("SELECT * FROM tbl_product WHERE id=?", [id])
    .then((data) => {
      let [rows] = data;
      if (rows.length === 0) {
        return Promise.reject("Name product no found");
      } else {
        db.execute("DELETE from tbl_product WHERE id=?", [id]);
      }
    })
    .then((data) => {
      res.status(200).json({
        message: "Delete one successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};
