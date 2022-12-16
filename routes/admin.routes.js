const express = require("express")
const authController = require("../controllers/auth.controller")
const db = require("../models/db")
const router = express.Router()

router.delete("/", authController.deleteAdmin)
