import { useEffect } from "react";
import toast from "react-hot-toast";

import OrderTable from "../../components/admin/OrderTable";
import useAdminStore from "../../store/adminStore";

function Orders() {
    const {
        orders,
        fetchOrders,
        updateOrderStatus,
    } = useAdminStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (
        id,
        status
    ) => {
        try {
            await updateOrderStatus(
                id,
                status
            );

            toast.success(
                "Order updated successfully."
            );
        } catch {
            toast.error(
                "Failed to update order."
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Orders
            </h1>

            <OrderTable
                orders={orders}
                onStatusChange={
                    handleStatusChange
                }
            />

        </div>
    );
}

export default Orders;