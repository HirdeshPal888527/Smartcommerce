import { useEffect } from "react";

import DashboardStats from "../../components/admin/DashboardStats";
import useAdminStore from "../../store/adminStore";

function Dashboard() {
    const {
        dashboard,
        fetchDashboard,
        isLoading,
    } = useAdminStore();

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <DashboardStats
                dashboard={dashboard}
            />

        </div>
    );
}

export default Dashboard;