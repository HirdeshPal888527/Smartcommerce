import { Navigate, Outlet } from "react-router-dom";

import useAuthStore from "../store/authStore";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function ProtectedRoute() {
    const {
        isAuthenticated,
        isCheckingAuth,
    } = useAuthStore();

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;