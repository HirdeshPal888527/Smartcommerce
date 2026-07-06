function DashboardStats({ dashboard }) {
    if (!dashboard) return null;

    const stats = [
        {
            title: "Total Users",
            value: dashboard.totalUsers,
        },
        {
            title: "Active Users",
            value: dashboard.activeUsers,
        },
        {
            title: "Total Products",
            value: dashboard.totalProducts,
        },
        {
            title: "Active Products",
            value: dashboard.activeProducts,
        },
        {
            title: "Total Orders",
            value: dashboard.totalOrders,
        },
        {
            title: "Pending Orders",
            value: dashboard.pendingOrders,
        },
        {
            title: "Revenue",
            value: `₹${dashboard.totalRevenue.toLocaleString()}`,
        },
    ];

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.title}
                    className="rounded-2xl border bg-white p-6 shadow"
                >
                    <h3 className="text-gray-500 text-sm">
                        {stat.title}
                    </h3>

                    <p className="mt-3 text-3xl font-bold">
                        {stat.value}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;