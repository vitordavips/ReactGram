const express = require("express");
const router = express.Router();

//controller
const {register, login} = require("../controllers/useController");

// Middlewares
const validate = require("../middlewares/handleValidation");
const {userCreateValidation, loginValidation} = require("../middlewares/userValidation");

// Routes
router.post("/register", userCreateValidation(), validate, register);

router.post("/login", loginValidation(), validate, login);
 

module.exports = router;