import axiosInstance from "./axios";

// Get user's cart
export const getCart = async () => {
    const response = await axiosInstance.get("/cart");

    return response.data;
};

// Add product to cart
export const addToCart = async (productId, quantity = 1) => {
    const response = await axiosInstance.post("/cart/add", {
        productId,
        quantity,
    });

    return response.data;
};

// Update quantity
export const updateCartItem = async (productId, quantity) => {
    const response = await axiosInstance.put(
        `/cart/${productId}`,
        {
            quantity,
        }
    );

    return response.data;
};

// Remove one product
export const removeCartItem = async (productId) => {
    const response = await axiosInstance.delete(
        `/cart/${productId}`
    );

    return response.data;
};

// Clear entire cart
export const clearCart = async () => {
    const response = await axiosInstance.delete("/cart");

    return response.data;
};