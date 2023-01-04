const express = require("express");
const router = express.Router();
const historyController = require("../controllers/history.controller");
router.get("/:id", historyController.getAllHistoryPurchase);
router.post("/", historyController.updateHistoryPurchase);
module.exports = router;
