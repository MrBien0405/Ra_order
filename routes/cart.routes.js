const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
router.get("/:id", cartController.viewAllCart);
router.post("/", cartController.createCart);
router.put("/", cartController.updateCart);
router.delete("/", cartController.deleteUser);
router.delete("/:id", cartController.deleteCartById);

module.exports = router;
