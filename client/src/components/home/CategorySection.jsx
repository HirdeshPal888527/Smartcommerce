import { Link } from "react-router-dom";

const categories = [
    {
        name: "Phones",
        icon: "📱",
    },
    {
        name: "Laptops",
        icon: "💻",
    },
    {
        name: "Audio",
        icon: "🎧",
    },
    {
        name: "Accessories",
        icon: "⌚",
    },
];

function CategorySection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">

            <div className="text-center mb-12">

                <h2 className="text-4xl font-bold">
                    Shop by Category
                </h2>

                <p className="mt-3 text-gray-500">
                    Explore our most popular categories.
                </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {categories.map((category) => (
                    <Link
                        key={category.name}
                        to="/products"
                        className="
                            group
                            rounded-2xl
                            border
                            bg-white
                            p-8
                            shadow-sm
                            hover:shadow-lg
                            hover:-translate-y-2
                            transition-all
                            duration-300
                            text-center
                        "
                    >
                        <div className="text-5xl">
                            {category.icon}
                        </div>

                        <h3 className="mt-5 text-xl font-semibold group-hover:text-green-600">
                            {category.name}
                        </h3>

                    </Link>
                ))}

            </div>

        </section>
    );
}

export default CategorySection;