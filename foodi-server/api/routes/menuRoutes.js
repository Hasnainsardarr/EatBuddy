const express = require("express");
const Menu = require("../models/Menu");
const router = express.Router();


const menuControllers = require("../controllers/menuControllers");

// Get all menu items
router.get("/", menuControllers.getAllMenuItems); 

module.exports = router; // ✅ Properly export the router
