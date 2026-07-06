import { Outlet, NavLink } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

function SellerLayout() {
    const { user, logout } = useAuthStore();

    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            navigate("/login");
        }
    };

    const linkClass = ({ isActive }) =>
        `block rounded-xl px-4 py-3 transition ${
            isActive
                ? "bg-green-600 text-white"
                : "hover:bg-gray-100"
        }`;

    

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm flex flex-col">

                <div className="p-6 border-b">

                    <h1 className="text-2xl font-bold text-green-600">
                        SmartCommerce
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Seller Portal
                    </p>

                </div>

                <nav className="flex-1 p-4 space-y-2">

                    <NavLink
                        to="/seller/dashboard"
                        className={linkClass}
                    >
                        📊 Dashboard
                    </NavLink>

                    <NavLink
                        to="/seller/products"
                        className={linkClass}
                    >
                        📦 My Products
                    </NavLink>

                    <NavLink
                        to="/seller/products/add"
                        className={linkClass}
                    >
                        ➕ Add Product
                    </NavLink>

                    <NavLink
                        to="/seller/orders"
                        className={linkClass}
                    >
                        📋 Orders
                    </NavLink>

                    <NavLink
                        to="/seller/analytics"
                        className={linkClass}
                    >
                        📈 Analytics
                    </NavLink>

                </nav>

            </aside>

            {/* Right Side */}
            <div className="flex-1 flex flex-col">

                {/* Header */}

                <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">

                    <div>

                        <h2 className="text-2xl font-semibold">
                            Seller Portal
                        </h2>

                        <p className="text-gray-500 text-sm">
                            SmartCommerce Seller Management
                        </p>

                    </div>

                    <div className="flex items-center gap-5">

                        <div className="text-right">

                            <p className="font-semibold">
                                {user?.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user?.role}
                            </p>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
                        >
                            Logout
                        </button>

                    </div>

                </header>

                {/* Main */}

                <main className="flex-1 overflow-y-auto">

                    <Outlet />

                </main>

                {/* Footer */}

                <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">

                    © 2026 SmartCommerce • Seller Portal

                </footer>

            </div>

        </div>
    );
}

export default SellerLayout;