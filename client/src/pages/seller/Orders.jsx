import { useEffect } from "react";
import toast from "react-hot-toast";

import useSellerStore from "../../store/sellerStore";
import SellerOrderTable from "../../components/seller/SellerOrderTable";

function Orders() {
    const {
        orders,
        fetchSellerOrders,
        isLoading,
    } = useSellerStore();

    useEffect(() => {
        const loadOrders = async () => {
            try {
                await fetchSellerOrders();
            } catch {
                toast.error(
                    "Failed to load orders."
                );
            }
        };

        loadOrders();
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
                Seller Orders
            </h1>

            <div className="overflow-x-auto rounded-2xl border bg-white shadow">

                <SellerOrderTable orders={orders} />

            </div>

        </div>
    );
}

export default Orders;