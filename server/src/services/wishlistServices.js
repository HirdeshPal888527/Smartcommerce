const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

const addToWishlist = async (userId, productId) => {
    const product = await Product.findById(productId);

    if (!product || !product.isActive) {
        throw new AppError("Product not found.", 404);
    }

    let wishlist = await Wishlist.findOne({
        user: userId,
    });

    if (!wishlist) {
        wishlist = await Wishlist.create({
            user: userId,
            products: [],
        });
    }

    const alreadyExists = wishlist.products.some(
        (id) => id.toString() === productId.toString()
    );

    if (alreadyExists) {
        throw new AppError(
            "Product already exists in wishlist.",
            400
        );
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return wishlist;
};

const getWishlist = async (userId) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    }).populate("products");

    if (!wishlist) {
        return {
            user: userId,
            products: [],
        };
    }

    return wishlist;
};

const removeFromWishlist = async (userId, productId) => {
    const wishlist = await Wishlist.findOne({
        user: userId,
    });

    if (!wishlist) {
        throw new AppError("Wishlist not found.", 404);
    }

    const exists = wishlist.products.some(
        (id) => id.toString() === productId.toString()
    );

    if (!exists) {
        throw new AppError(
            "Product not found in wishlist.",
            404
        );
    }

    wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();

    return wishlist;
};

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};