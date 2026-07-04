import Button from "../ui/Button";

function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    const { product, quantity } = item;

    const price =
        product.discountPrice || product.price;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border">

            {/* Product Image */}
            <div className="w-full md:w-36 h-36 bg-gray-50 rounded-xl flex items-center justify-center p-4">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="h-full object-contain"
                />

            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">

                <div>

                    <h2 className="text-xl font-semibold">
                        {product.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {product.brand}
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-3">
                        ₹{price.toLocaleString()}
                    </p>

                </div>

                {/* Quantity + Remove */}
                <div className="flex flex-wrap items-center justify-between mt-6 gap-4">

                    <div className="flex items-center gap-3">

                        <Button
                            onClick={() =>
                                onDecrease(item)
                            }
                        >
                            -
                        </Button>

                        <span className="font-semibold text-lg">
                            {quantity}
                        </span>

                        <Button
                            onClick={() =>
                                onIncrease(item)
                            }
                        >
                            +
                        </Button>

                    </div>

                    <button
                        onClick={() =>
                            onRemove(item)
                        }
                        className="text-red-500 hover:text-red-700 font-medium"
                    >
                        Remove
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CartItem;