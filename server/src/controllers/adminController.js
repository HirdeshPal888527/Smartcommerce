const adminService = require("../services/adminServices");
const asyncHandler = require("../utils/asyncHandler");


//Users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await adminService.getAllUsers();

    return res.status(200).json({
        success: true,
        count: users.length,
        users,
    });
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await adminService.getUserById(req.params.id);

    return res.status(200).json({
        success: true,
        user,
    });
});

const updateUserRole = asyncHandler(async (req, res) => {
    const user = await adminService.updateUserRole(
        req.params.id,
        req.body.role
    );

    return res.status(200).json({
        success: true,
        message: "User role updated successfully.",
        user,
    });
});

const deleteUser = asyncHandler(async (req, res) => {
    await adminService.deleteUser(req.params.id);

    return res.status(200).json({
        success: true,
        message: "User deleted successfully.",
    });
});


//Products
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await adminService.getAllProducts();

    return res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});

const updateProductStatus = asyncHandler(async (req, res) => {
    const product = await adminService.updateProductStatus(
        req.params.id,
        req.body.isActive
    );

    return res.status(200).json({
        success: true,
        message: "Product status updated successfully.",
        product,
    });
});

//Orders

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await adminService.getAllOrders();

    return res.status(200).json({
        success: true,
        count: orders.length,
        orders,
    });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const order = await adminService.updateOrderStatus(
        req.params.id,
        req.body.status
    );

    return res.status(200).json({
        success: true,
        message: "Order status updated successfully.",
        order,
    });
});

//Dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
    const dashboard = await adminService.getDashboardStats();

    return res.status(200).json({
        success: true,
        dashboard,
    });
});


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