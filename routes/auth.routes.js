const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();


// setup user router

// get all user
// router.get("", authController.getAll)
// // get user by id
// router.get("/:id",authController.getById)

// create user
router.post("/register", authController.register)

router.post("/login", authController.login)


// update user
// router.put("/:id", authController.updateUsers)

// // delete user
// router.delete("/:id", authController.deleteUsers)



module.exports= router