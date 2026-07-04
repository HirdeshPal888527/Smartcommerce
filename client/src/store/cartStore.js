import { create } from "zustand";

import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from "../api/cartApi";

const useCartStore = create((set) => ({
    cart: null,

    isLoading: false,

    error: null,

    fetchCart: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getCart();

            set({
                cart: data.cart,
                isLoading: false,
            });

            return { success: true };
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch cart.",
                isLoading: false,
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to fetch cart.",
            };
        }
    },

    addItem: async (productId, quantity = 1) => {
        try {
            await addToCart(productId, quantity);

            const data = await getCart();

            set({
                cart: data.cart,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to add item.",
            };
        }
    },

    updateItem: async (productId, quantity) => {
        try {
            await updateCartItem(productId, quantity);

            const data = await getCart();

            set({
                cart: data.cart,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to update cart.",
            };
        }
    },

    removeItem: async (productId) => {
        try {
            await removeCartItem(productId);

            const data = await getCart();

            set({
                cart: data.cart,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to remove item.",
            };
        }
    },

    clearAll: async () => {
        try {
            await clearCart();

            set({
                cart: null,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to clear cart.",
            };
        }
    },
}));

export default useCartStore;