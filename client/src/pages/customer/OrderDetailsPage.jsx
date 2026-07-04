import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useOrderStore from "../../store/orderStore";

function OrderDetailsPage() {
    const { id } = useParams();

    const {
        selectedOrder,
        fetchOrderById,
        isLoading,
    } = useOrderStore();

    useEffect(() => {
        fetchOrderById(id);
    }, [id]);

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-2xl font-semibold">
                    Loading order...
                </h1>
            </div>
        );
    }

    if (!selectedOrder) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-2xl font-semibold">
                    Order not found.
                </h1>
            </div>
        );
    }

    const {
        _id,
        items,
        shippingAddress,
        totalAmount,
        paymentStatus,
        paymentMethod,
        orderStatus,
        transactionId,
        createdAt,
    } = selectedOrder;

    const statusColor = {
        Pending: "bg-yellow-100 text-yellow-700",
        Processing: "bg-blue-100 text-blue-700",
        Delivered: "bg-green-100 text-green-700",
        Cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Order Details
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Section */}

                <div className="lg:col-span-2 space-y-8">

                    {/* Order Items */}

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="text-2xl font-semibold mb-6">
                            Ordered Items
                        </h2>

                        <div className="space-y-6">

                            {items.map((item) => (
                                <div
                                    key={item.product}
                                    className="flex gap-5 border-b pb-5 last:border-none"
                                >
                                    <div className="w-24 h-24 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-contain"
                                        />

                                    </div>

                                    <div className="flex-1">

                                        <h3 className="text-lg font-semibold">
                                            {item.name}
                                        </h3>

                                        <p className="text-gray-500 mt-1">
                                            Quantity: {item.quantity}
                                        </p>

                                        <p className="text-green-600 font-bold mt-2">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                    </div>

                                    <div className="text-right font-semibold">

                                        ₹
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toLocaleString()}

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                    {/* Shipping Address */}

                    <div className="bg-white rounded-2xl border shadow-sm p-6">

                        <h2 className="text-2xl font-semibold mb-6">
                            Shipping Address
                        </h2>

                        <div className="space-y-2 text-gray-700">

                            <p>
                                <strong>Name:</strong>{" "}
                                {shippingAddress.fullName}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {shippingAddress.phone}
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {shippingAddress.address}
                            </p>

                            <p>
                                {shippingAddress.city},{" "}
                                {shippingAddress.state}
                            </p>

                            <p>
                                {shippingAddress.postalCode}
                            </p>

                            <p>
                                {shippingAddress.country}
                            </p>

                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="bg-white rounded-2xl border shadow-sm p-6 h-fit sticky top-24">

                    <h2 className="text-2xl font-semibold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4">

                        <div className="flex justify-between">

                            <span>Order ID</span>

                            <span className="font-medium">
                                #{_id.slice(-6).toUpperCase()}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Status</span>

                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    statusColor[
                                        orderStatus
                                    ] ||
                                    "bg-gray-100 text-gray-700"
                                }`}
                            >
                                {orderStatus}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Payment</span>

                            <span>
                                {paymentStatus}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Method</span>

                            <span>
                                {paymentMethod}
                            </span>

                        </div>

                        <div className="flex justify-between">

                            <span>Placed On</span>

                            <span>
                                {new Date(
                                    createdAt
                                ).toLocaleDateString()}
                            </span>

                        </div>

                        {transactionId && (
                            <div className="flex justify-between">

                                <span>Transaction</span>

                                <span className="text-sm">
                                    {transactionId}
                                </span>

                            </div>
                        )}

                        <hr />

                        <div className="flex justify-between text-xl font-bold">

                            <span>Total</span>

                            <span>
                                ₹
                                {totalAmount.toLocaleString()}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderDetailsPage;