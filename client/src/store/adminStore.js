import { create } from "zustand";

import {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllProducts,
    updateProductStatus,
    getAllOrders,
    updateOrderStatus,
} from "../api/adminApi";

const useAdminStore = create((set) => ({
    dashboard: null,

    users: [],

    products: [],

    orders: [],

    isLoading: false,

    error: null,

    fetchDashboard: async () => {
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
                    "Failed to load dashboard.",
                isLoading: false,
            });
        }
    },

    fetchUsers: async () => {
        try {
            const data =
                await getAllUsers();

            set({
                users: data.users,
            });
        } catch {}
    },

    fetchProducts: async () => {
        try {
            const data =
                await getAllProducts();

            set({
                products: data.products,
            });
        } catch {}
    },

    fetchOrders: async () => {
        try {
            const data =
                await getAllOrders();

            set({
                orders: data.orders,
            });
        } catch {}
    },

    updateUserRole: async (id, role) => {
        await updateUserRole(id, role);

        await useAdminStore
            .getState()
            .fetchUsers();
    },

    deleteUser: async (id) => {
        await deleteUser(id);

        await useAdminStore
            .getState()
            .fetchUsers();
    },

    updateProductStatus: async (
        id,
        isActive
    ) => {
        await updateProductStatus(
            id,
            isActive
        );

        await useAdminStore
            .getState()
            .fetchProducts();
    },

    updateOrderStatus: async (
        id,
        status
    ) => {
        await updateOrderStatus(
            id,
            status
        );

        await useAdminStore
            .getState()
            .fetchOrders();
    },
}));

export default useAdminStore;