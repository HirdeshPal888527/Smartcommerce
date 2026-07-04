import {
    Truck,
    ShieldCheck,
    BadgeCheck,
    Headphones,
} from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Fast Delivery",
        description:
            "Get your orders delivered quickly and safely across the country.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payments",
        description:
            "Your payments are protected with industry-standard security.",
    },
    {
        icon: BadgeCheck,
        title: "Premium Quality",
        description:
            "Every product is carefully selected to ensure top-notch quality.",
    },
    {
        icon: Headphones,
        title: "24/7 Support",
        description:
            "Our support team is always ready to help whenever you need us.",
    },
];

function FeaturesSection() {
    return (
        <section className="bg-gray-50 py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <h2 className="text-4xl font-bold">
                        Why Choose SmartCommerce?
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Shopping made simple, secure, and reliable.
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition"
                            >

                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

                                    <Icon
                                        className="text-green-600"
                                        size={28}
                                    />

                                </div>

                                <h3 className="mt-6 text-xl font-semibold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-gray-500 leading-7">
                                    {feature.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}

export default FeaturesSection;