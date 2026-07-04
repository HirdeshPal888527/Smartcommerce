import Button from "../ui/Button";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";


import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";

function ProductInfo({ product }) {
    const {
        name,
        brand,
        price,
        discountPrice,
        stock,
        averageRating,
        numReviews,
        description,
    } = product;
    const { addItem: addToCartItem } = useCartStore();
    const { addItem: addToWishlistItem } = useWishlistStore();

    const hasDiscount = discountPrice && discountPrice < price;

    const discountPercentage = hasDiscount
        ? Math.round(
              ((price - discountPrice) / price) * 100
          )
        : 0;

    const handleAddToCart = async () => {
        const result = await addToCartItem(product._id);

        if (result.success) {
            toast.success("Added to cart!");
        } else {
            toast.error(result.message);
        }
    };

    const handleAddToWishlist = async () => {
        const result = await addToWishlistItem(product._id);

        if (result.success) {
            toast.success("Added to wishlist!");
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="space-y-6">

            {/* Brand */}
            <p className="uppercase tracking-widest text-sm text-gray-500 font-medium">
                {brand}
            </p>

            {/* Product Name */}
            <h1 className="text-4xl font-bold text-gray-900">
                {name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 text-sm">
                <span className="text-yellow-500">
                    ⭐ {averageRating.toFixed(1)}
                </span>

                <span className="text-gray-500">
                    ({numReviews} Reviews)
                </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">

                <span className="text-4xl font-bold text-green-600">
                    ₹{discountPrice.toLocaleString()}
                </span>

                {hasDiscount && (
                    <>
                        <span className="text-xl line-through text-gray-400">
                            ₹{price.toLocaleString()}
                        </span>

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                            {discountPercentage}% OFF
                        </span>
                    </>
                )}

            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">

                <span
                    className={`h-3 w-3 rounded-full ${
                        stock > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                />

                <span
                    className={`font-medium ${
                        stock > 0
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {stock > 0
                        ? "In Stock"
                        : "Out of Stock"}
                </span>

            </div>

            {/* Description */}
            <p className="leading-7 text-gray-600">
                {description}
            </p>

            {/* Button */}
            <div className="flex gap-4">

                <Button
                    className="flex-1"
                    disabled={stock === 0}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>

                <button
                    onClick={handleAddToWishlist}
                    className="
                        flex
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-gray-300
                        px-4
                        hover:bg-gray-100
                        transition
                    "
                >
                    <Heart size={22} />
                </button>

            </div>

        </div>
    );
}

export default ProductInfo;