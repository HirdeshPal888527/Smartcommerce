import { create } from "zustand";

import {
    getMyProducts,
    getSellerOrders,
    getSellerAnalytics,
    getDashboardStats,
    deleteSellerProduct,
    addSellerProduct,
} from "../api/sellerApi";
import { updateProduct as updateProductApi } from "../api/productApi";

const useSellerStore = create((set) => ({
    products: [],

    orders: [],

    dashboard: null,

    analytics: null,

    isLoading: false,

    error: null,

    fetchMyProducts: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data =
                await getMyProducts();

            set({
                products: data.products,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch products.",
                isLoading: false,
            });
        }
    },

    fetchSellerOrders: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data =
                await getSellerOrders();

            set({
                orders: data.orders,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch orders.",
                isLoading: false,
            });
        }
    },

    fetchSellerAnalytics: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data =
                await getSellerAnalytics();

            set({
                analytics:
                    data.analytics,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch analytics.",
                isLoading: false,
            });
        }
    },
    fetchDashboardStats: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data =
                await getDashboardStats();

            set({
                dashboard: data.dashboard,
                isLoading: false,
            });
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch dashboard.",
                isLoading: false,
            });
        }
    },

    addProduct: async (productData) => {
        try {
            await addSellerProduct(productData);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to create product.",
            };
        }
    },
    deleteProduct: async (id) => {
        try {
            await deleteSellerProduct(id);

            const data =
                await getMyProducts();

            set({
                products: data.products,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to delete product.",
            };
        }
    },
    updateProduct: async (id, productData) => {
        try {
            await updateProductApi(id, productData);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to update product.",
            };
        }
    },
}));

export default useSellerStore;