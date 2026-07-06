const express = require("express");

const orderController = require("../controllers/orderController");
const protect = require("../middlewares/authMiddleware");
const authorize= require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/",protect,orderController.placeOrder);
router.get("/",protect,orderController.getMyOrders);
router.get(
    "/seller",
    protect,
    authorize("seller"),
    orderController.getSellerOrders
);
router.get(
    "/seller/analytics",
    protect,
    authorize("seller"),
    orderController.getSellerAnalytics
);
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