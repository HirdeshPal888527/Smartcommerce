import { Link } from "react-router-dom";

import Button from "../ui/Button";

function EmptyOrders() {
    return (
        <div className="py-24 text-center">

            <h2 className="text-3xl font-bold">
                No orders yet
            </h2>

            <p className="mt-3 text-gray-500">
                Looks like you haven't placed any orders.
            </p>

            <Link to="/products">
                <Button className="mt-8">
                    Start Shopping
                </Button>
            </Link>

        </div>
    );
}

export default EmptyOrders;