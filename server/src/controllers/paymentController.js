const paymentService = require("../services/paymentServices");
const asyncHandler = require("../utils/asyncHandler");

const payOrder = asyncHandler(async (req, res) => {
    const order = await paymentService.payOrder(
        req.user.userId,
        req.user.role,
        req.params.orderId
    );

    return res.status(200).json({
        success: true,
        message: "Payment completed successfully.",
        order,
    });
});

module.exports = {
    payOrder,
};