import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProductForm from "../../components/seller/ProductForm";
import useSellerStore from "../../store/sellerStore";

function AddProducts() {
    const navigate = useNavigate();

    const { addProduct } = useSellerStore();

    const handleSubmit = async (productData) => {
        const result = await addProduct(productData);

        if (result.success) {
            toast.success("Product created successfully.");

            navigate("/seller/products");
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Add Product
            </h1>

            <ProductForm
                onSubmit={handleSubmit}
                buttonText="Create Product"
            />

        </div>
    );
}

export default AddProducts;