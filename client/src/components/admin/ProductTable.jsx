function ProductTable({
    products,
    onStatusChange,
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-5 py-3 text-left">
                            Product
                        </th>

                        <th className="px-5 py-3 text-left">
                            Seller
                        </th>

                        <th className="px-5 py-3 text-left">
                            Price
                        </th>

                        <th className="px-5 py-3 text-left">
                            Stock
                        </th>

                        <th className="px-5 py-3 text-left">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {products.length === 0 ? (
                        <tr>
                            <td
                                colSpan="5"
                                className="py-8 text-center text-gray-500"
                            >
                                No products found.
                            </td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-t"
                            >

                                <td className="px-5 py-4">
                                    {product.name}
                                </td>

                                <td className="px-5 py-4">
                                    {product.seller?.name}
                                </td>

                                <td className="px-5 py-4">
                                    ₹{product.price.toLocaleString()}
                                </td>

                                <td className="px-5 py-4">
                                    {product.stock}
                                </td>

                                <td className="px-5 py-4">

                                    <select
                                        value={product.isActive.toString()}
                                        onChange={(e) =>
                                            onStatusChange(
                                                product._id,
                                                e.target.value === "true"
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    >
                                        <option value="true">
                                            Active
                                        </option>

                                        <option value="false">
                                            Inactive
                                        </option>

                                    </select>

                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default ProductTable;