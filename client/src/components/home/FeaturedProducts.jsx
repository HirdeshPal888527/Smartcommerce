import { useEffect } from "react";
import { Link } from "react-router-dom";

import ProductGrid from "../product/ProductGrid";
import Button from "../ui/Button";

import useProductStore from "../../store/productStore";

function FeaturedProducts() {
    const {
        products,
        fetchProducts,
        isLoading,
    } = useProductStore();

    useEffect(() => {
        fetchProducts({
            page: 1,
            limit: 4,
        });
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            <div className="text-center mb-12">

                <h2 className="text-4xl font-bold">
                    Featured Products
                </h2>

                <p className="mt-3 text-gray-500">
                    Discover our most popular products.
                </p>

            </div>

            {isLoading ? (
                <p className="text-center">
                    Loading products...
                </p>
            ) : (
                <ProductGrid
                    products={products.slice(0, 4)}
                />
            )}

            <div className="mt-12 text-center">

                <Link to="/products">

                    <Button>
                        View All Products
                    </Button>

                </Link>

            </div>

        </section>
    );
}

export default FeaturedProducts;