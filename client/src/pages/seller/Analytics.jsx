import { useEffect } from "react";
import useSellerStore from "../../store/sellerStore";
import AnalyticsCards from "../../components/seller/AnalyticsCards";

function Analytics() {
    const {
        analytics,
        fetchSellerAnalytics,
        isLoading,
    } = useSellerStore();

    useEffect(() => {
        fetchSellerAnalytics();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Seller Analytics
            </h1>

            <div className="grid md:grid-cols-2 gap-8">

                <AnalyticsCards
                    title="Orders by Status"
                    data={analytics?.ordersByStatus}
                />

                <AnalyticsCards
                    title="Payment Status"
                    data={analytics?.paymentStatus}
                />
   

            </div>

        </div>
    );
}

export default Analytics;