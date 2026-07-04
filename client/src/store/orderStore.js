import { create } from "zustand";

import {
    getMyOrders,
    getOrderById,
    cancelOrder,
    placeOrder,
} from "../api/orderApi";

const useOrderStore = create((set) => ({
    orders: [],

    selectedOrder: null,

    isLoading: false,

    error: null,

    fetchOrders: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getMyOrders();

            set({
                orders: data.orders,
                isLoading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch orders.",
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to fetch orders.",
            };
        }
    },

    fetchOrderById: async (orderId) => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getOrderById(orderId);

            set({
                selectedOrder: data.order,
                isLoading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                isLoading: false,
                error:
                    error.response?.data?.message ||
                    "Failed to fetch order.",
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to fetch order.",
            };
        }
    },
    placeOrder: async (
        shippingAddress,
        paymentMethod
    ) => {
        try {
            const data = await placeOrder(
                shippingAddress,
                paymentMethod
            );

            const orders = await getMyOrders();

            set({
                orders: orders.orders,
            });

            return {
                success: true,
                order: data.order,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to place order.",
            };
        }
    },

    cancelOrder: async (orderId) => {
        try {
            await cancelOrder(orderId);

            const data = await getMyOrders();

            set({
                orders: data.orders,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to cancel order.",
            };
        }
    },
}));

export default useOrderStore;