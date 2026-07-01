const sellerService = require("../services/sellerServices");
const asyncHandler = require("../utils/asyncHandler");

const getMyProducts = asyncHandler(async (req, res) => {
    const products = await sellerService.getMyProducts(
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await sellerService.getMyOrders(
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        count: orders.length,
        orders,
    });
});

const getDashboardStats = asyncHandler(async (req, res) => {
    const dashboard = await sellerService.getDashboardStats(
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        dashboard,
    });
});

const getAnalytics = asyncHandler(async (req, res) => {
    const analytics = await sellerService.getAnalytics(
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        analytics,
    });
});

module.exports = {
    getMyProducts,
    getMyOrders,
    getDashboardStats,
    getAnalytics,
};