import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";

import EmptyWishlist from "../../components/wishlist/EmptyWishlist";
import WishlistItem from "../../components/wishlist/WishlistItem";

function WishlistPage() {
    const navigate = useNavigate();

    const {
        wishlist,
        fetchWishlist,
        removeItem,
    } = useWishlistStore();

    const {
        addItem: addToCartItem,
    } = useCartStore();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const handleRemove = async (product) => {
        const result = await removeItem(product._id);

        if (result.success) {
            toast.success("Removed from wishlist.");
        } else {
            toast.error(result.message);
        }
    };

    const handleAddToCart = async (product) => {
        const result = await addToCartItem(product._id);

        if (result.success) {
            toast.success("Added to cart.");
        } else {
            toast.error(result.message);
        }
    };

    if (
        !wishlist ||
        wishlist.products.length === 0
    ) {
        return <EmptyWishlist />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

            <div className="flex items-center justify-between mb-10">

                <div>

                    <h1 className="text-4xl font-bold">
                        Wishlist
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {wishlist.products.length} saved products
                    </p>

                </div>

            </div>

            <div className="space-y-6">

                {wishlist.products.map((product) => (
                    <WishlistItem
                        key={product._id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onRemove={handleRemove}
                    />
                ))}

            </div>

        </div>
    );
}

export default WishlistPage;