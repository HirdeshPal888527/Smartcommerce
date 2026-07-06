import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ProductForm from "../../components/seller/ProductForm";

import { getProductById } from "../../api/productApi";
import useSellerStore from "../../store/sellerStore";

function EditProducts() {
    const { id } = useParams();

    const navigate = useNavigate();

    const { updateProduct } = useSellerStore();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);

                setProduct(data.product);
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                        "Failed to load product."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (productData) => {
        const result = await updateProduct(
            id,
            productData
        );

        if (result.success) {
            toast.success(
                "Product updated successfully."
            );

            navigate("/seller/products");
        } else {
            toast.error(result.message);
        }
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                Product not found.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Edit Product
            </h1>

            <ProductForm
                initialData={product}
                onSubmit={handleSubmit}
                buttonText="Update Product"
            />

        </div>
    );
}

export default EditProducts;