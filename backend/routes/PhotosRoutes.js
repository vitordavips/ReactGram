const express = require("express");
const router = express.Router();

// controller
const {insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto} = require("../controllers/photoControlle.js");

// Middlewares
const { photoInsertValidation, photoUpdateValidation } = require("../middlewares/photoValidation.js");
const  authGuard  = require("../middlewares/authGuard.js");
const validate = require("../middlewares/handleValidation.js");
const { imageUpload } = require("../middlewares/imageUpload.js");

// Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById); 
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

module.exports = router;

