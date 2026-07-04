import Button from "../ui/Button";
import { Link } from "react-router-dom";

function CartSummary({ cart, onClearCart }) {
    const items = cart.items || [];

    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subtotal = items.reduce((sum, item) => {
        const price =
            item.product.discountPrice ||
            item.product.price;

        return sum + price * item.quantity;
    }, 0);

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
                Order Summary
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">
                    <span>Items</span>
                    <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                        ₹{subtotal.toLocaleString()}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">
                        Free
                    </span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>Total</span>

                    <span>
                        ₹{subtotal.toLocaleString()}
                    </span>

                </div>

            </div>
            <Link to="/checkout">
                <Button className="w-full mt-8">
                    Checkout
                </Button>
            </Link>

            <Button
                className="w-full mt-3"
                variant="secondary"
                onClick={onClearCart}
            >
                Clear Cart
            </Button>

        </div>
    );
}

export default CartSummary;