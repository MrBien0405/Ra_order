const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
router.get("/:id", cartController.viewAllCart);
router.post("/", cartController.createCart);
router.get("/sale/", cartController.SaleCartBy);
router.get("/sale/:id", cartController.SaleCartById);
router.put("/sale/:id", cartController.updateSaleCart);

router.get("/top", cartController.TopCard)
router.put("/top/:id", cartController.updateTopCard)

router.delete("/", cartController.deleteUser);
router.delete("/:id", cartController.deleteCartById);



module.exports = router;

