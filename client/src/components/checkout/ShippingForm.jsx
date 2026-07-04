function ShippingForm({
    shippingAddress,
    setShippingAddress,
}) {
    const handleChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-white rounded-2xl border shadow-sm p-6">

            <h2 className="text-2xl font-semibold mb-6">
                Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={shippingAddress.fullName}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={handleChange}
                    className="border rounded-xl p-3 md:col-span-2"
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleChange}
                    className="border rounded-xl p-3"
                />

            </div>

        </div>
    );
}

export default ShippingForm;