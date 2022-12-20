const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.get("/", productController.getProduct);

router.get("/search", productController.getSearchProduct);

router.get("/:id", productController.getAllIdProduct);

router.post("/", productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);


module.exports = router;
