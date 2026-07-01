const wishlistService = require("../services/wishlistServices");
const asyncHandler = require("../utils/asyncHandler");

const addToWishlist = asyncHandler(async (req, res) => {
    const { productId } = req.body;

    const wishlist = await wishlistService.addToWishlist(
        req.user.userId,
        productId
    );

    return res.status(200).json({
        success: true,
        message: "Product added to wishlist successfully.",
        wishlist,
    });
});

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.getWishlist(
        req.user.userId
    );

    return res.status(200).json({
        success: true,
        wishlist,
    });
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const wishlist = await wishlistService.removeFromWishlist(
        req.user.userId,
        req.params.productId
    );

    return res.status(200).json({
        success: true,
        message: "Product removed from wishlist.",
        wishlist,
    });
});

module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
};