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

module.exports.createProduct=(req, res)=>{
    let {name} = req.params
    db.execute("SELECT * FROM tbl_product WHERE name",[name])
    .then((data)=>{

    })
    .catch((err)=>{
        res.status(500).json({
            message: err
        })
    })
}