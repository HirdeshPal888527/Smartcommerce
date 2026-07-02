import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

function Home() {
    return <h1 className="text-3xl font-bold">Home Page</h1>;
}

function Login() {
    return <h1 className="text-3xl font-bold">Login Page</h1>;
}

function Products() {
    return <h1 className="text-3xl font-bold">Products Page</h1>;
}

function NotFound() {
    return <h1 className="text-3xl font-bold">404 Page Not Found</h1>;
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
            </Route>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}