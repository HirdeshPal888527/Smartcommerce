import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/authStore";

function SellerRoute() {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "seller") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default SellerRoute;