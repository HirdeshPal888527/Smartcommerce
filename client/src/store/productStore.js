import { create } from "zustand";

import { getProducts,getProductById } from "../api/productApi";

const useProductStore = create((set) => ({
    products: [],

    totalProducts: 0,

    totalPages: 1,

    currentPage: 1,

    isLoading: false,

    error: null,

    selectedProduct: null,

    isProductLoading: false,

    fetchProducts: async (filters = {}) => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const data = await getProducts(filters);

            set({
                products: data.products,
                totalProducts: data.totalProducts,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
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

    fetchProductById: async (id) => {
    set({
        isProductLoading: true,
        error: null,
    });

    try {
        const data = await getProductById(id);

        set({
            selectedProduct: data.product,
            isProductLoading: false,
        });
    } catch (error) {
        set({
            error:
                error.response?.data?.message ||
                "Failed to fetch product.",
            isProductLoading: false,
        });
    }
},
}));

export default useProductStore;