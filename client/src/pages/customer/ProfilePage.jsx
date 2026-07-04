import useAuthStore from "../../store/authStore";

function ProfilePage() {
    const { user } = useAuthStore();

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto py-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">

            <h1 className="text-4xl font-bold mb-10">
                My Profile
            </h1>

            <div className="bg-white rounded-2xl shadow-sm border p-8">

                <div className="space-y-8">

                    <div>
                        <p className="text-sm text-gray-500">
                            Name
                        </p>

                        <p className="text-xl font-semibold mt-1">
                            {user.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="text-xl font-semibold mt-1">
                            {user.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Role
                        </p>

                        <p className="text-xl font-semibold mt-1 capitalize">
                            {user.role}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Member Since
                        </p>

                        <p className="text-xl font-semibold mt-1">
                            {new Date(
                                user.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProfilePage;