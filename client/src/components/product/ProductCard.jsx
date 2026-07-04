import Button from "../ui/Button";
import { Link } from "react-router-dom";


function ProductCard({ product }) {
    const {
        name,
        brand,
        price,
        discountPrice,
        images,
        stock,
    } = product;

    const image =
        images?.[0]?.url ||
        "https://placehold.co/400x400?text=No+Image";

    const hasDiscount =
        discountPrice && discountPrice < price;

    const discountPercentage = hasDiscount
        ? Math.round(
              ((price - discountPrice) / price) * 100
          )
        : 0;

    return (
        <Link to ={`/products/${product._id}`}>
            <div
                className="
                    group
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    overflow-hidden
                    cursor pointer
                "
            >
                {/* Image */}

                <div className="relative h-64 bg-gray-50 flex items-center justify-center p-8">

                    {hasDiscount && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {discountPercentage}% OFF
                        </span>
                    )}

                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="
                            h-full
                            w-full
                            object-contain
                            transition-transform
                            duration-300
                            group-hover:scale-105
                        "
                    />
                </div>

                {/* Content */}

                <div className="p-5 space-y-3">

                    <h2 className="h-14 text-base font-semibold text-gray-900 leading-6 line-clamp-2">
                        {name}
                    </h2>

                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                        {brand}
                    </p>

                    <div className="flex items-end gap-3">
                        {hasDiscount ? (
                            <>
                                <span className="text-2xl font-bold text-green-600">
                                    ₹{discountPrice.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                    ₹{price.toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-green-600">
                                ₹{price.toLocaleString()}
                            </span>
                        )}

                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-yellow-500">
                            ⭐ 4.8
                        </span>

                        <span className="text-gray-500">
                            (124 Reviews)
                        </span>
                    </div>

                    <p
                        className={`text-sm font-medium ${
                            stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {stock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                    </p>

                    <Button
                        className="w-full rounded-xl py-2.5 active:scale-95"
                        disabled={stock === 0}
                    >
                        Add to Cart
                    </Button>

                </div>
            </div>
        </Link>
    );
}

export default ProductCard;