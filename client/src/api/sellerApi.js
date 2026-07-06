import axiosInstance from "./axios";
import { createProduct } from "./productApi";

export const getMyProducts = async () => {
    const response = await axiosInstance.get("/seller/products");
    return response.data;
};

export const getSellerOrders = async () => {
    const response = await axiosInstance.get("/seller/orders");
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await axiosInstance.get("/seller/dashboard");
    return response.data;
};

export const getSellerAnalytics = async () => {
    const response = await axiosInstance.get("/seller/analytics");
    return response.data;
};

export const addSellerProduct = async (productData) => {
    return await createProduct(productData);
};

export const deleteSellerProduct = async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
};