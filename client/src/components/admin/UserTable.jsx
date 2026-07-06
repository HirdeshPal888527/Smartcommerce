function UserTable({
    users,
    onRoleChange,
    onDelete,
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-5 py-3 text-left">
                            Name
                        </th>

                        <th className="px-5 py-3 text-left">
                            Email
                        </th>

                        <th className="px-5 py-3 text-left">
                            Role
                        </th>

                        <th className="px-5 py-3 text-left">
                            Status
                        </th>

                        <th className="px-5 py-3 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.length === 0 ? (
                        <tr>

                            <td
                                colSpan="5"
                                className="py-8 text-center text-gray-500"
                            >
                                No users found.
                            </td>

                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr
                                key={user._id}
                                className="border-t"
                            >

                                <td className="px-5 py-4">
                                    {user.name}
                                </td>

                                <td className="px-5 py-4">
                                    {user.email}
                                </td>

                                <td className="px-5 py-4">

                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            onRoleChange(
                                                user._id,
                                                e.target.value
                                            )
                                        }
                                        className="rounded border px-2 py-1"
                                    >
                                        <option value="buyer">
                                            Buyer
                                        </option>

                                        <option value="seller">
                                            Seller
                                        </option>

                                        <option value="admin">
                                            Admin
                                        </option>

                                    </select>

                                </td>

                                <td className="px-5 py-4">

                                    {user.isActive
                                        ? "Active"
                                        : "Inactive"}

                                </td>

                                <td className="px-5 py-4">

                                    {user.role !== "admin" && (
                                        <button
                                            onClick={() =>
                                                onDelete(
                                                    user._id
                                                )
                                            }
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    )}

                                </td>

                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default UserTable;