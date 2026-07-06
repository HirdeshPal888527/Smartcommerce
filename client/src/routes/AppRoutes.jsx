import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Products from "../pages/customer/ProductPage";
import DevPage from "../pages/dev/DevPage";

import ProductDetailsPage from "../pages/customer/ProductDetailsPage";
import CartPage from "../pages/customer/CartPage";
import WishlistPage from "../pages/customer/WishlistPage";
import ProfilePage from "../pages/customer/ProfilePage";
import OrdersPage from "../pages/customer/OrdersPage";
import OrderDetailsPage from "../pages/customer/OrderDetailsPage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import HomePage from "../pages/customer/HomePage";

import Dashboard from "../pages/seller/Dashboard";
import SellerProducts from "../pages/seller/Products";
import AddProducts from "../pages/seller/AddProducts";
import EditProducts from "../pages/seller/EditProducts";
import Orders from "../pages/seller/Orders";
import Analytics from "../pages/seller/Analytics";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminUsers from "../pages/admin/Users";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";


// function Home() {
//     return <h1 className="text-3xl font-bold">Home Page</h1>;
// }

function Login() {
    return <h1 className="text-3xl font-bold">Login Page</h1>;
}

// function Products() {
//     return <h1 className="text-3xl font-bold">Products Page</h1>;
// }

function NotFound() {
    return <h1 className="text-3xl font-bold">404 Page Not Found</h1>;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route path="/products" element={<Products />} />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dev" element={<DevPage />} />
            <Route
                path="/products/:id"
                element={<ProductDetailsPage />}
            />
            
            <Route
                path="/cart"
                element={<CartPage />}
            />
            <Route
                path="/wishlist"
                element={<WishlistPage />}
            />

            <Route
                path="/orders"
                element={<OrdersPage />}
            />
            <Route
                path="/orders/:id"
                element={<OrderDetailsPage />}
            />
            <Route
                path="/checkout"
                element={<CheckoutPage />}
            />
            <Route
                path="/seller/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/seller/products"
                element={<SellerProducts />}
            />

            <Route
                path="/seller/products/add"
                element={<AddProducts />}
            />
 
            <Route
                path="/seller/products/edit/:id"
                element={<EditProducts />}
            />
            

            <Route
                path="/seller/orders"
                element={<Orders />}
            />

            <Route
                path="/seller/analytics"
                element={<Analytics />}
            /> 

            <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
            />

            <Route
                path="/admin/users"
                element={<AdminUsers />}
            />

            <Route
                path="/admin/products"
                element={<AdminProducts />}
            />

            <Route
                path="/admin/orders"
                element={<AdminOrders />}
            /> 
            

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}