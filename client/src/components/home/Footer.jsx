import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-900 text-white">

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid gap-10 md:grid-cols-3">

                    <div>

                        <h2 className="text-2xl font-bold text-green-400">
                            SmartCommerce
                        </h2>

                        <p className="mt-4 text-gray-400 leading-7">
                            A modern MERN e-commerce platform
                            built with scalability,
                            performance, and user experience
                            in mind.
                        </p>

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold">
                            Quick Links
                        </h3>

                        <div className="mt-4 flex flex-col gap-3">

                            <Link to="/">
                                Home
                            </Link>

                            <Link to="/products">
                                Products
                            </Link>

                            <Link to="/wishlist">
                                Wishlist
                            </Link>

                            <Link to="/cart">
                                Cart
                            </Link>

                        </div>

                    </div>

                    <div>

                        <h3 className="text-lg font-semibold">
                            Contact
                        </h3>

                        <div className="mt-4 space-y-3 text-gray-400">

                            <p>
                                support@smartcommerce.com
                            </p>

                            <p>
                                +91 9876543210
                            </p>

                            <p>
                                India
                            </p>

                        </div>

                    </div>

                </div>

                <hr className="my-10 border-gray-700" />

                <p className="text-center text-gray-500">

                    © {new Date().getFullYear()} SmartCommerce.
                    All rights reserved.

                </p>

            </div>

        </footer>
    );
}

export default Footer;