import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthStore from "../../store/authStore";

function Navbar() {
    const {
        user,
        isAuthenticated,
        logout,
    } = useAuthStore();

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            toast.success("Logged out successfully.");
        } else {
            toast.error(result.message);
        }
    };

    const navLinkClass = ({ isActive }) =>
        `transition ${
            isActive
                ? "text-green-400 font-semibold"
                : "text-white hover:text-green-400"
        }`;

    return (
        <nav className="bg-slate-900 shadow-md">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-bold text-green-400"
                >
                    SmartCommerce
                </Link>

                <div className="flex items-center gap-8">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>

                    <NavLink to="/products" className={navLinkClass}>
                        Products
                    </NavLink>

                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/login" className={navLinkClass}>
                                Login
                            </NavLink>

                            <NavLink to="/register" className={navLinkClass}>
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {user?.role === "seller" && (
                                <NavLink
                                    to="/seller/dashboard"
                                    className={navLinkClass}
                                >
                                    Seller Dashboard
                                </NavLink>
                            )}

                            {user?.role === "admin" && (
                                <NavLink
                                    to="/admin/dashboard"
                                    className={navLinkClass}
                                >
                                    Admin Dashboard
                                </NavLink>
                            )}

                            {user?.role === "buyer" && (
                                <NavLink
                                    to="/profile"
                                    className={navLinkClass}
                                >
                                    Profile
                                </NavLink>
                            )}

                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-green-400 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;