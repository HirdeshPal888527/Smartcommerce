const Order = require("../models/Order");
const AppError = require("../utils/AppError");
const mockPaymentProvider = require("../providers/mockPaymentProvider");



const payOrder = async (userId, role, orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError("Order not found.", 404);
    }

    const isAdmin = role === "admin";
    const isOwner = order.user.toString() === userId;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            "You are not authorized to pay for this order.",
            403
        );
    }

    if (order.paymentStatus === "Paid") {
        throw new AppError("Order has already been paid.", 400);
    }

    if (order.paymentMethod !== "ONLINE") {
        throw new AppError(
            "Only ONLINE orders can be paid.",
            400
        );
    }

    const payment = await mockPaymentProvider.processPayment(
        order.totalAmount
    );

    order.paymentStatus = payment.status;
    order.transactionId = payment.transactionId;
    order.paidAt = payment.paidAt;

    await order.save();

    return order;
};

module.exports = {
    payOrder,
};