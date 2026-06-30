const express = require("express");

const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const authorize= require("../middlewares/roleMiddleware");
const upload= require("../middlewares/uploadMiddleware");

const {uploadImage}= require("../controllers/uploadController");

router.post(
    "/",
    protect,
    authorize("seller","admin"),
    upload.single("image"),
    uploadImage
);

module.exports= router;