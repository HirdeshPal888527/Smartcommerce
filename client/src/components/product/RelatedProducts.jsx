import ProductGrid from "./ProductGrid";

function RelatedProducts({
    products = [],
    currentProductId,
}) {
    const relatedProducts = products.filter(
        (product) => product._id !== currentProductId
    );

    if (!relatedProducts.length) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">
                Related Products
            </h2>

            <ProductGrid
                products={relatedProducts.slice(0, 4)}
            />
        </div>
    );
}

export default RelatedProducts;