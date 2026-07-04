import { useEffect } from "react";
import toast from "react-hot-toast";

import useCartStore from "../../store/cartStore";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

function CartPage() {
    const {
        cart,
        fetchCart,
        updateItem,
        removeItem,
        clearAll,
    } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, []);

    const handleIncrease = async (item) => {
        await updateItem(
            item.product._id,
            item.quantity + 1
        );
    };

    const handleDecrease = async (item) => {
        if (item.quantity === 1) return;

        await updateItem(
            item.product._id,
            item.quantity - 1
        );
    };

    const handleRemove = async (item) => {
        const result = await removeItem(
            item.product._id
        );

        if (result.success) {
            toast.success("Item removed.");
        }
    };

    const handleClear = async () => {
        const result = await clearAll();

        if (result.success) {
            toast.success("Cart cleared.");
        }
    };

    if (!cart || cart.items.length === 0) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Shopping Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-6">

                    {cart.items.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove}
                        />
                    ))}

                </div>

                <CartSummary
                    cart={cart}
                    onClearCart={handleClear}
                />

            </div>

        </div>
    );
}

export default CartPage;