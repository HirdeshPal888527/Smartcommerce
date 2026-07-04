import { Link } from "react-router-dom";

import Button from "../ui/Button";

function EmptyCart() {
    return (
        <div className="py-24 text-center">

            <h2 className="text-3xl font-bold">
                Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
                Looks like you haven't added anything yet.
            </p>

            <Link to="/products">

                <Button className="mt-8">
                    Continue Shopping
                </Button>

            </Link>

        </div>
    );
}

export default EmptyCart;