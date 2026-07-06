import { useEffect } from "react";
import toast from "react-hot-toast";

import UserTable from "../../components/admin/UserTable";
import useAdminStore from "../../store/adminStore";

function Users() {
    const {
        users,
        fetchUsers,
        updateUserRole,
        deleteUser,
    } = useAdminStore();

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (
        id,
        role
    ) => {
        try {
            await updateUserRole(id, role);

            toast.success("Role updated.");
        } catch {
            toast.error("Failed to update role.");
        }
    };

    const handleDelete = async (id) => {
        if (
            !window.confirm(
                "Delete this user?"
            )
        )
            return;

        try {
            await deleteUser(id);

            toast.success("User deleted.");
        } catch {
            toast.error("Failed to delete.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">
                Users
            </h1>

            <UserTable
                users={users}
                onRoleChange={handleRoleChange}
                onDelete={handleDelete}
            />

        </div>
    );
}

export default Users;