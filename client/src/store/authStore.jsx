import { create } from "zustand";

import {
    login as loginApi,
    register as registerApi,
    logout as logoutApi,
    getCurrentUser,
} from "../api/authApi";

const useAuthStore = create((set) => ({
    user: null,

    isAuthenticated: false,

    isLoading: false,

    isCheckingAuth:true,

    login: async (credentials) => {
        set({ isLoading: true });

        try {
            await loginApi(credentials);

            const response = await getCurrentUser();

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                isLoading: false,
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Login failed.",
            };
        }
    },

    register: async (userData) => {
        set({ isLoading: true });

        try {
            await registerApi(userData);

            const response = await getCurrentUser();

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });

            return {
                success: true,
            };
        } catch (error) {
            set({
                isLoading: false,
            });

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Registration failed.",
            };
        }
    },

    logout: async () => {
        try {
            await logoutApi();

            set({
                user: null,
                isAuthenticated: false,
            });

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Logout failed.",
            };
        }
    },

    restoreSession: async () => {
        set({
            isCheckingAuth: true,
        });

        try {
            const response = await getCurrentUser();

            set({
                user: response.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            });
        } catch {
            set({
                user: null,
                isAuthenticated: false,
                isCheckingAuth: false,
            });
        }
    },
}));

export default useAuthStore;