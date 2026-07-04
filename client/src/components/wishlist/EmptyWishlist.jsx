import { Link } from "react-router-dom";

import Button from "../ui/Button";

function EmptyWishlist() {
    return (
        <div className="py-24 text-center">

            <h2 className="text-3xl font-bold">
                Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-500">
                Save products you love for later.
            </p>

            <Link to="/products">
                <Button className="mt-8">
                    Browse Products
                </Button>
            </Link>

        </div>
    );
}

export default EmptyWishlist;