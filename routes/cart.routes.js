const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
router.get("/sale/", cartController.SaleCartBy);
router.get("/sale/:id", cartController.SaleCartById);
router.put("/sale/:id", cartController.updateSaleCart);
router.get("/top", cartController.TopCard);
router.put("/top/:id", cartController.updateTopCard);
router.get("/:id", cartController.viewAllCart);
router.post("/", cartController.createCart);
router.put("/", cartController.updateCartQuantity);
router.delete("/:id", cartController.deleteCartById);
router.delete("/", cartController.deleteUser);

module.exports = router;
