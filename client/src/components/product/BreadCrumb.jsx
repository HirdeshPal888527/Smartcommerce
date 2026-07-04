import { Link } from "react-router-dom";

function Breadcrumb({ product }) {
    return (
        <div className="mb-8 text-sm text-gray-500">
            <Link
                to="/"
                className="hover:text-green-600"
            >
                Home
            </Link>

            <span className="mx-2">/</span>

            <Link
                to="/products"
                className="hover:text-green-600"
            >
                Products
            </Link>

            <span className="mx-2">/</span>

            <span className="text-gray-900">
                {product.name}
            </span>
        </div>
    );
}

export default Breadcrumb;