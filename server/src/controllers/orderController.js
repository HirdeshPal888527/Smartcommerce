const orderService = require("../services/orderServices");
const asyncHandler = require("../utils/asyncHandler");

const placeOrder =  asyncHandler(async(req,res)=>{
    const order= await orderService.placeOrder(
        req.user.userId,
        req.body.shippingAddress,
        req.body.paymentMethod
    );

    return res.status(201).json({
        success:true,
        message:"Order placed Successfully.",
        order,
    });
});

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await orderService.getMyOrders(req.user.userId);

    return res.status(200).json({
        success: true,
        count: orders.length,
        orders,
    });
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderService.getOrderById(
        req.user.userId,
        req.user.role,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        order,
    });
});

const cancelOrder = asyncHandler(async (req, res) => {
    const order = await orderService.cancelOrder(
        req.user.userId,
        req.user.role,
        req.params.id
    );

    return res.status(200).json({
        success: true,
        message: "Order cancelled successfully.",
        order,
    });
});

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
};