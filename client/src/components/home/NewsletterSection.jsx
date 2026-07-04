import Button from "../ui/Button";

function NewsletterSection() {
    return (
        <section className="py-20 bg-green-600">

            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold text-white">
                    Stay Updated
                </h2>

                <p className="mt-4 text-green-100">
                    Subscribe to receive updates about new
                    arrivals, exclusive offers, and seasonal
                    sales.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="
                            w-full
                            sm:w-96
                            rounded-xl
                            px-5
                            py-3
                            outline-none
                            text-gray-800
                        "
                    />

                    <Button
                        className="bg-white text-green-600 hover:bg-gray-100"
                    >
                        Subscribe
                    </Button>

                </div>

            </div>

        </section>
    );
}

export default NewsletterSection;