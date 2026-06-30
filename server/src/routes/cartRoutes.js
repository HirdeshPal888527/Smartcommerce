const express = require("express");

const router = express.Router();

const protect= require("../middlewares/authMiddleware");
const { addToCart,getCart,updateCartItem,removeCartItem, clearCart }=  require("../controllers/cartController");

router.post("/add",protect,addToCart);
router.get("/",protect,getCart);
router.put(
    "/:productId",
    protect,
    updateCartItem
);
router.delete(
    "/",
    protect,
    clearCart,
)

router.delete(
    "/:productId",
    protect,
    removeCartItem,
);



module.exports= router;