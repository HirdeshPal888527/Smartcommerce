import { useEffect } from "react";
import { Link } from "react-router-dom";

import DashboardStats from "../../components/seller/DashboardStats";
import useSellerStore from "../../store/sellerStore";

const quickActions = [
    {
        title: "My Products",
        icon: "📦",
        description: "View, edit and manage your products.",
        path: "/seller/products",
    },
    {
        title: "Add Product",
        icon: "➕",
        description: "Create a new product listing.",
        path: "/seller/products/add",
    },
    {
        title: "Orders",
        icon: "📋",
        description: "View and manage customer orders.",
        path: "/seller/orders",
    },
    {
        title: "Analytics",
        icon: "📈",
        description: "Track sales and performance.",
        path: "/seller/analytics",
    },
];

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
                    value={analytics?.totalProducts ?? 0}
                />

                <DashboardStats
                    title="Orders"
                    value={analytics?.totalOrders ?? 0}
                />

                <DashboardStats
                    title="Products Sold"
                    value={analytics?.totalProductsSold ?? 0}
                />

                <DashboardStats
                    title="Revenue"
                    value={`₹${(
                        analytics?.totalRevenue ?? 0
                    ).toLocaleString()}`}
                />

            </div>

            <div className="mt-12">

                <h2 className="text-2xl font-semibold mb-6">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {quickActions.map((action) => (
                        <Link
                            key={action.title}
                            to={action.path}
                            className="rounded-2xl border bg-white p-6 shadow h-full flex flex-col transition duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                        >
                            <div className="text-4xl mb-4">
                                {action.icon}
                            </div>

                            <h3 className="text-xl font-semibold">
                                {action.title}
                            </h3>

                            <p className="mt-auto pt-4 text-gray-500">
                                {action.description}
                            </p>
                        </Link>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;