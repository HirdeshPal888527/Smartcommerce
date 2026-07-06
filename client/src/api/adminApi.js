import axiosInstance from "./axios";

export const getDashboardStats = async () => {
    const response = await axiosInstance.get(
        "/admin/dashboard"
    );

    return response.data;
};

export const getAllUsers = async () => {
    const response = await axiosInstance.get(
        "/admin/users"
    );

    return response.data;
};

export const getUserById = async (id) => {
    const response = await axiosInstance.get(
        `/admin/users/${id}`
    );

    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await axiosInstance.patch(
        `/admin/users/${id}/role`,
        { role }
    );

    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(
        `/admin/users/${id}`
    );

    return response.data;
};

export const getAllProducts = async () => {
    const response = await axiosInstance.get(
        "/admin/products"
    );

    return response.data;
};

export const updateProductStatus = async (
    id,
    isActive
) => {
    const response = await axiosInstance.patch(
        `/admin/products/${id}/status`,
        { isActive }
    );

    return response.data;
};

export const getAllOrders = async () => {
    const response = await axiosInstance.get(
        "/admin/orders"
    );

    return response.data;
};

export const updateOrderStatus = async (
    id,
    status
) => {
    const response = await axiosInstance.patch(
        `/admin/orders/${id}/status`,
        { status }
    );

    return response.data;
};