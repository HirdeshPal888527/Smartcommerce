const Product = require("../models/Product");
const Order = require("../models/Order");


const getMyProducts = async (sellerId) => {
    const products = await Product.find({
        seller: sellerId,
        isActive: true,
    }).sort({
        createdAt: -1,
    });

    return products;
};

const getMyOrders = async (sellerId) => {
    const orders = await Order.aggregate([
        {
            $unwind: "$items",
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $match: {
                "product.seller": sellerId,
            },
        },
        {
            $group: {
                _id: "$_id",
                user: { $first: "$user" },
                items: { $push: "$items" },
                totalAmount: { $first: "$totalAmount" },
                paymentStatus: { $first: "$paymentStatus" },
                orderStatus: { $first: "$orderStatus" },
                paymentMethod: { $first: "$paymentMethod" },
                createdAt: { $first: "$createdAt" },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);

    return orders;
};

const getDashboardStats = async (sellerId) => {
    const products = await Product.find({
        seller: sellerId,
        isActive: true,
    }).select("_id");

    const productIds = products.map((product) => product._id);

    const orders = await Order.find({
        "items.product": {
            $in: productIds,
        },
    });

    const totalProducts = products.length;

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.orderStatus === "Pending"
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0
    );

    return {
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
    };
};

const getAnalytics = async (sellerId) => {
    const orders = await Order.aggregate([
        {
            $unwind: "$items",
        },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "product",
            },
        },
        {
            $unwind: "$product",
        },
        {
            $match: {
                "product.seller": sellerId,
            },
        },
        {
            $group: {
                _id: {
                    orderStatus: "$orderStatus",
                    paymentStatus: "$paymentStatus",
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);

    const analytics = {
        ordersByStatus: {},
        paymentStatus: {},
    };

    for (const item of orders) {
        analytics.ordersByStatus[item._id.orderStatus] =
            (analytics.ordersByStatus[item._id.orderStatus] || 0) +
            item.count;

        analytics.paymentStatus[item._id.paymentStatus] =
            (analytics.paymentStatus[item._id.paymentStatus] || 0) +
            item.count;
    }

    return analytics;
};

module.exports = {
    getMyProducts,
    getMyOrders,
    getDashboardStats,
    getAnalytics,
};