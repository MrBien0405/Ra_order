const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();



router.post("/register", authController.register)

router.post("/login", authController.login)

router.put("/user/profile/:id", authController.UpdataUserProfile)

router.get("/user/profile/:id",authController.getAllUserProfile)


module.exports= router