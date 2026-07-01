const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");


//Users
const getAllUsers = async () => {
    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    return users;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    return user;
};

const updateUserRole = async (userId, role) => {
    const allowedRoles = ["buyer", "seller", "admin"];

    if (!allowedRoles.includes(role)) {
        throw new AppError("Invalid role.", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    user.role = role;

    await user.save();

    return user;
};

const deleteUser = async (userId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError("User not found.", 404);
    }

    if (user.role === "admin") {
        throw new AppError("Admin accounts cannot be deleted.", 400);
    }

    user.isActive = false;

    await user.save();

    return;
};


//Products
const getAllProducts = async () => {
    const products = await Product.find()
        .populate("seller", "name email")
        .sort({ createdAt: -1 });

    return products;
};

const updateProductStatus = async (productId, isActive) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found.", 404);
    }

    product.isActive = isActive;

    await product.save();

    return product;
};

//Orders
const getAllOrders = async () => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.product", "name")
        .sort({ createdAt: -1 });

    return orders;
};

const updateOrderStatus = async (orderId, status) => {
    const allowedStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
        throw new AppError("Invalid order status.", 400);
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError("Order not found.", 404);
    }

    order.orderStatus = status;

    await order.save();

    return order;
};

//Dashboard
const getDashboardStats = async () => {
    const totalUsers = await User.countDocuments();

    const activeUsers = await User.countDocuments({
        isActive: true,
    });

    const totalProducts = await Product.countDocuments();

    const activeProducts = await Product.countDocuments({
        isActive: true,
    });

    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
        orderStatus: "Pending",
    });

    const revenue = await Order.aggregate([
        {
            $match: {
                paymentStatus: "Paid",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalAmount",
                },
            },
        },
    ]);

    return {
        totalUsers,
        activeUsers,
        totalProducts,
        activeProducts,
        totalOrders,
        pendingOrders,
        totalRevenue: revenue.length
            ? revenue[0].totalRevenue
            : 0,
    };
};


module.exports = {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,

    getAllProducts,
    updateProductStatus,

    getAllOrders,
    updateOrderStatus,

    getDashboardStats,
};