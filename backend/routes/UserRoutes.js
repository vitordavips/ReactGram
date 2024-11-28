const express = require("express");
const router = express.Router();

// Controller
const {register, getCurrentUser, login, update, getUserById} = require("../controllers/useController.js");


// Middlewares
const validate = require("../middlewares/handleValidation.js");
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation.js");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload.js");


// Routes
router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", loginValidation(), validate, login);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);
router.get("/:id", getUserById);

module.exports = router;