import { Search } from "lucide-react";

function SearchBar({
    value,
    onChange,
    onSubmit,
}) {
    return (
        <form
            onSubmit={onSubmit}
            className="relative w-full max-w-lg"
        >
            <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search products..."
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    py-3
                    pl-12
                    pr-4
                    shadow-sm
                    outline-none
                    transition
                    focus:border-green-500
                    focus:ring-2
                    focus:ring-green-500/20
                "
            />
        </form>
    );
}

export default SearchBar;