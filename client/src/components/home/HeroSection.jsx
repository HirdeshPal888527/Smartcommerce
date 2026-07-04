import { Link } from "react-router-dom";

import Button from "../ui/Button";

function HeroSection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">

            <div className="grid items-center gap-16 lg:grid-cols-2">

                {/* Left */}

                <div>

                    <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        SmartCommerce
                    </span>

                    <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                        Shop Smarter,
                        <br />
                        Shop with Confidence
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Discover premium electronics with
                        fast delivery, secure payments,
                        and unbeatable prices.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link to="/products">
                            <Button>
                                Shop Now
                            </Button>
                        </Link>

                        <Link to="/products">
                            <Button variant="secondary">
                                Explore Products
                            </Button>
                        </Link>

                    </div>

                </div>

                {/* Right */}

                <div className="flex justify-center">

                    <img
                        src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900"
                        alt="Shopping"
                        className="rounded-3xl shadow-xl"
                    />

                </div>

            </div>

        </section>
    );
}

export default HeroSection;