const express = require("express");
const router = express.Router();

// controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos} = require("../controllers/photoControlle.js");

// Middlewares
const { photoInsertValidation } = require("../middlewares/photoValidation.js");
const  authGuard  = require("../middlewares/authGuard.js");
const validate = require("../middlewares/handleValidation.js");
const { imageUpload } = require("../middlewares/imageUpload.js");

// Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);

module.exports = router;