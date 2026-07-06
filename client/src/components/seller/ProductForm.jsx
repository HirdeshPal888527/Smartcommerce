import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { uploadProductImage } from "../../api/uploadApi";

function ProductForm({
    onSubmit,
    initialData = {},
    buttonText = "Save Product",
}) {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
        brand: initialData.brand || "",
        category: initialData.category || "",
        price: initialData.price || "",
        discountPrice: initialData.discountPrice || "",
        stock: initialData.stock || "",
        specifications:
            initialData.specifications || {},
        variants: initialData.variants || [],
    });

    const [uploadedImage, setUploadedImage] =
        useState(
            initialData.images
                ? initialData.images[0]
                : null
        );

    const [uploading, setUploading] =
        useState(false);

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        try {
            setUploading(true);

            const data =
                await uploadProductImage(file);

            setUploadedImage(data.image);

            toast.success(
                "Image uploaded successfully."
            );
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Image upload failed."
            );
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uploadedImage) {
            toast.error(
                "Please upload a product image."
            );
            return;
        }

        try {
            setIsSubmitting(true);

            await onSubmit({
                ...formData,
                price: Number(formData.price),
                discountPrice: Number(
                    formData.discountPrice
                ),
                stock: Number(formData.stock),
                images: [uploadedImage],
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label className="block mb-2 font-medium">
                    Product Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                    required
                />
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Description
                </label>

                <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-xl border p-3"
                    required
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block mb-2 font-medium">
                        Brand
                    </label>

                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block mb-2 font-medium">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Discount Price
                    </label>

                    <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Stock
                    </label>

                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full rounded-xl border p-3"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block mb-2 font-medium">
                    Product Image
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                />

                {uploading && (
                    <p className="mt-2 text-sm text-blue-600">
                        Uploading image...
                    </p>
                )}

                {uploadedImage && (
                    <img
                        src={uploadedImage.url}
                        alt="Preview"
                        className="mt-4 h-40 rounded-xl border object-contain"
                    />
                )}
            </div>

            <Button
                type="submit"
                disabled={
                    uploading || isSubmitting
                }
                className="w-full"
            >
                {isSubmitting
                    ? "Saving..."
                    : buttonText}
            </Button>
        </form>
    );
}

export default ProductForm;