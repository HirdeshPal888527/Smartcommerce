function OrderTable({
    orders,
    onStatusChange,
}) {
    const statuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    return (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-5 py-3 text-left">
                            Order ID
                        </th>

                        <th className="px-5 py-3 text-left">
                            Customer
                        </th>

                        <th className="px-5 py-3 text-left">
                            Total
                        </th>

                        <th className="px-5 py-3 text-left">
                            Payment
                        </th>

                        <th className="px-5 py-3 text-left">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {orders.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="py-8 text-center text-gray-500"
                            >
                                No orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t"
                            >

                                <td className="px-5 py-4">
                                    {order._id.slice(-8)}
                                </td>

                                <td className="px-5 py-4">
                                    {order.user?.name}
                                </td>

                                <td className="px-5 py-4">
                                    ₹{order.totalAmount.toLocaleString()}
                                </td>

                                <td className="px-5 py-4">
                                    {order.paymentStatus}
                                </td>

                                <td className="px-5 py-4">

                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            onStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    >
                                        {statuses.map((status) => (
                                            <option
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </option>
                                        ))}
                                    </select>

                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default OrderTable;