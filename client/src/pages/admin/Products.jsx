import { useEffect } from "react";
import toast from "react-hot-toast";

import ProductTable from "../../components/admin/ProductTable";
import useAdminStore from "../../store/adminStore";

function Products() {
    const {
        products,
        fetchProducts,
        updateProductStatus,
    } = useAdminStore();

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleStatusChange = async (
        id,
        isActive
    ) => {
        try {
            await updateProductStatus(
                id,
                isActive
            );

            toast.success(
                "Product status updated."
            );
        } catch {
            toast.error(
                "Failed to update product."
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Products
            </h1>

            <ProductTable
                products={products}
                onStatusChange={
                    handleStatusChange
                }
            />

        </div>
    );
}

export default Products;