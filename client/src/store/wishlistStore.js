import { create } from "zustand";

import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
} from "../api/wishlistApi";

const useWishlistStore = create((set) => ({
    wishlist: null,

    isLoading: false,

    error: null,

    fetchWishlist: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getWishlist();

            set({
                wishlist: data.wishlist,
                isLoading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch wishlist.",
                isLoading: false,
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to fetch wishlist.",
            };
        }
    },

    addItem: async (productId) => {
        try {
            await addToWishlist(productId);

            const data = await getWishlist();

            set({
                wishlist: data.wishlist,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to add product.",
            };
        }
    },

    removeItem: async (productId) => {
        try {
            await removeFromWishlist(productId);

            const data = await getWishlist();

            set({
                wishlist: data.wishlist,
            });

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Failed to remove product.",
            };
        }
    },
}));

export default useWishlistStore;