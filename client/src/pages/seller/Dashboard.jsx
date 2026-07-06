import { useEffect } from "react";
import { Link } from "react-router-dom";

import DashboardStats from "../../components/seller/DashboardStats";

import useSellerStore from "../../store/sellerStore";

function Dashboard() {
    const {
        analytics,
        fetchSellerAnalytics,
    } = useSellerStore();

    useEffect(() => {
        fetchSellerAnalytics();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Seller Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <DashboardStats
                    title="Products"
                    value={
                        analytics?.totalProducts ??
                        0
                    }
                />

                <DashboardStats
                    title="Orders"
                    value={
                        analytics?.totalOrders ??
                        0
                    }
                />

                <DashboardStats
                    title="Products Sold"
                    value={
                        analytics?.totalProductsSold ??
                        0
                    }
                />

                <DashboardStats
                    title="Revenue"
                    value={`₹${(
                        analytics?.totalRevenue ??
                        0
                    ).toLocaleString()}`}
                />

            </div>

            <div className="mt-12 flex flex-wrap gap-4">

                <Link
                    to="/seller/products"
                    className="rounded-xl bg-green-600 px-6 py-3 text-white"
                >
                    Manage Products
                </Link>

                <Link
                    to="/seller/products/add"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white"
                >
                    Add Product
                </Link>

                <Link
                    to="/seller/orders"
                    className="rounded-xl bg-orange-600 px-6 py-3 text-white"
                >
                    Orders
                </Link>

                <Link
                    to="/seller/analytics"
                    className="rounded-xl bg-purple-600 px-6 py-3 text-white"
                >
                    Analytics
                </Link>

            </div>

        </div>
    );
}

export default Dashboard;