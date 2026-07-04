function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
                Previous
            </button>

            {Array.from(
                { length: totalPages },
                (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() =>
                            onPageChange(index + 1)
                        }
                        className={`h-10 w-10 rounded-lg transition ${
                            currentPage === index + 1
                                ? "bg-green-600 text-white"
                                : "border hover:bg-gray-100"
                        }`}
                    >
                        {index + 1}
                    </button>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;