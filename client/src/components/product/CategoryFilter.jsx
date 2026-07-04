function FilterBar({
    categories,
    selectedCategory,
    onSelectCategory,
}) {
    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() =>
                        onSelectCategory(category)
                    }
                    className={`
                        rounded-full
                        px-5
                        py-2
                        text-sm
                        transition
                        ${
                            selectedCategory === category
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                        }
                    `}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;