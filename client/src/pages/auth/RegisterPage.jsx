import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import useAuthStore from "../../store/authStore";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const { register, isLoading } = useAuthStore();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await register(formData);

        if (result.success) {
            toast.success("Registration successful!");

            navigate("/");
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 w-96"
                >
                    <h1 className="text-3xl font-bold text-center">
                        Create Account
                    </h1>

                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Register"}
                    </Button>
                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-600 font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}

export default RegisterPage;