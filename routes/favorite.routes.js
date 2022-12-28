const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favorite.controller")

router.post("/", favoriteController.createFavorite)

router.get("/", favoriteController.getAllFavorite)

router.get("/heart/", favoriteController.heartFavorite)

router.delete("/heart",favoriteController.deleteHeartFavoutite )
module.exports = router;