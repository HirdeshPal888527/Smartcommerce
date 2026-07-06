function AnalyticsCards({
    title,
    data = {},
}) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow">

            <h2 className="text-2xl font-semibold mb-6">
                {title}
            </h2>

            <div className="space-y-4">

                {Object.keys(data).length === 0 ? (
                    <p className="text-gray-500">
                        No data available.
                    </p>
                ) : (
                    Object.entries(data).map(
                        ([key, value]) => (
                            <div
                                key={key}
                                className="flex justify-between border-b pb-2"
                            >
                                <span>{key}</span>

                                <span className="font-semibold">
                                    {value}
                                </span>
                            </div>
                        )
                    )
                )}

            </div>

        </div>
    );
}

export default AnalyticsCards;