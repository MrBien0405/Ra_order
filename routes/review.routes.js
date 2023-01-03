const express = require("express")
const router = express.Router()
const reviewsController = require("../controllers/review.controller")

router.get("/:id", reviewsController.getAllReview)

router.post("/", reviewsController.createReview)



module.exports= router