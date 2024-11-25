const express = require("express");
const router = express.Router();

// controller

// Middlewares
const { photoInsertValidation } = require("../middlewares/photoValidation.js");
const authGuard = require("../middlewares/authGuard.js");
const validate = require("../middlewares/handleValidation.js");
// Routes

moodule.exports = router;