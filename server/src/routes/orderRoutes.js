const express = require("express");

const orderController = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/",protect,orderController.placeOrder);
router.get("/",protect,orderController.getMyOrders);
router.get(
    "/:id",
    protect,
    orderController.getOrderById
);
router.patch(
    "/:id/cancel",
    protect,
    orderController.cancelOrder
)

module.exports= router;