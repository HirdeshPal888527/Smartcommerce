import Button from "../ui/Button";

function OrderSummary({
    cart,
    paymentMethod,
    setPaymentMethod,
    onPlaceOrder,
}) {
    const total =
        cart?.items?.reduce(
            (sum, item) =>
                sum +
                item.product.discountPrice *
                    item.quantity,
            0
        ) || 0;

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-24">

            <h2 className="text-2xl font-semibold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">

                {cart?.items?.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex justify-between"
                    >
                        <div>
                            <p className="font-medium">
                                {item.product.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                Qty {item.quantity}
                            </p>
                        </div>

                        <p>
                            ₹
                            {(
                                item.product.discountPrice *
                                item.quantity
                            ).toLocaleString()}
                        </p>
                    </div>
                ))}

                <hr />

                <div className="space-y-3">

                    <label className="font-medium">
                        Payment Method
                    </label>

                    <select
                        value={paymentMethod}
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-xl p-3"
                    >
                        <option value="COD">
                            Cash On Delivery
                        </option>

                        <option value="ONLINE">
                            Online
                        </option>
                    </select>

                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                    <span>Total</span>

                    <span>
                        ₹{total.toLocaleString()}
                    </span>

                </div>

                <Button
                    className="w-full mt-4"
                    onClick={onPlaceOrder}
                >
                    Place Order
                </Button>

            </div>

        </div>
    );
}

export default OrderSummary;