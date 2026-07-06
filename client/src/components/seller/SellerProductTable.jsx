import { Link } from "react-router-dom";
import Button from "../ui/Button";

function SellerProductTable({
    products,
    onDelete,
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-5 py-3 text-left">
                            Product
                        </th>

                        <th className="px-5 py-3 text-left">
                            Category
                        </th>

                        <th className="px-5 py-3 text-left">
                            Price
                        </th>

                        <th className="px-5 py-3 text-left">
                            Stock
                        </th>

                        <th className="px-5 py-3 text-center">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {products.map((product) => (

                        <tr
                            key={product._id}
                            className="border-t"
                        >

                            <td className="px-5 py-4">
                                {product.name}
                            </td>

                            <td className="px-5 py-4">
                                {product.category}
                            </td>

                            <td className="px-5 py-4">
                                ₹
                                {(
                                    product.discountPrice ||
                                    product.price
                                ).toLocaleString()}
                            </td>

                            <td className="px-5 py-4">
                                {product.stock}
                            </td>

                            <td className="px-5 py-4 flex justify-center gap-3">

                                <Link
                                    to={`/seller/products/edit/${product._id}`}
                                >
                                    <Button>
                                        Edit
                                    </Button>
                                </Link>

                                <Button
                                    variant="secondary"
                                    onClick={() =>
                                        onDelete(
                                            product._id
                                        )
                                    }
                                >
                                    Delete
                                </Button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default SellerProductTable;