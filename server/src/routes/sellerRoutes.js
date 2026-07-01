const express = require("express");

const sellerController = require("../controllers/sellerController");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get(
    "/products",
    protect,
    authorizeRoles("seller", "admin"),
    sellerController.getMyProducts
);

router.get(
    "/orders",
    protect,
    authorizeRoles("seller", "admin"),
    sellerController.getMyOrders
);

router.get(
    "/dashboard",
    protect,
    authorizeRoles("seller", "admin"),
    sellerController.getDashboardStats
);

router.get(
    "/analytics",
    protect,
    authorizeRoles("seller", "admin"),
    sellerController.getAnalytics
);

module.exports = router;