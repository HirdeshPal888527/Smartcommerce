import axiosInstance from "./axios";

export const getProducts = async (params = {}) => {
    const response = await axiosInstance.get(
        "/products",
        {
            params,
        }
    );

    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};