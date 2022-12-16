const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");

router.post("/", cartController.createCart);
router.delete("/", cartController.deleteUser);

router.delete("/:id", cartController.deleteCartById);

module.exports = router;
