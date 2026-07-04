import { useState } from "react";

function ProductGallery({ images = [], name }) {
    const [selectedImage, setSelectedImage] = useState(
        images[0]?.url || ""
    );

    if (!images.length) {
        return (
            <div className="h-[500px] rounded-2xl bg-gray-100 flex items-center justify-center">
                No Image Available
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {/* Main Image */}
            <div className="bg-gray-50 rounded-2xl h-[500px] flex items-center justify-center p-8 border border-gray-100">

                <img
                    src={selectedImage}
                    alt={name}
                    className="max-h-full object-contain transition-all duration-300"
                />

            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto">

                {images.map((image) => (
                    <button
                        key={image.publicId}
                        onClick={() =>
                            setSelectedImage(image.url)
                        }
                        className={`rounded-xl border-2 p-1 transition ${
                            selectedImage === image.url
                                ? "border-green-600"
                                : "border-transparent"
                        }`}
                    >
                        <img
                            src={image.url}
                            alt={name}
                            className="h-20 w-20 object-contain rounded-lg"
                        />
                    </button>
                ))}

            </div>

        </div>
    );
}

export default ProductGallery;