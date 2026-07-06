import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../components/ui/Button";
import SellerProductTable from "../../components/seller/SellerProductTable";

import useSellerStore from "../../store/sellerStore";

function Products() {
    const {
        products,
        fetchMyProducts,
        deleteProduct,
    } = useSellerStore();

    useEffect(() => {
        fetchMyProducts();
    }, []);

    const handleDelete = async (id) => {
        const result =
            await deleteProduct(id);

        if (result.success) {
            toast.success(
                "Product deleted."
            );
        } else {
            toast.error(
                result.message
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    My Products
                </h1>

                <Link
                    to="/seller/products/add"
                >
                    <Button>
                        Add Product
                    </Button>
                </Link>

            </div>

            <SellerProductTable
                products={products}
                onDelete={
                    handleDelete
                }
            />

        </div>
    );
}

export default Products;