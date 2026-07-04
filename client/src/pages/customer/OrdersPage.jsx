import { useEffect } from "react";

import useOrderStore from "../../store/orderStore";

import EmptyOrders from "../../components/orders/EmptyOrders";
import OrderCard from "../../components/orders/OrderCard";

function OrdersPage() {
    const {
        orders,
        fetchOrders,
        isLoading,
    } = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto py-20">
                Loading...
            </div>
        );
    }

    if (orders.length === 0) {
        return <EmptyOrders />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                My Orders
            </h1>

            <div className="space-y-6">

                {orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                    />
                ))}

            </div>

        </div>
    );
}

export default OrdersPage;