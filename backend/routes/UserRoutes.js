const express = require("express");
const router = express.Router();

//controller
const {register, login, getCurrentUser, update, getUserById} = require("../controllers/useController");

// Middlewares
const validate = require("../middlewares/handleValidation.js");
const {userCreateValidation, loginValidation, userUpdateValidation} = require("../middlewares/userValidation.js");
const { authGuard } = require("../middlewares/authGuard.js");
const { imageUpload } = require("../middlewares/imageUpload.js");

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser); 
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById) 

module.exports = router;