const Order= require("../models/Order");
const Cart= require("../models/Cart");
const Product= require("../models/Product");
const AppError= require("../utils/AppError");


const placeOrder= async(userId,shippingAddress,paymentMethod="COD") =>{
    const cart = await Cart.findOne({
        user: userId,
    }).populate("items.product");

    if(!cart || cart.items.length === 0){
        throw new AppError("Cart is empty.",400);
    }

    let totalAmount = 0;
    const orderItems = [];

    // Validation Phase
    for (const item of cart.items) {
        const product = item.product;

        if (!product || !product.isActive) {
            throw new AppError("Product not found.", 404);
        }

        if (product.stock < item.quantity) {
            throw new AppError(
                `${product.name} does not have enough stock.`,
                400
            );
        }

        totalAmount += product.price * item.quantity;

        orderItems.push({
            product: product._id,
            name: product.name,
            image: product.images[0]?.url || "",
            price: product.price,
            quantity: item.quantity,
        });
    }

    // Reduce Stock
    for (const item of cart.items) {
        item.product.stock -= item.quantity;
        await item.product.save();
    }

    // Create Order
    const order = await Order.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        totalAmount,
        paymentMethod,
    });

    // Clear Cart
    cart.items = [];
    await cart.save();

    return order;
};

const getMyOrders = async (userId) => {
    const orders = await Order.find({
        user: userId,
    }).sort({
        createdAt: -1,
    });

    return orders;
};
const getOrderById = async (userId, role, orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError("Order not found.", 404);
    }

    const isAdmin = role === "admin";
    const isOwner = order.user.toString() === userId;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            "You are not authorized to view this order.",
            403
        );
    }

    return order;
};
const cancelOrder = async (userId, role, orderId) => {
    const order = await Order.findById(orderId);

    if (!order) {
        throw new AppError("Order not found.", 404);
    }

    const isAdmin = role === "admin";
    const isOwner = order.user.toString() === userId;

    if (!isAdmin && !isOwner) {
        throw new AppError(
            "You are not authorized to cancel this order.",
            403
        );
    }

    if (order.orderStatus !== "Pending") {
        throw new AppError(
            "Only pending orders can be cancelled.",
            400
        );
    }

    for (const item of order.items) {
        const product = await Product.findById(item.product);

        if (product) {
            product.stock += item.quantity;
            await product.save();
        }
    }

    order.orderStatus = "Cancelled";

    await order.save();

    return order;
};

module.exports = {
    placeOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
};
