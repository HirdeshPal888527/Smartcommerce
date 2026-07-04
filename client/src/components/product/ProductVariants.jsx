import { useState } from "react";

function ProductVariants({ variants = [] }) {
    const [selectedVariant, setSelectedVariant] = useState(
        variants[0] || null
    );

    if (!variants.length) return null;

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">
                Storage
            </h2>

            <div className="flex flex-wrap gap-3">
                {variants.map((variant) => (
                    <button
                        key={variant.storage}
                        onClick={() =>
                            setSelectedVariant(variant)
                        }
                        className={`rounded-xl border px-5 py-3 transition ${
                            selectedVariant?.storage === variant.storage
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-gray-300 hover:border-green-400"
                        }`}
                    >
                        <p className="font-medium">
                            {variant.storage}
                        </p>

                        <p className="text-sm text-gray-500">
                            ₹{variant.price.toLocaleString()}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductVariants;