function SortDropdown({
    value,
    onChange,
}) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-3
                shadow-sm
                outline-none
                focus:border-green-500
                focus:ring-2
                focus:ring-green-500/20
            "
        >
            <option value="-createdAt">
                Latest
            </option>

            <option value="price">
                Price: Low to High
            </option>

            <option value="-price">
                Price: High to Low
            </option>

            <option value="name">
                Name (A-Z)
            </option>

            <option value="-name">
                Name (Z-A)
            </option>
        </select>
    );
}

export default SortDropdown;