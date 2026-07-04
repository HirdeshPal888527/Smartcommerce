function ProductSpecifications({ specifications = {} }) {
    const entries = Object.entries(specifications);

    if (!entries.length) return null;

    return (
        <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6">
                Specifications
            </h2>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {entries.map(([key, value], index) => (
                    <div
                        key={key}
                        className={`grid grid-cols-2 px-6 py-4 ${
                            index !== entries.length - 1
                                ? "border-b border-gray-100"
                                : ""
                        }`}
                    >
                        <span className="font-medium text-gray-500">
                            {key}
                        </span>

                        <span className="text-gray-900">
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductSpecifications;