const express = require("express");

const adminController = require("../controllers/adminController");
const protect = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

//Users
router.get(
    "/users",
    protect,
    authorizeRoles("admin"),
    adminController.getAllUsers
);

router.get(
    "/users/:id",
    protect,
    authorizeRoles("admin"),
    adminController.getUserById
);

router.patch(
    "/users/:id/role",
    protect,
    authorizeRoles("admin"),
    adminController.updateUserRole
);

router.delete(
    "/users/:id",
    protect,
    authorizeRoles("admin"),
    adminController.deleteUser
);

//Products
router.get(
    "/products",
    protect,
    authorizeRoles("admin"),
    adminController.getAllProducts
);

router.patch(
    "/products/:id/status",
    protect,
    authorizeRoles("admin"),
    adminController.updateProductStatus
);

//Orders
router.get(
    "/orders",
    protect,
    authorizeRoles("admin"),
    adminController.getAllOrders
);

router.patch(
    "/orders/:id/status",
    protect,
    authorizeRoles("admin"),
    adminController.updateOrderStatus
);

//Dashboard
router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin"),
    adminController.getDashboardStats
);

module.exports = router;