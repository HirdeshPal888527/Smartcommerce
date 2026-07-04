import ProductGrid from "../../components/product/ProductGrid";
import mockProducts from "../../utils/mockProducts";

function DevPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-4xl font-bold mb-10">
                Products
            </h1>

            <ProductGrid products={mockProducts} />

        </div>
    );
}

export default DevPage;