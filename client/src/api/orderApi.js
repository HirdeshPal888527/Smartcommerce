import axiosInstance from "./axios";


export const placeOrder = async (
    shippingAddress,
    paymentMethod
) => {
    const response = await axiosInstance.post(
        "/orders",
        {
            shippingAddress,
            paymentMethod,
        }
    );

    return response.data;
};
// Get all orders of logged-in user
export const getMyOrders = async () => {
    const response = await axiosInstance.get("/orders");

    return response.data;
};

// Get single order
export const getOrderById = async (orderId) => {
    const response = await axiosInstance.get(
        `/orders/${orderId}`
    );

    return response.data;
};

// Cancel order
export const cancelOrder = async (orderId) => {
    const response = await axiosInstance.patch(
        `/orders/${orderId}/cancel`
    );

    return response.data;
};