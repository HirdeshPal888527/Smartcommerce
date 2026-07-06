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
    const [specifications, setSpecifications] = useState(
        Object.entries(initialData.specifications || {}).map(
            ([key, value]) => ({
                key,
                value,
            })
        )
    );
    const [variants, setVariants] = useState(
        (initialData.variants || []).map((variant) => ({
            name: variant.name || "",
            value: variant.value || "",
        }))
    );

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

    const handleSpecificationChange = (
        index,
        field,
        value
    ) => {
        const updated = [...specifications];

        updated[index][field] = value;

        setSpecifications(updated);
    };

    const addSpecification = () => {
        setSpecifications([
            ...specifications,
            {
                key: "",
                value: "",
            },
        ]);
    };

    const removeSpecification = (index) => {
        setSpecifications(
            specifications.filter(
                (_, i) => i !== index
            )
        );
    };
    const handleVariantChange = (
        index,
        field,
        value
    ) => {
        const updated = [...variants];

        updated[index][field] = value;

        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([
            ...variants,
            {
                name: "",
                value: "",
            },
        ]);
    };

    const removeVariant = (index) => {
        setVariants(
            variants.filter((_, i) => i !== index)
        );
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

            const specificationObject = {};

            specifications.forEach((item) => {
                if (item.key.trim()) {
                    specificationObject[item.key] =
                        item.value;
                }
            });

            await onSubmit({
                ...formData,
                price: Number(formData.price),
                discountPrice: Number(
                    formData.discountPrice
                ),
                stock: Number(formData.stock),
                specifications: specificationObject,
                variants: variants.filter(
                    (variant) => variant.name.trim()
                ),
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

                <div className="flex justify-between items-center mb-4">

                    <label className="font-medium">
                        Specifications
                    </label>

                    <button
                        type="button"
                        onClick={addSpecification}
                        className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                        + Add
                    </button>

                </div>

                {specifications.map((spec, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-12 gap-3 mb-3"
                    >

                        <input
                            className="col-span-5 rounded border p-3"
                            placeholder="Key"
                            value={spec.key}
                            onChange={(e) =>
                                handleSpecificationChange(
                                    index,
                                    "key",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="col-span-5 rounded border p-3"
                            placeholder="Value"
                            value={spec.value}
                            onChange={(e) =>
                                handleSpecificationChange(
                                    index,
                                    "value",
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="button"
                            onClick={() =>
                                removeSpecification(index)
                            }
                            className="rounded bg-red-500 text-white"
                        >
                            ✕
                        </button>

                    </div>

                ))}

            </div>

            <div className="mt-8">

                <div className="flex justify-between items-center mb-4">

                    <label className="font-medium">
                        Variants
                    </label>

                    <button
                        type="button"
                        onClick={addVariant}
                        className="rounded bg-blue-600 px-3 py-2 text-white"
                    >
                        + Add
                    </button>

                </div>

                {variants.map((variant, index) => (

                    <div
                        key={index}
                        className="grid grid-cols-12 gap-3 mb-3"
                    >

                        <input
                            className="col-span-5 rounded border p-3"
                            placeholder="Variant Name"
                            value={variant.name}
                            onChange={(e) =>
                                handleVariantChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                        />

                        <input
                            className="col-span-5 rounded border p-3"
                            placeholder="Variant Value"
                            value={variant.value}
                            onChange={(e) =>
                                handleVariantChange(
                                    index,
                                    "value",
                                    e.target.value
                                )
                            }
                        />

                        <button
                            type="button"
                            onClick={() =>
                                removeVariant(index)
                            }
                            className="rounded bg-red-500 text-white"
                        >
                            ✕
                        </button>

                    </div>

                ))}

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