import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ShippingForm from "../../components/checkout/ShippingForm";
import OrderSummary from "../../components/checkout/OrderSummary";

import useCartStore from "../../store/cartStore";
import useOrderStore from "../../store/orderStore";

function CheckoutPage() {
    const navigate = useNavigate();

    const {
        cart,
        fetchCart,
    } = useCartStore();

    const {
        placeOrder,
    } = useOrderStore();

    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
    });

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    useEffect(() => {
        fetchCart();
    }, []);

    const handlePlaceOrder = async () => {
        const {
            fullName,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
        } = shippingAddress;

        if (
            !fullName ||
            !phone ||
            !address ||
            !city ||
            !state ||
            !postalCode ||
            !country
        ) {
            toast.error(
                "Please fill all shipping details."
            );

            return;
        }

        const result = await placeOrder(
            shippingAddress,
            paymentMethod
        );

        if (!result.success) {
            toast.error(result.message);

            return;
        }

        await fetchCart();

        toast.success("Order placed successfully!");

        navigate("/orders");
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">

                <h1 className="text-3xl font-bold">
                    Your cart is empty.
                </h1>

            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Checkout
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                    <ShippingForm
                        shippingAddress={
                            shippingAddress
                        }
                        setShippingAddress={
                            setShippingAddress
                        }
                    />

                </div>

                <OrderSummary
                    cart={cart}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={
                        setPaymentMethod
                    }
                    onPlaceOrder={
                        handlePlaceOrder
                    }
                />

            </div>

        </div>
    );
}

export default CheckoutPage;