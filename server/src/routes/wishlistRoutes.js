const express = require("express");

const wishlistController = require("../controllers/wishlistController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, wishlistController.addToWishlist);

router.get("/", protect, wishlistController.getWishlist);

router.delete(
    "/:productId",
    protect,
    wishlistController.removeFromWishlist
);

module.exports = router;