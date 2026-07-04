import { Link } from "react-router-dom";

import Button from "../ui/Button";

function OrderCard({ order }) {
    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700",
        Paid: "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="rounded-2xl border bg-white shadow-sm p-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                    <h2 className="text-xl font-semibold">
                        Order #{order._id.slice(-6).toUpperCase()}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {order.items.length} item(s)
                    </p>

                    <p className="text-gray-500 mt-1">
                        {new Date(
                            order.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-2xl font-bold text-green-600">
                        ₹{order.totalAmount.toLocaleString()}
                    </p>

                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                            statusColor[
                                order.orderStatus
                            ] ||
                            "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {order.orderStatus}
                    </span>

                </div>

            </div>

            <div className="mt-6 flex justify-end">

                <Link to={`/orders/${order._id}`}>
                    <Button>
                        View Details
                    </Button>
                </Link>

            </div>

        </div>
    );
}

export default OrderCard;