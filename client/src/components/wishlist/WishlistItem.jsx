import Button from "../ui/Button";

function WishlistItem({
    product,
    onAddToCart,
    onRemove,
}) {
    const price =
        product.discountPrice || product.price;

    return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl border shadow-sm">

            {/* Image */}
            <div className="w-full md:w-36 h-36 bg-gray-50 rounded-xl flex items-center justify-center p-4">

                <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="h-full object-contain"
                />

            </div>

            {/* Details */}
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

                <div className="flex gap-3 mt-6">

                    <Button
                        onClick={() =>
                            onAddToCart(product)
                        }
                    >
                        Add to Cart
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            onRemove(product)
                        }
                    >
                        Remove
                    </Button>

                </div>

            </div>

        </div>
    );
}

export default WishlistItem;