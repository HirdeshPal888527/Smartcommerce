import { useEffect, useState } from "react";

import SearchBar from "../../components/product/SearchBar";
import CategoryFilter from "../../components/product/CategoryFilter";
import SortDropdown from "../../components/product/SortDropdown";
import ProductGrid from "../../components/product/ProductGrid";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import Pagination from "../../components/product/Pagination";

import useProductStore from "../../store/productStore";

const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Books",
    "Furniture",

];

function ProductsPage() {
    const {
        products,
        totalProducts,
        fetchProducts,
        isLoading,
        currentPage,
        totalPages,
    } = useProductStore();

    const [filters, setFilters] = useState({
        keyword: "",
        category: "All",
        sort: "-createdAt",
        page: 1,
    });

    const updateFilter = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            page: key ==="page"?value: 1,
        }));
    };
    const handleSearch = (e) => {
        updateFilter("keyword", e.target.value);
    };

    const handleSort = (e) => {
        updateFilter("sort", e.target.value);
    };

    const handleCategory = (category) => {
        updateFilter("category", category);
    };

    useEffect(() => {
        fetchProducts({
            keyword: filters.keyword,
            category:
                filters.category === "All"
                    ? ""
                    : filters.category,
            sort: filters.sort,
            page: filters.page,
        });
    }, [filters, fetchProducts]);

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
            {/* Page Title */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-gray-900">
                    Products
                </h1>

                <p className="mt-2 text-gray-500">
                    Browse our latest collection.
                </p>
            </div>

            {/* Search + Sort */}
            <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
                <SearchBar
                    value={filters.keyword}
                    onChange={handleSearch}
                    onSubmit={(e) => e.preventDefault()}
                />

                <SortDropdown
                    value={filters.sort}
                    onChange={handleSort}
                />
            </div>

            {/* Category Filter */}
            <div className="mb-10">
                <CategoryFilter
                    categories={categories}
                    selectedCategory={filters.category}
                    onSelectCategory={handleCategory}
                />
            </div>

            {/* Product Count */}
            <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                        {totalProducts}
                    </span>{" "}
                    Products
                </p>
            </div>

            {/* Product Grid */}
            <div className="mb-12">
                {isLoading ? (
                    <LoadingSpinner size="lg" />
                ) : (
                    <>
                        <ProductGrid products={products} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) =>
                                updateFilter("page", page)
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;