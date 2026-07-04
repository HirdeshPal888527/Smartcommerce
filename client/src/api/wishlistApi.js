import axiosInstance from "./axios";

// Get user's wishlist
export const getWishlist = async () => {
    const response = await axiosInstance.get("/wishlist");

    return response.data;
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
    const response = await axiosInstance.post("/wishlist", {
        productId,
    });

    return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
    const response = await axiosInstance.delete(
        `/wishlist/${productId}`
    );

    return response.data;
};